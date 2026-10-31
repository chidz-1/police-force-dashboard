import {
  LayoutDashboardIcon,
  ScanSearch,
  Users,
  Gavel,
  FilePen,
  MapPin,
  Clock,
} from "lucide-react";

import { MenuItem } from "../components/menu-item/types";

export const MENU_ITEM_CONFIG: { navMain: MenuItem[] } = {
  navMain: [
    {
      title: "General",
      items: [
        {
          icon: LayoutDashboardIcon,
          title: "Overview",
          url: "/",
        },
      ],
    },
    {
      title: "Categories",
      items: [
        {
          icon: ScanSearch,
          title: "Search Types",
          url: "/search-types",
        },
        {
          icon: Users,
          title: "Demographics",
          url: "/demographics",
        },
        {
          icon: Gavel,
          title: "Legislation",
          url: "/legislation",
        },
        {
          icon: FilePen,
          title: "Outcomes",
          url: "/outcomes",
        },
        {
          icon: MapPin,
          title: "Locations",
          url: "/locations",
        },
        {
          icon: Clock,
          title: "Time Patterns",
          url: "/time-patterns",
        },
      ],
    },
  ],
};
