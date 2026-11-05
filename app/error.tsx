"use client";

import ErrorState from "@/components/ErrorState";
import { ErrorPageProps } from "@/components/ErrorState/types";

export default function RootError({ retry }: ErrorPageProps) {
  return <ErrorState title="Something went wrong" retry={retry} />;
}
