"use client";

import { Button } from "@/components/ui/button";
import { Copy, Edit, Users, UserCheck, Share2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface ProfileHeaderProps {
  profile: {
    name: string;
    username: string;
    bio: string;
    avatar: string;
    followers: number;
    following: number;
    referrals: number;
    referralCode: string;
  };
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(profile.referralCode);
    toast("Referral code copied to clipboard!");
  };

  return (
    <div className="bg-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-secondary/30 mb-4 sm:mb-6">
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-start">
        {/* Avatar - Kept circular */}
        <div className="relative mx-auto md:mx-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-secondary/30 border-2 border-secondary overflow-hidden">
            <Image
              src={profile.avatar}
              alt="Avatar"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
            <div className="text-center md:text-left">
              <h2 className="text-lg sm:text-xl font-bold">{profile.name}</h2>
              <p className="text-gray-400 text-sm">@{profile.username}</p>
            </div>
            <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs sm:text-sm">
              <Edit className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Edit Profile
            </Button>
          </div>
          <p className="text-xs sm:text-sm mb-3 sm:mb-4 text-center md:text-left">{profile.bio}</p>
          
          {/* Stats - Reduced to 2 columns on smaller screens */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-6">
            <div className="flex flex-col items-center p-2 sm:p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-1 sm:gap-2 text-primary">
                <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="font-bold text-sm sm:text-base">{profile.followers}</span>
              </div>
              <span className="text-[10px] sm:text-xs text-gray-400">Followers</span>
            </div>
            
            <div className="flex flex-col items-center p-2 sm:p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-1 sm:gap-2 text-primary">
                <UserCheck className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="font-bold text-sm sm:text-base">{profile.following}</span>
              </div>
              <span className="text-[10px] sm:text-xs text-gray-400">Following</span>
            </div>
            
            <div className="flex flex-col items-center p-2 sm:p-3 bg-white/5 rounded-lg col-span-2">
              <div className="flex items-center gap-1 sm:gap-2 text-primary">
                <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="font-bold text-sm sm:text-base">{profile.referrals}</span>
              </div>
              <span className="text-[10px] sm:text-xs text-gray-400">Referrals</span>
            </div>
          </div>
          
          {/* Referral Code - Stacked on mobile */}
          <div className="flex flex-col gap-2 items-center bg-white/5 p-2 sm:p-3 rounded-lg">
            <div className="text-center sm:text-left w-full">
              <span className="text-[10px] sm:text-xs text-gray-400 block mb-1">Your Referral Code</span>
              <span className="font-mono text-xs sm:text-sm">{profile.referralCode}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs sm:text-sm"
              onClick={handleCopyReferralCode}
            >
              <Copy className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Copy Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}