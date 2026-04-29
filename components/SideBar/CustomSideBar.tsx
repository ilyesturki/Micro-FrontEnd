"use client";

import * as React from "react";
import { Bot, SquareTerminal } from "lucide-react";

import { NavMain } from "./nav-main";
import { UserNav } from "./UserNav";
import WebsiteCustomLogo from "./WebsiteCustomLogo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import SignOutButton from "./SignOutButton";

const data = {
  navMain: [
    // {
    //   allowedTo: [
    //     { role: "user", category: ["operational", "midel-management"] },
    //   ],
    //   title: "Auto MTCE",
    //   url: "/auto-mtce",
    //   icon: SquareTerminal,
    // },
    // {
    //   allowedTo: [
    //     { role: "user", category: ["operational", "midel-management"] },
    //   ],
    //   title: "Diag MTCE",
    //   url: "/diag-mtce",
    //   icon: SquareTerminal,
    // },
    {
      title: "Spots",
      url: "/dashboard/parking",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Door Qr",
      url: "/dashboard/parking/door",
      icon: SquareTerminal,
      isActive: true,
    },
    // {
    //   allowedTo: [
    //     { role: "user", category: ["operational", "midel-management"] },
    //   ],
    //   title: "Audit",
    //   url: "/audit",
    //   icon: SquareTerminal,
    // },
    // {
    //   allowedTo: [
    //     { role: "user", category: ["operational", "midel-management"] },
    //   ],
    //   title: "Planing",
    //   url: "/planing",
    //   icon: SquareTerminal,
    // },
    // {
    //   allowedTo: [
    //     { role: "user", category: ["operational", "midel-management"] },
    //   ],
    //   title: "Dashboard",
    //   url: "/dashboard",
    //   icon: SquareTerminal,
    // },

    {
      allowedTo: [{ role: "user", category: ["top-management", "corporaite"] }],
      title: "Fps",
      url: "/dashboard/panel/fps-panel",
      icon: SquareTerminal,
    },
    // {
    //   allowedTo: [{ role: "user", category: ["top-management", "corporaite"] }],
    //   title: "Auto-MTCE",
    //   url: "/dashboard/panel/auto-mtce",
    //   icon: SquareTerminal,
    // },
    {
      allowedTo: [{ role: "user", category: ["top-management", "corporaite"] }],
      title: "Tag",
      url: "/dashboard/panel/tag-panel",
      icon: SquareTerminal,
    },
    // {
    //   allowedTo: [{ role: "user", category: ["top-management", "corporaite"] }],
    //   title: "Dashboard",
    //   url: "/dashboard",
    //   icon: SquareTerminal,
    // },
    // {
    //   allowedTo: [{ role: "user", category: ["top-management", "corporaite"] }],
    //   title: "Planing",
    //   url: "/planing",
    //   icon: SquareTerminal,
    // },
    // {
    //   allowedTo: [{ role: "user", category: ["top-management", "corporaite"] }],
    //   title: "Audit",
    //   url: "/audit",
    //   icon: SquareTerminal,
    // },
    {
      allowedTo: [{ role: "admin" }],
      title: "Users",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Users Panel",
          url: "/dashboard/users",
        },
        {
          title: "Add User",
          url: "/dashboard/users/create-user",
        },
      ],
    },
  ],
};

export function CustomSideBar({
  session,
  ...props
}: { session: any } & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <WebsiteCustomLogo />
        <UserNav
          image={session?.user?.image}
          firstName={session?.user?.firstName}
          lastName={session?.user?.lastName}
          email={session?.user?.email}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.navMain}
        />
      </SidebarContent>
      <SidebarFooter>
        <SignOutButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
