"use client";

import ErrorState from "@/components/ErrorState";
import { ErrorPageProps } from "@/components/ErrorState/types";

export default function DemographicsError({ retry }: ErrorPageProps) {
  return <ErrorState title="Couldn't load demographics" retry={retry} />;
}
