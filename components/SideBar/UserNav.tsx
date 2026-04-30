"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function UserNav({
  image,
  firstName,
  lastName,
  email,
}: {
  image?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}) {
  const { open } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          tooltip={`${firstName} ${lastName}`}
          className={`
            flex items-center gap-3
            rounded-lg px-2 py-2
            hover:bg-gray-100
            data-[state=open]:bg-gray-100
            transition-all duration-200
          `}
        >
          <Avatar
            className={`${
              open ? "h-9 w-9 rounded-full" : "h-8 w-8 rounded-lg"
            } transition-all duration-300`}
          >
            <AvatarImage src={image} alt={firstName} />
            <AvatarFallback className="bg-gray-200 text-gray-600 rounded-full">
              {firstName?.[0]}
              {lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left text-sm leading-tight">
            <span className="truncate font-semibold text-gray-900">
              {firstName} {lastName}
            </span>
            <span className="truncate text-xs font-medium text-gray-900 text-opacity-60">
              {email}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
