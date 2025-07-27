// lib/profile.ts

import { AuthUser } from './auth';

// Profile interfaces based on your schemas and components
export interface TokenHolding {
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
}

export interface TransactionHistory {
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
}

export interface CreatedStablecoin {
  stablecoinId: string;
  name: string;
  symbol: string;
  price_usd: number;
  apy: number;
  bondBackedBy?: string;
  dateCreated: string;
}

export interface UserReference {
  userId: string;
  displayName: string;
  username: string;
  avatarUrl?: string;
  dateJoined: string;
}

// Component data interfaces (for UI components)
export interface HoldingForUI {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  value: number;
  apy?: number;
  bond?: string;
  icon: string;
}

export interface CreatedCoinForUI {
  id: string;
  name: string;
  symbol: string;
  price: number;
  apy: number;
  bond: string;
  createdAt: string;
  icon: string;
}

export interface ReferralUserForUI {
  id: string;
  name: string;
  username: string;
  joinDate: string;
  avatar: string;
}

export interface ProfileData {
  holdings: HoldingForUI[];
  coinsCreated: CreatedCoinForUI[];
  referralUsers: ReferralUserForUI[];
  referralCode: string;
}

export interface ProfileResponse {
  success: boolean;
  message?: string;
  data?: any;
}

class ProfileError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ProfileError';
    this.status = status;
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://stabledotfun-backend-js.onrender.com';

export const profile = {
  // Get current user profile with detailed flag
  async getProfile(detailed: boolean = true): Promise<AuthUser | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/profile?detailed=${detailed}`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get profile error:', error);
      return null;
    }
  },

  // Update current user profile
  async updateProfile(profileData: {
    username?: string;
    displayName?: string;
    bio?: string;
  }): Promise<ProfileResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ProfileError(
          data.message || 'Profile update failed',
          response.status
        );
      }

      return {
        success: true,
        message: data.message || 'Profile updated successfully',
        data: data,
      };
    } catch (error) {
      if (error instanceof ProfileError) {
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

  // Get profile by username
  async getProfileByUsername(username: string): Promise<AuthUser | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/profile/${encodeURIComponent(username)}`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get profile by username error:', error);
      return null;
    }
  },

  // Get user followers with pagination
  async getFollowers(username: string, page: number = 1, limit: number = 20): Promise<{
    followers: UserReference[];
    total: number;
    page: number;
    limit: number;
  } | null> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/profile/${encodeURIComponent(username)}/followers?page=${page}&limit=${limit}`,
        {
          credentials: 'include',
        }
      );
      
      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get followers error:', error);
      return null;
    }
  },

  // Get users that this user follows with pagination
  async getFollowing(username: string, page: number = 1, limit: number = 20): Promise<{
    following: UserReference[];
    total: number;
    page: number;
    limit: number;
  } | null> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/profile/${encodeURIComponent(username)}/following?page=${page}&limit=${limit}`,
        {
          credentials: 'include',
        }
      );
      
      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get following error:', error);
      return null;
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
        throw new ProfileError(
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
      if (error instanceof ProfileError) {
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
};

// Social utilities
export const social = {
  // Follow a user
  async followUser(username: string): Promise<ProfileResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/social/follow/${encodeURIComponent(username)}`, {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ProfileError(
          data.message || 'Failed to follow user',
          response.status
        );
      }

      return {
        success: true,
        message: data.message || 'Successfully followed user',
        data: data,
      };
    } catch (error) {
      if (error instanceof ProfileError) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  },

  // Unfollow a user
  async unfollowUser(username: string): Promise<ProfileResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/social/unfollow/${encodeURIComponent(username)}`, {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ProfileError(
          data.message || 'Failed to unfollow user',
          response.status
        );
      }

      return {
        success: true,
        message: data.message || 'Successfully unfollowed user',
        data: data,
      };
    } catch (error) {
      if (error instanceof ProfileError) {
        return {
          success: false,
          message: error.message,
        };
      }

      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  },

  // Check if following a user
  async isFollowing(username: string): Promise<{ isFollowing: boolean }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/social/is-following/${encodeURIComponent(username)}`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        return { isFollowing: false };
      }

      const data = await response.json();
      return { isFollowing: data.isFollowing || false };
    } catch (error) {
      console.error('Check following error:', error);
      return { isFollowing: false };
    }
  },

  // Get current user's followers
  async getMyFollowers(): Promise<UserReference[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/social/followers`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get my followers error:', error);
      return [];
    }
  },

  // Get current user's following list
  async getMyFollowing(): Promise<UserReference[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/social/following`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get my following error:', error);
      return [];
    }
  },

  // Get mutual followers with another user
  async getMutualFollowers(username: string): Promise<UserReference[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/social/mutual-followers/${encodeURIComponent(username)}`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get mutual followers error:', error);
      return [];
    }
  },

  // Get recommended users to follow
  async getRecommended(): Promise<UserReference[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/social/recommended`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get recommended error:', error);
      return [];
    }
  },

  // Get user's referral code
  async getReferralCode(): Promise<string | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/social/referral-code`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.referralCode || null;
    } catch (error) {
      console.error('Get referral code error:', error);
      return null;
    }
  },

  // Get user's referrals
  async getReferrals(): Promise<UserReference[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/social/referrals`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get referrals error:', error);
      return [];
    }
  },

  // Get social statistics
  async getStats(): Promise<{
    followersCount: number;
    followingCount: number;
    referralsCount: number;
  } | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/social/stats`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get social stats error:', error);
      return null;
    }
  },
};

// Data transformation utilities
export const transformers = {
  // Transform backend holdings to UI format
  holdingsToUI(holdings: TokenHolding[]): HoldingForUI[] {
    return holdings.map(holding => ({
      id: holding.id,
      name: holding.name,
      symbol: holding.symbol,
      amount: holding.position_size,
      value: holding.position_value,
      apy: holding.apy,
      bond: holding.bondBackedBy,
      icon: `/tokens/${holding.symbol.toLowerCase()}.png`, // Assuming icon path pattern
    }));
  },

  // Transform backend created stablecoins to UI format
  createdCoinsToUI(stablecoins: CreatedStablecoin[]): CreatedCoinForUI[] {
    return stablecoins.map(coin => ({
      id: coin.stablecoinId,
      name: coin.name,
      symbol: coin.symbol,
      price: coin.price_usd,
      apy: coin.apy,
      bond: coin.bondBackedBy || 'N/A',
      createdAt: coin.dateCreated,
      icon: `/tokens/${coin.symbol.toLowerCase()}.png`, // Assuming icon path pattern
    }));
  },

  // Transform backend user references to UI format
  referralsToUI(referrals: UserReference[]): ReferralUserForUI[] {
    return referrals.map(referral => ({
      id: referral.userId,
      name: referral.displayName,
      username: referral.username,
      joinDate: referral.dateJoined,
      avatar: referral.avatarUrl || '/default-avatar.png', // Fallback avatar
    }));
  },

  // Transform full user data to profile data for UI
  userToProfileData(user: AuthUser): ProfileData {
    return {
      holdings: this.holdingsToUI(user.portfolio?.holdings || []),
      coinsCreated: this.createdCoinsToUI(user.createdStablecoins || []),
      referralUsers: [], // Will be populated separately via social.getReferrals()
      referralCode: user.referralCode || '',
    };
  },
};

// Error handler utility
export function handleProfileError(error: unknown): string {
  if (error instanceof ProfileError) {
    switch (error.status) {
      case 409:
        return 'Username already taken. Please choose a different one.';
      case 401:
        return 'You must be logged in to perform this action.';
      case 404:
        return 'User not found.';
      case 400:
        return 'Invalid request. Please check your input.';
      case 429:
        return 'Too many requests. Please try again later.';
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