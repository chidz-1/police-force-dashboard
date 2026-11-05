"use client";

import ErrorState from "@/components/ErrorState";
import { ErrorPageProps } from "@/components/ErrorState/types";

export default function SearchTypesError({ retry }: ErrorPageProps) {
  return <ErrorState title="Couldn't load search types" retry={retry} />;
}
