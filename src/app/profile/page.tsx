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
    <div className="w-full max-w-6xl mx-auto py-4 px-4 sm:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Link href="/resources">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 bg-white/5"
            aria-label="Help and Resources"
          >
            <HelpCircle className="h-5 w-5" />
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