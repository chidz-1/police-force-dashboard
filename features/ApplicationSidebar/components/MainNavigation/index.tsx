"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import DashboardMenuItem from "../MenuItem";
import { MENU_ITEM_CONFIG } from "../../constants";
import DashboardHeader from "../DashboardHeader";
import { getForceFriendlyLabel } from "@/utils/getForce";

export default function MainNavigation({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <DashboardHeader forceName={getForceFriendlyLabel()} />
      </SidebarHeader>
      <SidebarContent>
        {MENU_ITEM_CONFIG.navMain.map(({ items, title }, i) => (
          <DashboardMenuItem
            key={`db-menu-item-${i + 1}`}
            items={items}
            title={title}
          />
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
