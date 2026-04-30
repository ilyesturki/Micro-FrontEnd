"use client";

import * as React from "react";
import { Bot, SquareTerminal,SquareParking,QrCode } from "lucide-react";

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
  
    {
      title: "Spots",
      url: "/dashboard/parking",
      icon: SquareParking,
      isActive: true,
    },
    {
      title: "Door Qr",
      url: "/dashboard/parking/door",
      icon: QrCode,
      isActive: true,
    },

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
    <Sidebar
      collapsible="icon"
      className="border-r bg-white/80 backdrop-blur-md"
      {...props}
    >
      {/* HEADER */}
      <SidebarHeader className="pt-4 pb-2 border-b">
        <WebsiteCustomLogo />

        <div className="mt-3">
          <UserNav
            image={session?.user?.image}
            firstName={session?.user?.firstName}
            lastName={session?.user?.lastName}
            email={session?.user?.email}
          />
        </div>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="py-4 space-y-2">
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="py-4 border-t">
        <SignOutButton />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
