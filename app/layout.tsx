import type { Metadata } from "next";

import "./globals.css";
import AppProviders from "@/features/Providers/Components/Providers";
import DashboardSideBar from "@/features/ApplicationSidebar/components/Sidebar";
import { fontVariables } from "@/lib/fonts";
import { getForceFriendlyLabel } from "@/utils/getForce";

export const metadata: Metadata = {
  title: {
    default: "StopWatch | Stop and Search Dashboard",
    template: "%s | StopWatch",
  },
  description: `Explore ${getForceFriendlyLabel()} Police stop and search data, with charts and tables covering search types, demographics, legislation, outcomes, locations and time patterns.`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontVariables} antialiased`}>
        <AppProviders>
          <DashboardSideBar>
            <div className="mx-auto w-full max-w-screen-2xl p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          </DashboardSideBar>
        </AppProviders>
      </body>
    </html>
  );
}
