import React, { Suspense } from "react";

export default function decorateWithSuspense<P extends object>(
  ComponentToDecorate: React.ComponentType<P>
) {
  return function WithSuspense({
    fallback,
    ...baseComponentProps
  }: P & { fallback: React.ReactNode }) {
    return (
      <Suspense fallback={fallback}>
        <ComponentToDecorate {...(baseComponentProps as P)} />
      </Suspense>
    );
  };
}
