"use client";

import { cn } from "cn";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Toggle } from "@/components/ui/toggle";
import { ThemeToggleProps } from "./types";

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Toggle
      className={cn(className)}
      aria-label="Toggle theme"
      onPressedChange={() =>
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
      }
    >
      <MoonIcon className="dark:hidden" />
      <SunIcon className="hidden dark:block" />
    </Toggle>
  );
}
