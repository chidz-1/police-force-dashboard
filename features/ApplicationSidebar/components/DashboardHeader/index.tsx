import Link from "next/link";
import { Shield } from "lucide-react";

import { DashboardHeaderProps } from "./types";

export default function DashboardHeader({ forceName }: DashboardHeaderProps) {
  return (
    <Link href="/" className="flex items-center">
      <span className="mr-3 block rounded-full bg-primary p-3 text-primary-foreground">
        <Shield className="size-4" />
      </span>
      <span className="flex flex-col">
        <span>StopWatch</span>
        <span className="text-xs text-sidebar-accent-foreground">
          {forceName}
        </span>
      </span>
    </Link>
  );
}
