'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Cloud, CloudOff, RefreshCw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { googleDriveSync } from '@/lib/googleDriveSync';

export function GoogleDriveSync() {
  const [status, setStatus] = useState(googleDriveSync.getStatus());
  const [syncing, setSyncing] = useState(false);

  // Update status periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(googleDriveSync.getStatus());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSignIn = async () => {
    await googleDriveSync.signIn();
    setStatus(googleDriveSync.getStatus());
  };

  const handleSignOut = async () => {
    if (confirm('Are you sure you want to disconnect Google Drive? Local data will not be affected.')) {
      await googleDriveSync.signOut();
      setStatus(googleDriveSync.getStatus());
    }
  };

  const handleSyncNow = async () => {
    setSyncing(true);
    await googleDriveSync.syncNow();
    setStatus(googleDriveSync.getStatus());
    setSyncing(false);
  };

  const isSignedIn = googleDriveSync.isSignedIn();

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cloud className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Google Drive Auto-Sync</h2>
              <p className="text-sm text-slate-600">
                Automatically sync your data across all devices
              </p>
            </div>
          </div>

          {/* Status Indicator */}
          {isSignedIn && (
            <div className="flex items-center gap-2">
              {status.status === 'syncing' && (
                <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
              )}
              {status.status === 'success' && (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
              {status.status === 'error' && (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              {status.status === 'idle' && (
                <CloudOff className="h-4 w-4 text-gray-400" />
              )}
            </div>
          )}
        </div>

        {/* Connection Status */}
        {isSignedIn ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-green-900">Connected</p>
                {status.connectedEmail && (
                  <p className="text-xs text-green-700">{status.connectedEmail}</p>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                Disconnect
              </Button>
            </div>

            {/* Last Sync Time */}
            {status.lastSyncTime && (
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Last synced:</span>
                <span>{new Date(status.lastSyncTime).toLocaleString()}</span>
              </div>
            )}

            {/* Sync Status */}
            {status.status === 'syncing' && (
              <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
                <p className="text-sm text-blue-900">Syncing...</p>
              </div>
            )}

            {status.status === 'error' && status.error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <XCircle className="h-4 w-4 text-red-600" />
                <p className="text-sm text-red-900">{status.error}</p>
              </div>
            )}

            {status.status === 'success' && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <p className="text-sm text-green-900">All data synced</p>
              </div>
            )}

            {/* Sync Now Button */}
            <Button
              onClick={handleSyncNow}
              disabled={syncing || status.status === 'syncing'}
              className="w-full"
            >
              {syncing || status.status === 'syncing' ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync Now
                </>
              )}
            </Button>

            {/* Auto-sync Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm font-medium text-blue-900 mb-1 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Auto-sync is enabled
              </p>
              <p className="text-xs text-blue-700">
                Your data will automatically sync every 5 minutes and when you return to this tab.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-slate-700">
              Connect your Google Drive to automatically sync your test data across all devices.
              Your data will be stored securely in a hidden folder only accessible by this app.
            </p>

            <Button onClick={handleSignIn} size="lg" className="w-full">
              <Cloud className="h-4 w-4 mr-2" />
              Connect Google Drive
            </Button>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2 text-xs text-slate-700">
              <p className="font-medium text-slate-900">What happens when you connect:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Your data is stored in a private, hidden folder in your Google Drive</li>
                <li>Automatically syncs every 5 minutes when app is open</li>
                <li>Syncs when you switch between tabs/devices</li>
                <li>Data is merged intelligently (no duplicates)</li>
                <li>You can disconnect anytime - local data is never deleted</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
