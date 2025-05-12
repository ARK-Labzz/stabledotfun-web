"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HoldingsTab from "./holdings-tab";
import CreatedTab from "./create-tab";
import ReferralsTab from "./referrals-tab";

interface Holding {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  value: number;
  apy?: number;
  bond?: string;
  icon: string;
}

interface CreatedCoin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  apy: number;
  bond: string;
  createdAt: string;
  icon: string;
}

interface ReferralUser {
  id: string;
  name: string;
  username: string;
  joinDate: string;
  avatar: string;
}

interface Profile {
  holdings: Holding[];
  coinsCreated: CreatedCoin[];
  referralUsers: ReferralUser[];
  referralCode: string;
}

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile: Profile; 
}

export default function ProfileTabs({ 
  activeTab, 
  setActiveTab,
  profile
}: ProfileTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-3 mb-3 sm:mb-6 h-10">
        <TabsTrigger value="holdings" className="text-xs sm:text-sm">Holdings</TabsTrigger>
        <TabsTrigger value="created" className="text-xs sm:text-sm">Created</TabsTrigger>
        <TabsTrigger value="referrals" className="text-xs sm:text-sm">Referrals</TabsTrigger>
      </TabsList>
      
      {/* Holdings Tab */}
      <TabsContent value="holdings" className="space-y-2 sm:space-y-4">
        <HoldingsTab holdings={profile.holdings} />
      </TabsContent>
      
      {/* Created Coins Tab */}
      <TabsContent value="created" className="space-y-2 sm:space-y-4">
        <CreatedTab coinsCreated={profile.coinsCreated} />
      </TabsContent>
      
      {/* Referrals Tab */}
      <TabsContent value="referrals" className="space-y-2 sm:space-y-4">
        <ReferralsTab 
          referralUsers={profile.referralUsers} 
          referralCode={profile.referralCode} 
        />
      </TabsContent>
    </Tabs>
  );
}