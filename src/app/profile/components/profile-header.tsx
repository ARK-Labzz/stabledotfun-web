"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings, UserPlus, UserMinus, MessageCircle, MoreHorizontal, Copy, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { AuthUser } from "@/lib/auth";
import { social } from "@/lib/profile";

interface ProfileHeaderProps {
  profile: AuthUser;
  isOwnProfile?: boolean;
  isFollowing?: boolean;
  onFollowChange?: (isFollowing: boolean) => void;
}

export default function ProfileHeader({ 
  profile, 
  isOwnProfile = true, 
  isFollowing = false,
  onFollowChange 
}: ProfileHeaderProps) {
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentlyFollowing, setCurrentlyFollowing] = useState(isFollowing);

  const handleFollow = async () => {
    if (!profile.username) return;
    
    setIsFollowLoading(true);
    
    try {
      let result;
      if (currentlyFollowing) {
        result = await social.unfollowUser(profile.username);
      } else {
        result = await social.followUser(profile.username);
      }

      if (result.success) {
        setCurrentlyFollowing(!currentlyFollowing);
        onFollowChange?.(!currentlyFollowing);
        toast(result.message || (currentlyFollowing ? 'Unfollowed successfully' : 'Following successfully'));
      } else {
        toast(result.message || 'Action failed');
      }
    } catch (error) {
      toast('Network error. Please try again.');
    } finally {
      setIsFollowLoading(false);
    }
  };

  const handleCopyProfile = async () => {
    const profileUrl = `${window.location.origin}/profile/${profile.username}`;
    
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      toast("Profile link copied!");
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast("Failed to copy profile link");
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="bg-white/5 rounded-xl sm:rounded-2xl border border-secondary/30 p-4 sm:p-6 mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        {/* Avatar */}
        <div className="relative">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/5 overflow-hidden">
            {profile.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt={profile.displayName || profile.username || 'User'}
                width={80}
                height={80}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/default-avatar.png';
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">
                  {(profile.displayName || profile.username || 'U')[0].toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-white truncate">
                {profile.displayName || profile.username || 'Anonymous User'}
              </h1>
              {profile.username && (
                <p className="text-sm text-gray-400">@{profile.username}</p>
              )}
              {profile.bio && (
                <p className="text-xs sm:text-sm text-gray-300 mt-1 sm:mt-2 line-clamp-2">
                  {profile.bio}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {isOwnProfile ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyProfile}
                    className="text-xs h-8"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1 h-3 w-3" />
                        Share
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="text-xs h-8"
                  >
                    <Link href="/profile/settings">
                      <Settings className="mr-1 h-3 w-3" />
                      Edit
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleFollow}
                    disabled={isFollowLoading}
                    size="sm"
                    variant={currentlyFollowing ? "outline" : "default"}
                    className="text-xs h-8"
                  >
                    {isFollowLoading ? (
                      <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin mr-1" />
                    ) : currentlyFollowing ? (
                      <UserMinus className="mr-1 h-3 w-3" />
                    ) : (
                      <UserPlus className="mr-1 h-3 w-3" />
                    )}
                    {currentlyFollowing ? 'Unfollow' : 'Follow'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8"
                  >
                    <MessageCircle className="mr-1 h-3 w-3" />
                    Message
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyProfile}
                    className="text-xs h-8"
                  >
                    {copied ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <MoreHorizontal className="h-3 w-3" />
                    )}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
        <div className="text-center">
          <div className="text-lg sm:text-xl font-bold text-white">
            ${formatNumber(profile.portfolio?.netWorth || 0)}
          </div>
          <div className="text-xs text-gray-400">Net Worth</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg sm:text-xl font-bold text-white">
            {profile.portfolio?.roi?.overall || 0}%
          </div>
          <div className="text-xs text-gray-400">Overall ROI</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg sm:text-xl font-bold text-white">
            {formatNumber(profile.followers?.length || 0)}
          </div>
          <div className="text-xs text-gray-400">Followers</div>
        </div>
        
        <div className="text-center">
          <div className="text-lg sm:text-xl font-bold text-white">
            {formatNumber(profile.following?.length || 0)}
          </div>
          <div className="text-xs text-gray-400">Following</div>
        </div>
      </div>

      {/* Wallet Address (if available) */}
      {profile.walletAddress && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-1">Wallet Address</p>
              <p className="text-xs font-mono text-white truncate max-w-[200px] sm:max-w-[300px]">
                {profile.walletAddress}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigator.clipboard.writeText(profile.walletAddress!)}
              className="text-xs h-6 px-2"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}