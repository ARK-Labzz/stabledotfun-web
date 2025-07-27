"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HoldingsTab from "./holdings-tab";
import CreatedTab from "./create-tab";
import ReferralsTab from "./referrals-tab";
import { ProfileData } from "@/lib/profile";

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profileData: ProfileData;
  isLoading?: boolean;
}

export default function ProfileTabs({ 
  activeTab, 
  setActiveTab,
  profileData,
  isLoading = false
}: ProfileTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-3 mb-3 sm:mb-6 h-10">
        <TabsTrigger value="holdings" className="text-xs sm:text-sm">
          Holdings
          {!isLoading && profileData.holdings.length > 0 && (
            <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-primary/20 text-primary rounded-full">
              {profileData.holdings.length}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="created" className="text-xs sm:text-sm">
          Created
          {!isLoading && profileData.coinsCreated.length > 0 && (
            <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-primary/20 text-primary rounded-full">
              {profileData.coinsCreated.length}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="referrals" className="text-xs sm:text-sm">
          Referrals
          {!isLoading && profileData.referralUsers.length > 0 && (
            <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-primary/20 text-primary rounded-full">
              {profileData.referralUsers.length}
            </span>
          )}
        </TabsTrigger>
      </TabsList>
      
      {/* Holdings Tab */}
      <TabsContent value="holdings" className="space-y-2 sm:space-y-4">
        <HoldingsTab 
          holdings={profileData.holdings} 
          isLoading={isLoading}
        />
      </TabsContent>
      
      {/* Created Coins Tab */}
      <TabsContent value="created" className="space-y-2 sm:space-y-4">
        <CreatedTab 
          coinsCreated={profileData.coinsCreated} 
          isLoading={isLoading}
        />
      </TabsContent>
      
      {/* Referrals Tab */}
      <TabsContent value="referrals" className="space-y-2 sm:space-y-4">
        <ReferralsTab 
          referralUsers={profileData.referralUsers} 
          referralCode={profileData.referralCode}
          isLoading={isLoading}
        />
      </TabsContent>
    </Tabs>
  );
}