import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "../ThemeProvider";
import { FilterChangeProvider } from "../FilterChangeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <ThemeProvider>
          <FilterChangeProvider>{children}</FilterChangeProvider>
        </ThemeProvider>
      </SidebarProvider>
    </TooltipProvider>
  );
}
