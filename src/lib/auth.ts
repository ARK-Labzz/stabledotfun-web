// lib/auth.ts

export interface SecurityEvent {
  action: string;
  timestamp: string;
  ip: string;
  userAgent: string;
  metadata: Record<string, unknown>;
}

export interface WalletStatus {
  hasWallet: boolean;
  walletAddress?: string;
  securityMethod?: string;
  exportCount?: number;
  lastExport?: string;
}

export interface SessionData {
  sessionId: string;
  userId: string;
  email: string;
  ip: string;
  userAgent: string;
  loginTime: string;
  lastActivity: string;
  isActive: boolean;
}

export interface AuthUser {
  _id: string;
  email: string;
  emailVerified: boolean;
  username?: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  walletAddress?: string;
  encryptedPrivateKey?: string;
  keyDerivationSalt?: string;
  iv?: string;
  walletSecurityMethod?: string;
  walletExportCount?: number;
  lastWalletExport?: string;
  securityEvents?: SecurityEvent[];
  followers: Array<{
    userId: string;
    displayName: string;
    username: string;
    avatarUrl?: string;
    dateJoined: string;
  }>;
  following: Array<{
    userId: string;
    displayName: string;
    username: string;
    avatarUrl?: string;
    dateJoined: string;
  }>;
  referralCode?: string;
  referredBy?: string | null;
  referrals: string[];
  createdStablecoins: Array<{
    stablecoinId: string;
    name: string;
    symbol: string;
    price_usd: number;
    apy: number;
    bondBackedBy?: string;
    dateCreated: string;
  }>;
  portfolio: {
    netWorth: number;
    invested: number;
    totalReturns: number;
    roi: {
      overall: number;
      weekly: number;
      monthly: number;
      yearly: number;
    };
    holdings: Array<{
      id: string;
      name: string;
      symbol: string;
      address: string;
      price_usd: number;
      position_value: number;
      position_size: number;
      mcap: number;
      total_supply: number;
      total_bought: number;
      total_sold: number;
      apy: number;
      bondBackedBy?: string;
      p_and_l: number;
    }>;
    history: Array<{
      id: string;
      name: string;
      symbol: string;
      address: string;
      type: 'buy' | 'sell';
      paid_stablecoin: number;
      received_usdc: number;
      mcap: number;
      date: string;
      status: 'confirmed' | 'pending' | 'failed';
    }>;
    lastUpdated: string;
  };
  otpSecret?: string;
  otpExpires?: string;
  refreshToken?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: AuthUser;
}

export interface SessionInfo {
  isAuthenticated: boolean;
  sessionId?: string;
  userId?: string;
  email?: string;
  username?: string;
  loginTime?: string;
  lastActivity?: string;
  ip?: string;
  userAgent?: string;
}

class AuthError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = 'AuthError';
    this.status = status;
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://stabledotfun-backend-js.onrender.com';

export const auth = {
  // Register new user
  async register(email: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/email/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new AuthError(
          data.message || 'Registration failed',
          response.status
        );
      }

      return {
        success: true,
        message: data.message || 'Verification code sent to your email',
      };
    } catch (error) {
      if (error instanceof AuthError) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
      };
    }
  },

  // Login existing user
  async loginEmail(email: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/email/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new AuthError(
          data.message || 'Login failed',
          response.status
        );
      }

      return {
        success: true,
        message: data.message || 'Login verification code sent to your email',
      };
    } catch (error) {
      if (error instanceof AuthError) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
      };
    }
  },

  // Verify OTP for both signup and login
  async verifyOTP(email: string, otp: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/email/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new AuthError(
          data.message || 'OTP verification failed',
          response.status
        );
      }

      return {
        success: true,
        message: data.message,
        user: data.user,
      };
    } catch (error) {
      if (error instanceof AuthError) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
      };
    }
  },

  // Complete user profile
  async completeProfile(profileData: {
    username: string;
    displayName: string;
    bio?: string;
    referralCode?: string;
    walletPassword?: string;
  }): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/profile/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new AuthError(
          data.message || 'Profile completion failed',
          response.status
        );
      }

      return {
        success: true,
        message: data.message,
        user: data.user,
      };
    } catch (error) {
      if (error instanceof AuthError) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: false,
        message: 'Network error. Please check your connection and try again.',
      };
    }
  },

  // Upload profile avatar
  async uploadAvatar(file: File): Promise<{ success: boolean; message?: string; avatarUrl?: string }> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_BASE_URL}/api/profile/avatar`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new AuthError(
          data.message || 'Avatar upload failed',
          response.status
        );
      }

      return {
        success: true,
        message: data.message || 'Avatar uploaded successfully',
        avatarUrl: data.avatarUrl || data.url,
      };
    } catch (error) {
      if (error instanceof AuthError) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: false,
        message: 'Failed to upload avatar. Please try again.',
      };
    }
  },

  // Logout current session
  async logout(): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      console.error('Logout error occurred');
    }
  },

  // Logout all devices
  async logoutAll(): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout-all`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      console.error('Logout all error occurred');
    }
  },

  // Get current user profile
  async getUser(): Promise<AuthUser | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data;
    } catch {
      console.error('Get user error occurred');
      return null;
    }
  },

  // Get session information (for middleware)
  async getSessionInfo(): Promise<SessionInfo | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/session-info`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data;
    } catch {
      console.error('Session info error occurred');
      return null;
    }
  },

  // Check if session is valid (lightweight for middleware)
  async checkSession(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/session-info`, {
        credentials: 'include',
      });
      
      return response.ok;
    } catch {
      console.error('Session check error occurred');
      return false;
    }
  },

  // Check username availability
  async checkUsername(username: string): Promise<{ available: boolean; message?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/profile/check-username/${encodeURIComponent(username)}`, {
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        return {
          available: true,
          message: data.message || 'Username is available',
        };
      } else {
        return {
          available: false,
          message: data.message || 'Username is not available',
        };
      }
    } catch {
      return {
        available: false,
        message: 'Error checking username availability',
      };
    }
  },

  // Get current user's wallet status
  async getWalletStatus(): Promise<WalletStatus | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/wallet/status`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data;
    } catch {
      console.error('Get wallet status error occurred');
      return null;
    }
  },

  // Create wallet for existing user
  async createWallet(password: string, confirmPassword: string): Promise<{ success: boolean; message?: string; publicKey?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/wallet/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, confirmPassword }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new AuthError(
          data.message || 'Wallet creation failed',
          response.status
        );
      }

      return {
        success: true,
        message: data.message,
        publicKey: data.publicKey,
      };
    } catch (error) {
      if (error instanceof AuthError) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: false,
        message: 'Failed to create wallet. Please try again.',
      };
    }
  },

  // Get all user sessions
  async getAllSessions(): Promise<SessionData[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/sessions`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      return data;
    } catch {
      console.error('Get all sessions error occurred');
      return [];
    }
  },
};

// Error handler utility
export function handleAuthError(error: unknown): string {
  if (error instanceof AuthError) {
    switch (error.status) {
      case 409:
        return 'Email already registered. Please try logging in instead.';
      case 401:
        return 'Invalid or expired OTP. Please check your email and try again.';
      case 404:
        return 'User not found. Please check your email address.';
      case 400:
        return 'Invalid request. Please check your input and try again.';
      case 429:
        return 'Too many attempts. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
}