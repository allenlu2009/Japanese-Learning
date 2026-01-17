/**
 * Google Drive Auto-Sync Service
 *
 * Uses Google Drive appDataFolder (hidden from user) to store sync file
 * Automatically syncs test data across devices
 */

import { exportToUniversalFormat, importFromUniversalFormat } from './storage';

const SYNC_FILE_NAME = 'japanese-learning-sync.json';
const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.appdata';
const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

// Google API types
interface GoogleAuthResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

interface GoogleFile {
  id: string;
  name: string;
  modifiedTime?: string;
}

interface SyncStatus {
  enabled: boolean;
  lastSyncTime: number | null;
  status: 'idle' | 'syncing' | 'error' | 'success';
  error?: string;
  connectedEmail?: string;
}

class GoogleDriveSyncService {
  private accessToken: string | null = null;
  private tokenExpiry: number | null = null;
  private syncInterval: NodeJS.Timeout | null = null;
  private status: SyncStatus = {
    enabled: false,
    lastSyncTime: null,
    status: 'idle'
  };

  /**
   * Initialize Google Drive sync
   */
  async initialize(): Promise<void> {
    // Load saved status
    const saved = localStorage.getItem('googleDriveSync');
    if (saved) {
      try {
        this.status = JSON.parse(saved);
      } catch (error) {
        console.error('Failed to load sync status:', error);
      }
    }

    // Check if we have a valid token
    const token = localStorage.getItem('googleDriveToken');
    const expiry = localStorage.getItem('googleDriveTokenExpiry');

    if (token && expiry) {
      const expiryTime = parseInt(expiry);
      if (Date.now() < expiryTime) {
        this.accessToken = token;
        this.tokenExpiry = expiryTime;

        // Start auto-sync if enabled
        if (this.status.enabled) {
          this.startAutoSync();
        }
      } else {
        // Token expired, clear it
        this.clearToken();
      }
    }
  }

  /**
   * Sign in with Google and request Drive access
   */
  async signIn(): Promise<boolean> {
    try {
      // Use Google Identity Services (new OAuth method)
      const client = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: DRIVE_SCOPE,
        callback: (response: GoogleAuthResponse) => {
          this.accessToken = response.access_token;
          this.tokenExpiry = Date.now() + (response.expires_in * 1000);

          // Save token
          localStorage.setItem('googleDriveToken', this.accessToken);
          localStorage.setItem('googleDriveTokenExpiry', this.tokenExpiry.toString());

          // Get user email
          this.getUserEmail();

          // Enable sync
          this.status.enabled = true;
          this.status.status = 'success';
          this.saveStatus();

          // Start auto-sync
          this.startAutoSync();
        },
        error_callback: (error: any) => {
          console.error('OAuth error:', error);
          this.status.status = 'error';
          this.status.error = 'Failed to sign in with Google';
          this.saveStatus();
        }
      });

      client.requestAccessToken();
      return true;
    } catch (error) {
      console.error('Sign in error:', error);
      this.status.status = 'error';
      this.status.error = error instanceof Error ? error.message : 'Failed to sign in';
      this.saveStatus();
      return false;
    }
  }

  /**
   * Sign out and disable sync
   */
  async signOut(): Promise<void> {
    // Revoke token
    if (this.accessToken) {
      try {
        await fetch(`https://oauth2.googleapis.com/revoke?token=${this.accessToken}`, {
          method: 'POST'
        });
      } catch (error) {
        console.error('Failed to revoke token:', error);
      }
    }

    // Clear everything
    this.clearToken();
    this.stopAutoSync();

    this.status.enabled = false;
    this.status.connectedEmail = undefined;
    this.status.status = 'idle';
    this.saveStatus();
  }

  /**
   * Get user's email address
   */
  private async getUserEmail(): Promise<void> {
    if (!this.accessToken) return;

    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        this.status.connectedEmail = data.email;
        this.saveStatus();
      }
    } catch (error) {
      console.error('Failed to get user email:', error);
    }
  }

  /**
   * Manually trigger sync
   */
  async syncNow(): Promise<boolean> {
    if (!this.accessToken) {
      this.status.error = 'Not signed in';
      this.status.status = 'error';
      this.saveStatus();
      return false;
    }

    this.status.status = 'syncing';
    this.saveStatus();

    try {
      // Export current data
      const exportData = exportToUniversalFormat();

      // Find or create sync file
      const fileId = await this.findOrCreateSyncFile();

      // Upload data
      await this.uploadFile(fileId, exportData);

      // Download and merge remote data
      await this.downloadAndMerge(fileId);

      this.status.status = 'success';
      this.status.lastSyncTime = Date.now();
      this.status.error = undefined;
      this.saveStatus();

      return true;
    } catch (error) {
      console.error('Sync error:', error);
      this.status.status = 'error';
      this.status.error = error instanceof Error ? error.message : 'Sync failed';
      this.saveStatus();
      return false;
    }
  }

  /**
   * Find existing sync file or create new one
   */
  private async findOrCreateSyncFile(): Promise<string> {
    if (!this.accessToken) throw new Error('Not authenticated');

    // Search for existing file in appDataFolder
    const searchResponse = await fetch(
      `https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=name='${SYNC_FILE_NAME}'`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      }
    );

    if (!searchResponse.ok) {
      throw new Error('Failed to search for sync file');
    }

    const searchData = await searchResponse.json();

    if (searchData.files && searchData.files.length > 0) {
      // File exists, return its ID
      return searchData.files[0].id;
    }

    // File doesn't exist, create it
    const createResponse = await fetch(
      'https://www.googleapis.com/drive/v3/files',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: SYNC_FILE_NAME,
          parents: ['appDataFolder'],
          mimeType: 'application/json'
        })
      }
    );

    if (!createResponse.ok) {
      throw new Error('Failed to create sync file');
    }

    const createData = await createResponse.json();
    return createData.id;
  }

  /**
   * Upload data to Google Drive
   */
  private async uploadFile(fileId: string, content: string): Promise<void> {
    if (!this.accessToken) throw new Error('Not authenticated');

    const response = await fetch(
      `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: content
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload file');
    }
  }

  /**
   * Download and merge remote data
   */
  private async downloadAndMerge(fileId: string): Promise<void> {
    if (!this.accessToken) throw new Error('Not authenticated');

    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to download file');
    }

    const jsonData = await response.text();

    // Import with merge (non-destructive)
    importFromUniversalFormat(jsonData);
  }

  /**
   * Start automatic background sync
   */
  private startAutoSync(): void {
    if (this.syncInterval) return; // Already running

    // Sync every 5 minutes
    this.syncInterval = setInterval(() => {
      this.syncNow();
    }, 5 * 60 * 1000);

    // Also sync on page visibility change (when user returns to tab)
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  /**
   * Stop automatic background sync
   */
  private stopAutoSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }

    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }

  /**
   * Handle page visibility change
   */
  private handleVisibilityChange = (): void => {
    if (!document.hidden && this.status.enabled) {
      // Page became visible, sync now
      this.syncNow();
    }
  };

  /**
   * Get current sync status
   */
  getStatus(): SyncStatus {
    return { ...this.status };
  }

  /**
   * Check if signed in
   */
  isSignedIn(): boolean {
    return this.accessToken !== null && (this.tokenExpiry || 0) > Date.now();
  }

  /**
   * Save status to localStorage
   */
  private saveStatus(): void {
    localStorage.setItem('googleDriveSync', JSON.stringify(this.status));
  }

  /**
   * Clear token from localStorage
   */
  private clearToken(): void {
    this.accessToken = null;
    this.tokenExpiry = null;
    localStorage.removeItem('googleDriveToken');
    localStorage.removeItem('googleDriveTokenExpiry');
  }
}

// Singleton instance
export const googleDriveSync = new GoogleDriveSyncService();

// Initialize on module load (client-side only)
if (typeof window !== 'undefined') {
  googleDriveSync.initialize();
}
