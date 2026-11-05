"use client";

import ErrorState from "@/components/ErrorState";
import { ErrorPageProps } from "@/components/ErrorState/types";

export default function LocationsError({ retry }: ErrorPageProps) {
  return <ErrorState title="Couldn't load locations" retry={retry} />;
}
