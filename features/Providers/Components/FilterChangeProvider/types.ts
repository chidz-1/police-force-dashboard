import { TransitionStartFunction, ReactNode } from "react";

export type FilterChangeContextType = {
  isPending: boolean;
  startTransition: TransitionStartFunction;
} | null;

export interface FilterChangeProviderProps {
  children: ReactNode;
}
