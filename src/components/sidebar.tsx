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
  SettingIcon,
} from "./icons/sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AppSidebar() {
  const pathname = usePathname();
  const {
    state,
    // open,
    // setOpen,
    // openMobile,
    // setOpenMobile,
    isMobile,
    // toggleSidebar,
  } = useSidebar();

  const navItems = [
    { icon: DashboardIcon, label: "Dashboard", href: "/" },
    { icon: StackIcon, label: "My Assets", href: "/assets" },
    { icon: CashIcon, label: "Create Stablecoin", href: "/create" },
    { icon: CreateFoldericon, label: "Redeem Assets", href: "/redeem" },
    { icon: HelpIcon, label: "Help & Support", href: "/help" },
    { icon: SettingIcon, label: "Settings", href: "/setting" },
  ];

  return (
    <Sidebar collapsible="icon" className="border-none">
      <SidebarHeader className="flex flex-col gap-4">
        {state === "collapsed" && !isMobile ? (
          <>
            <Link href="/" className="block">
              <Image
                src="/stable-fun.svg"
                alt="Logo"
                className="w-6 h-6"
                width={36}
                height={36}
              />
            </Link>
            <svg
              width="32"
              height="1"
              viewBox="0 0 32 1"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                y1="0.5"
                x2="32"
                y2="0.5"
                stroke="url(#paint0_linear_738_1146)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_738_1146"
                  x1="0"
                  y1="1.5"
                  x2="32"
                  y2="1.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" stopOpacity="0" />
                  <stop offset="0.124" stopColor="#00BCD4" />
                  <stop offset="1" stopColor="#CCCCCC" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </>
        ) : (
          <Link href={"/"}>
            <Image
              src={"/stable-fun-logo.svg"}
              alt="Logo"
              width={140}
              height={34}
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
                  pathname.startsWith(project.href)
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
