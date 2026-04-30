"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const SignOutButton = () => {
  const handleSignOut = () => {
    signOut({ redirect: true, callbackUrl: "/auth/login" });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={handleSignOut}
          tooltip="Log out"
          className="
            w-full flex items-center gap-2
            px-4 py-5 rounded-lg
            text-sm font-semibold
            bg-red-500/20 text-red-600
            hover:bg-red-500/20
            hover:text-red-900
            transition-all duration-200
          "
        >
          <LogOut className="w-5 h-5 rotate-180" />
          <span>Log out</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default SignOutButton;
