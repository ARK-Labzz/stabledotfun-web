"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import {
  DashboardIcon,
  StackIcon,
  CreateFoldericon,
} from "./icons/sidebar";
import { 
  SwapIcon, 
  ProfileIcon,
} from "./icons/mobile-nav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AppSidebar() {
  const pathname = usePathname();
  const { state, isMobile } = useSidebar();

  const navItems = [
    { icon: DashboardIcon, label: "Dashboard", href: "/" },
    { icon: StackIcon, label: "Portfolio", href: "/portfolio" },
    { icon: CreateFoldericon, label: "Create", href: "/create" },
    { icon: SwapIcon, label: "Swap", href: "/swap" },
    { icon: ProfileIcon, label: "Profile", href: "/profile" },
  ];

  const mobileNavItems = [
    { icon: DashboardIcon, label: "Dashboard", href: "/" },
    { icon: StackIcon, label: "Portfolio", href: "/portfolio" },
    { icon: CreateFoldericon, label: "Create", href: "/create" },
    { icon: SwapIcon, label: "Swap", href: "/swap" },
    { icon: ProfileIcon, label: "Profile", href: "/profile" },
  ];

  if (isMobile) {
    return (
      <>
        {/* Updated mobile navigation: full width, fixed to bottom, no glassmorphism */}
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#040D13] border-t border-white/10">
          <div className="flex items-center justify-between w-full px-2 py-3">
            {mobileNavItems.map((item) => (
              <Link 
                key={item.label} 
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center px-2",
                  pathname === item.href 
                    ? "text-primary" 
                    : "text-gray-400 hover:text-white"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 mb-1",
                  pathname === item.href ? "text-primary" : "text-gray-400"
                )} />
                <span className="text-[10px]">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden" />
      </>
    );
  }

  return (
    <Sidebar collapsible="icon" className="border-none z-30 hidden md:block">
      <SidebarHeader className="flex flex-col items-center justify-center gap-4">
        {state === "collapsed" && !isMobile ? (
          <div className="flex flex-col">
            <Link href="/" className="block">
              <Image
                src="./stable-fun.svg"
                alt="Logo"
                className="w-6 h-6"
                width={36}
                height={36}
                priority
              />
            </Link>
            <Image
              src="./line.svg"
              alt="Line"
              width={100}
              height={10}
              priority
            />
          </div>
        ) : (
          <Link href={"/"}>
            <Image
              src={"./stable-fun-logo.svg"}
              alt="Logo"
              width={140}
              height={34}
              priority
            />
          </Link>
        )}
      </SidebarHeader>
      <SidebarContent className="py-2">
        <SidebarMenu className="px-1 gap-3">
          {navItems.map((project) => (
            <SidebarMenuItem key={project.label}>
              <SidebarMenuButton
                className={cn(
                  "p-2 hover:bg-white/5 hover:text-primary",
                  pathname === project.href
                    ? "border border-primary/10 bg-white/5"
                    : ""
                )}
                asChild
              >
                <Link href={project.href} className="text-white text-sm">
                  <project.icon />
                  <span>{project.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}