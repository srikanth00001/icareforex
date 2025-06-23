"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/Button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative bg-background text-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
    >
      <Sun className="h-5 w-5 transition-opacity duration-300 opacity-100 dark:opacity-0" />
      <Moon className="absolute h-5 w-5 transition-opacity duration-300 opacity-0 dark:opacity-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}