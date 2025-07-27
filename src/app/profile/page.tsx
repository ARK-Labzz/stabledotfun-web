"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import ProfileHeader from "./components/profile-header";
import ProfileTabs from "./components/profile-tabs";
import { useAuth } from "@/contexts/auth-context";
import { profile, social, transformers, ProfileData, handleProfileError } from "@/lib/profile";

export default function ProfilePage() {
  const { user, isLoading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("holdings");
  const [profileData, setProfileData] = useState<ProfileData>({
    holdings: [],
    coinsCreated: [],
    referralUsers: [],
    referralCode: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfileData = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    setError("");

    try {
      // Get detailed profile with all data
      const detailedProfile = await profile.getProfile(true);
      
      if (detailedProfile) {
        // Transform backend data to UI format
        const uiData = transformers.userToProfileData(detailedProfile);
        
        // Get referral users separately since they might not be in the main profile
        const referrals = await social.getReferrals();
        const referralCode = await social.getReferralCode();
        
        setProfileData({
          ...uiData,
          referralUsers: transformers.referralsToUI(referrals),
          referralCode: referralCode || uiData.referralCode,
        });
      } else {
        setError("Failed to load profile data");
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      setError(handleProfileError(error));
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const handleRefresh = () => {
    fetchProfileData();
  };

  useEffect(() => {
    if (user && !authLoading) {
      fetchProfileData();
    }
  }, [user, authLoading, fetchProfileData]);

  // Show loading state while auth is loading
  if (authLoading) {
    return (
      <div className="w-full mx-auto py-2 px-2 sm:py-4 sm:px-4 md:max-w-6xl">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  // Show error state if user is not authenticated
  if (!user) {
    return (
      <div className="w-full mx-auto py-2 px-2 sm:py-4 sm:px-4 md:max-w-6xl">
        <div className="text-center py-10">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Authentication Required</h2>
          <p className="text-gray-400 mb-4">Please log in to view your profile</p>
          <Link href="/auth/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto py-2 px-2 sm:py-4 sm:px-4 md:max-w-6xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Profile</h1>
        <div className="flex items-center gap-2">
          {/* Refresh Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={isLoading}
            className="rounded-full h-8 w-8 sm:h-10 sm:w-10 bg-white/5"
            aria-label="Refresh Profile"
          >
            <RefreshCw className={`h-4 w-4 sm:h-5 sm:w-5 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          
          {/* Help Button */}
          <Link href="/resources">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-8 w-8 sm:h-10 sm:w-10 bg-white/5"
              aria-label="Help and Resources"
            >
              <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <div>
              <p className="text-red-200 text-sm">{error}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                className="mt-2 text-red-200 hover:text-red-100"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Content */}
      <ProfileHeader 
        profile={user} 
        isOwnProfile={true}
      />
      
      <ProfileTabs 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        profileData={profileData}
        isLoading={isLoading}
      />

      {/* Debug Info (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
          <h3 className="text-sm font-medium text-white mb-2">Debug Info</h3>
          <div className="text-xs text-gray-400 space-y-1">
            <p>Holdings: {profileData.holdings.length}</p>
            <p>Created: {profileData.coinsCreated.length}</p>
            <p>Referrals: {profileData.referralUsers.length}</p>
            <p>Referral Code: {profileData.referralCode || 'None'}</p>
            <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
          </div>
        </div>
      )}
    </div>
  );
}