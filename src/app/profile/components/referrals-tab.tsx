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
      <div className="text-center py-16 bg-white/5 rounded-2xl border border-secondary/30">
        <p className="text-gray-400 mb-4">You don&apos;t have any referrals yet.</p>
        <Button onClick={handleCopyReferralCode}>
          Share Your Referral Code
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-2xl border border-secondary/30 overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full">
          <thead>
            <tr className="bg-white/5">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">User</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400">Username</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400">Joined</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400"></th>
            </tr>
          </thead>
          <tbody>
            {referralUsers.map((user) => (
              <tr key={user.id} className="border-t border-white/5 hover:bg-white/5">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 overflow-hidden">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="font-medium">{user.name}</div>
                  </div>
                </td>
                <td className="px-4 py-4 text-right text-gray-400">
                  @{user.username}
                </td>
                <td className="px-4 py-4 text-right text-gray-400">
                  {new Date(user.joinDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-primary"
                    asChild
                  >
                    <Link href={`/profile/${user.username}`}>
                      Profile <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 flex justify-center">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          onClick={handleCopyReferralCode}
        >
          <Share2 className="h-4 w-4" /> Share Your Referral Code
        </Button>
      </div>
    </div>
  );
}