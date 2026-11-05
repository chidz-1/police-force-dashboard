"use client";

import ErrorState from "@/components/ErrorState";
import { ErrorPageProps } from "@/components/ErrorState/types";

export default function OutcomesError({ retry }: ErrorPageProps) {
  return <ErrorState title="Couldn't load outcomes" retry={retry} />;
}
