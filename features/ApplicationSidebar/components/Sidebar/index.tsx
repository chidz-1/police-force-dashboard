import MainNavigation from "../MainNavigation";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "../ThemeToggle";
import ForceBadge from "../ForceBadge";
import { getForceFriendlyLabel, getForceId } from "@/utils/getForce";

import { SidebarProps } from "./types";

export default function SideBar({ children }: SidebarProps) {
  const forceName = getForceFriendlyLabel();
  const forceId = getForceId();

  return (
    <>
      <MainNavigation />
      <SidebarInset className="min-w-0">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
          />
          <div className="flex w-full items-center">
            <ForceBadge name={forceName} id={forceId} />
            <ThemeToggle className="ml-auto rounded-full" />
          </div>
        </header>
        {children}
      </SidebarInset>
    </>
  );
}
