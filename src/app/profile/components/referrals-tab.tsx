"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

interface ReferralsTabProps {
  referralUsers: Array<{
    id: string;
    name: string;
    username: string;
    joinDate: string;
    avatar: string;
  }>;
  referralCode: string;
}

export default function ReferralsTab({ referralUsers, referralCode }: ReferralsTabProps) {
  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast("Referral code copied to clipboard!");
  };

  if (referralUsers.length === 0) {
    return (
      <div className="text-center py-10 sm:py-16 bg-white/5 rounded-xl sm:rounded-2xl border border-secondary/30">
        <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">You don&apos;t have any referrals yet.</p>
        <Button 
          onClick={handleCopyReferralCode}
          size="sm"
          className="text-xs sm:text-sm"
        >
          Share Your Referral Code
        </Button>
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
      
      <div className="p-3 sm:p-4 flex justify-center">
        <Button
          variant="outline"
          size="sm"
          className="w-full sm:w-auto text-xs sm:text-sm flex items-center gap-1 sm:gap-2"
          onClick={handleCopyReferralCode}
        >
          <Share2 className="h-3 w-3 sm:h-4 sm:w-4" /> Share Your Referral Code
        </Button>
      </div>
    </div>
  );
}