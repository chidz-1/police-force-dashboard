"use client";

import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { MenuItemProps } from "./types";

export default function MenuItem({ items, title }: MenuItemProps) {
  const currentPath = usePathname();

  return (
    <SidebarGroup key={title}>
      <SidebarGroupLabel className="uppercase">{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(({ title: subItemTitle, url: subItemUrl, icon }) => {
            const Icon = icon;
            return (
              <SidebarMenuItem key={subItemTitle}>
                <SidebarMenuButton
                  className="data-active:bg-primary data-active:text-primary-foreground"
                  isActive={currentPath === subItemUrl}
                  render={<a href={subItemUrl} />}
                >
                  <Icon />
                  {subItemTitle}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
