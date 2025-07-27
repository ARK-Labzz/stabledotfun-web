"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Share2, Copy, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { ReferralUserForUI } from "@/lib/profile";

interface ReferralsTabProps {
  referralUsers: ReferralUserForUI[];
  referralCode: string;
  isLoading?: boolean;
}

export default function ReferralsTab({ referralUsers, referralCode, isLoading = false }: ReferralsTabProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      toast("Referral code copied to clipboard!");
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast("Failed to copy referral code");
    }
  };

  const generateReferralLink = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return `${baseUrl}/auth/signup?ref=${referralCode}`;
  };

  const handleShareReferralLink = async () => {
    const referralLink = generateReferralLink();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Stable.fun',
          text: 'Join me on Stable.fun and start earning with stablecoins!',
          url: referralLink,
        });
      } catch (error) {
        // Fallback to copy
        await navigator.clipboard.writeText(referralLink);
        toast("Referral link copied to clipboard!");
      }
    } else {
      // Fallback to copy
      await navigator.clipboard.writeText(referralLink);
      toast("Referral link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-10 sm:py-16 bg-white/5 rounded-xl sm:rounded-2xl border border-secondary/30">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-sm sm:text-base text-gray-400">Loading your referrals...</p>
      </div>
    );
  }

  if (referralUsers.length === 0) {
    return (
      <div className="text-center py-10 sm:py-16 bg-white/5 rounded-xl sm:rounded-2xl border border-secondary/30">
        <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">You don&apos;t have any referrals yet.</p>
        <div className="space-y-3">
          <Button 
            onClick={handleCopyReferralCode}
            size="sm"
            className="text-xs sm:text-sm"
          >
            {copied ? (
              <>
                <CheckCircle className="mr-2 h-3 w-3" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-3 w-3" />
                Copy Referral Code
              </>
            )}
          </Button>
          
          {referralCode && (
            <div className="text-xs text-gray-500 font-mono bg-white/5 rounded-lg p-2 max-w-xs mx-auto">
              {referralCode}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-xl sm:rounded-2xl border border-secondary/30 overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full">
          <thead>
            <tr className="bg-white/5">
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-400">User</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-400 hidden sm:table-cell">Username</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-400 hidden md:table-cell">Joined</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-400"></th>
            </tr>
          </thead>
          <tbody>
            {referralUsers.map((user) => (
              <tr key={user.id} className="border-t border-white/5 hover:bg-white/5">
                <td className="px-2 sm:px-4 py-2 sm:py-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Keep user avatars as circles */}
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/5 overflow-hidden">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to default avatar
                          (e.target as HTMLImageElement).src = '/default-avatar.png';
                        }}
                      />
                    </div>
                    <div className="font-medium text-xs sm:text-sm">{user.name}</div>
                  </div>
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-4 text-right text-xs sm:text-sm text-gray-400 hidden sm:table-cell">
                  @{user.username}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-4 text-right text-xs sm:text-sm text-gray-400 hidden md:table-cell">
                  {new Date(user.joinDate).toLocaleDateString()}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 sm:h-8 text-xs sm:text-sm text-primary"
                    asChild
                  >
                    <Link href={`/profile/${user.username}`}>
                      <span className="hidden sm:inline">Profile</span> <ExternalLink className="ml-0 sm:ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-3 sm:p-4 flex flex-col sm:flex-row justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full sm:w-auto text-xs sm:text-sm flex items-center gap-1 sm:gap-2"
          onClick={handleCopyReferralCode}
        >
          {copied ? (
            <>
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
              Copy Code
            </>
          )}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="w-full sm:w-auto text-xs sm:text-sm flex items-center gap-1 sm:gap-2"
          onClick={handleShareReferralLink}
        >
          <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
          Share Link
        </Button>
      </div>
      
      {referralCode && (
        <div className="px-3 sm:px-4 pb-3 sm:pb-4">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">Your referral code:</p>
            <div className="text-xs font-mono bg-white/5 rounded-lg p-2 text-primary">
              {referralCode}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}