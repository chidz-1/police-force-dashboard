"use client";

import ErrorState from "@/components/ErrorState";
import { ErrorPageProps } from "@/components/ErrorState/types";

export default function LegislationError({ retry }: ErrorPageProps) {
  return <ErrorState title="Couldn't load legislation" retry={retry} />;
}
