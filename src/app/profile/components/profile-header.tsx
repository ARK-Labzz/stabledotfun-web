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
    <div className="bg-white/5 rounded-2xl p-6 border border-secondary/30 mb-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Avatar */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-secondary/30 border-2 border-secondary overflow-hidden">
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
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <p className="text-gray-400">@{profile.username}</p>
            </div>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>
          <p className="text-sm mb-4">{profile.bio}</p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-2 text-primary">
                <Users className="h-4 w-4" />
                <span className="font-bold">{profile.followers}</span>
              </div>
              <span className="text-xs text-gray-400">Followers</span>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-2 text-primary">
                <UserCheck className="h-4 w-4" />
                <span className="font-bold">{profile.following}</span>
              </div>
              <span className="text-xs text-gray-400">Following</span>
            </div>
            
            <div className="flex flex-col items-center p-3 bg-white/5 rounded-lg col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 text-primary">
                <Share2 className="h-4 w-4" />
                <span className="font-bold">{profile.referrals}</span>
              </div>
              <span className="text-xs text-gray-400">Referrals</span>
            </div>
          </div>
          
          {/* Referral Code */}
          <div className="flex flex-col sm:flex-row gap-2 items-center bg-white/5 p-3 rounded-lg">
            <div className="flex-1">
              <span className="text-xs text-gray-400 block mb-1">Your Referral Code</span>
              <span className="font-mono text-sm">{profile.referralCode}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto"
              onClick={handleCopyReferralCode}
            >
              <Copy className="mr-2 h-4 w-4" /> Copy Code
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}