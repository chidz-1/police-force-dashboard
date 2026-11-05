import { CalendarX } from "lucide-react";

import ErrorState from "@/components/ErrorState";
import { getForceFriendlyLabel } from "@/utils/getForce";

export default function DataUnavailable() {
  return (
    <ErrorState
      title="No data available yet"
      description={`${getForceFriendlyLabel()} Police has no published stop and search data at the moment. New data is released monthly, so please check back later.`}
      icon={<CalendarX className="size-6" />}
    />
  );
}
