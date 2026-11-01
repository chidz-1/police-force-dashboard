import { type LucideIcon } from "lucide-react";

export interface MenuItem {
  title: string;
  items: {
    icon: LucideIcon;
    title: string;
    url: string;
  }[];
}

export type MenuItemProps = Exclude<MenuItem, "icon">;
