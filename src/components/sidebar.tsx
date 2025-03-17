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
    isMobile,
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
    <>
      <Sidebar collapsible="icon" className="border-none z-30">
        <SidebarHeader className="flex flex-col gap-4">
          {state === "collapsed" && !isMobile ? (
            <div className="h-full flex flex-row justify-end pt-5 w-full">
              <Link href="/" className="block">
                <Image
                  src="/stable-fun.svg"
                  alt="Logo"
                  className="w-6 h-6"
                  width={36}
                  height={36}
                />
              </Link>
              <Image src="line.svg" alt="Line" width={100} height={10} />
            </div>
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
