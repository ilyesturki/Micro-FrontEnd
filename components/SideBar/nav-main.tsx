"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "@/i18n/navigation";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
  role,
  category,
}: {
  items: {
    allowedTo?: { role: string; category?: string[] }[];
    title: string;
    url: string;
    icon?: LucideIcon;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  role?: string;
  category?: string;
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="px-3 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
        Dashboard
      </SidebarGroupLabel>

      <SidebarMenu className="space-y-1">
        {items
          .filter(
            (e) =>
              !e.allowedTo ||
              e.allowedTo.some((a) =>
                a.category
                  ? a.role === role && a.category.includes(category || "")
                  : a.role === role
              )
          )
          .map((item) => {
            const isActive =
              pathname === item.url ||
              item.items?.some((sub) => sub.url === pathname);

            return (
              <div key={item.title}>
                {/* MAIN ITEM */}
                <SidebarMenuItem>
                  <Link
                    href={item.url}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-green-900 text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100 hover:text-green-900"
                      }
                    `}
                  >
                    {item.icon && (
                      <item.icon
                        className={`size-[18px] ${
                          isActive ? "text-white" : "text-gray-400"
                        }`}
                      />
                    )}
                    <span className="truncate">{item.title}</span>
                  </Link>
                </SidebarMenuItem>

                {/* SUB ITEMS (always visible, clean indent) */}
                {item.items && (
                  <div className="ml-6 mt-1 space-y-1 border-l border-gray-200 pl-3">
                    {item.items.map((sub) => {
                      const isSubActive = pathname === sub.url;

                      return (
                        <Link
                          key={sub.title}
                          href={sub.url}
                          className={`
                            block px-3 py-1.5 rounded-lg text-sm transition
                            ${
                              isSubActive
                                ? "bg-gray-800 text-white"
                                : "text-gray-500 hover:text-green-900 hover:bg-gray-100"
                            }
                          `}
                        >
                          {sub.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
