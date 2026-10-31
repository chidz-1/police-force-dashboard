import { Button } from "@/components/ui/button";
import { getForceFriendlyLabel } from "@/utils/get-force";
import getStopData from "@/utils/get-stop-data";
import { checkAvailability } from "@/utils/stop-availability";

export default async function Page() {
  const monthRange = await checkAvailability(3);

  if (!monthRange.length) {
    throw new Error("TODO: mention time range");
  }

  getStopData(monthRange);
  console.log(getForceFriendlyLabel());

  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2">Button</Button>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  );
}
