"use client";

import { usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toggle";

export function ModeToggleWrapper() {
  const pathname = usePathname();

  // Define the auth routes where ModeToggle should appear
  const authRoutes = ["/","/auth/login", "/auth/signup", "/auth/verify-otp", "/auth/reset-password"];

  // Render ModeToggle only if the current pathname is in authRoutes
  if (!authRoutes.includes(pathname)) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 md:block">
      <ModeToggle />
    </div>
  );
}