"use client";

import { cn } from "cn";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Toggle } from "@/components/ui/toggle";
import { ThemeToggleProps } from "./types";

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Toggle
      className={cn(className)}
      aria-label="Toggle theme"
      onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <MoonIcon className="dark:hidden" />
      <SunIcon className="hidden dark:block" />
    </Toggle>
  );
}
