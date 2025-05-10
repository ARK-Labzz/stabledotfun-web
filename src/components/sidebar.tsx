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
  CashIcon,
  HelpIcon,
  // SettingIcon,
} from "./icons/sidebar";
import { 
  ReceiveIcon, 
  BuyIcon, 
  SwapIcon, 
  StakeIcon, 
  SendIcon,
} from "./icons/mobile-nav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AppSidebar() {
  const pathname = usePathname();
  const { state, isMobile } = useSidebar();

  const navItems = [
    { icon: DashboardIcon, label: "Dashboard", href: "/" },
    { icon: StackIcon, label: "Portfolio", href: "/portfolio" },
    { icon: CashIcon, label: "Create", href: "/create" },
    { icon: CreateFoldericon, label: "Swap", href: "/redeem" },
    { icon: HelpIcon, label: "Help & Support", href: "/help" },
    // { icon: SettingIcon, label: "Settings", href: "/setting" },
  ];

  const mobileNavItems = [
    { icon: ReceiveIcon, label: "Receive", href: "/receive" },
    { icon: BuyIcon, label: "Buy", href: "/buy" },
    { icon: SwapIcon, label: "Swap", href: "/redeem" },
    { icon: StakeIcon, label: "Stake", href: "/stake" },
    { icon: SendIcon, label: "Send", href: "/send" },
  ];

  if (isMobile) {
    return (
      <>
        {/* Fixed mobile navigation bar */}
        <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center md:hidden">
          <div className="backdrop-blur-md bg-black/60 rounded-full border border-white/10 flex items-center justify-between px-6 py-4 w-[85%] max-w-sm shadow-lg">
            {mobileNavItems.map((item) => (
              <Link 
                key={item.label} 
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center",
                  pathname === item.href 
                    ? "text-primary" 
                    : "text-gray-400 hover:text-white"
                )}
              >
                <div className={cn(
                  "p-2 rounded-full mb-1",
                  pathname === item.href 
                    ? "bg-[#23262F]/80" 
                    : "bg-[#23262F]/40"
                )}>
                  <item.icon className="h-5 w-5" />
                </div>
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