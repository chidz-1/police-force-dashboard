"use client";

import { useEffect } from "react";

import "./globals.css";
import ErrorState from "@/components/ErrorState";
import { ErrorPageProps } from "@/components/ErrorState/types";
import { fontVariables } from "@/lib/fonts";
import applyStoredTheme from "@/utils/applyStoredTheme";

export default function GlobalError({ retry }: ErrorPageProps) {
  useEffect(applyStoredTheme, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontVariables} antialiased`}>
        <title>Something went wrong | StopWatch</title>
        <main className="px-4">
          <ErrorState
            title="Something went wrong"
            description="The application hit an unexpected problem. Please try refreshing the page."
            retry={retry}
            className="min-h-svh"
          />
        </main>
      </body>
    </html>
  );
}
