import Link from "next/link";
import { FileQuestion, Home } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { CARD_ICON_CHIP_CLASSNAME, STATUS_PAGE_CLASSNAME } from "@/constants";
import { cn } from "cn";

export default function NotFound() {
  return (
    <div className={STATUS_PAGE_CLASSNAME}>
      <span className={cn(CARD_ICON_CHIP_CLASSNAME, "size-12")}>
        <FileQuestion className="size-6" />
      </span>
      <div>
        <h1>Page not found</h1>
        <p className="mb-0 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
      </div>
      <Link href="/" className={buttonVariants({ size: "lg" })}>
        <Home data-icon="inline-start" />
        Back to home
      </Link>
    </div>
  );
}
