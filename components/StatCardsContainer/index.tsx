import { cn } from "cn";
import { StatCardsContainerProps } from "./types";

export default function StatCardsContainer({
  children,
  className,
  ...otherDivProps
}: StatCardsContainerProps) {
  return (
    <div
      {...otherDivProps}
      className={cn(
        "my-3 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4",
        className
      )}
    >
      {children}
    </div>
  );
}
