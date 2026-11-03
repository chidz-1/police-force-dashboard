import React from "react";

export type StatCardsContainerProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
  className?: string;
};
