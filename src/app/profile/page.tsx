"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import Link from "next/link";
import ProfileHeader from "./components/profile-header";
import ProfileTabs from "./components/profile-tabs";
import { profileData } from "./data/mock-data";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("holdings");

  return (
    // Removed max-w-6xl to allow full responsive width on mobile
    <div className="w-full mx-auto py-2 px-2 sm:py-4 sm:px-4 md:max-w-6xl">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Profile</h1>
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
      <ProfileHeader profile={profileData} />
      <ProfileTabs 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        profile={profileData} 
      />
    </div>
  );
}