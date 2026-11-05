"use client";

import ErrorState from "@/components/ErrorState";
import { ErrorPageProps } from "@/components/ErrorState/types";

export default function TimePatternsError({ retry }: ErrorPageProps) {
  return <ErrorState title="Couldn't load time patterns" retry={retry} />;
}
