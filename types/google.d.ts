/**
 * TypeScript definitions for Google Identity Services
 */

interface GoogleAuthResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  error?: string;
  error_description?: string;
}

interface TokenClient {
  requestAccessToken(overrideConfig?: object): void;
}

interface TokenClientConfig {
  client_id: string;
  scope: string;
  callback: (response: GoogleAuthResponse) => void;
  error_callback?: (error: any) => void;
}

interface GoogleAccounts {
  oauth2: {
    initTokenClient(config: TokenClientConfig): TokenClient;
    hasGrantedAllScopes(tokenResponse: GoogleAuthResponse, ...scopes: string[]): boolean;
    hasGrantedAnyScope(tokenResponse: GoogleAuthResponse, ...scopes: string[]): boolean;
    revoke(accessToken: string, done?: () => void): void;
  };
  id: {
    initialize(config: any): void;
    prompt(momentListener?: (notification: any) => void): void;
    renderButton(parent: HTMLElement, options: any): void;
  };
}

interface Google {
  accounts: GoogleAccounts;
}

declare const google: Google;
