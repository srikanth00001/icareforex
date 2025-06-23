"use client";

import { useLoading } from "./loading-context";

export default function LoadingBar() {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/50 z-50">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}
