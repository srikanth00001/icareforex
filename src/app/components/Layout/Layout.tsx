"use client";

import React, { useState } from "react";
import NavBar from "./NavBar";
import ProfileBar from "./ProfileBar";
import Link from "next/link";

type ClientLayoutProps = {
  children: React.ReactNode;
};

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-background dark:bg-background">
      {/* Sidebar */}
      <NavBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full overflow-x-hidden">
        {/* TopBar */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <ProfileBar
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />
        </div>

        {/* Content + Footer */}
        <div
          className={`flex flex-col pt-16 transition-all duration-300 flex-1 w-full ${
            isSidebarOpen ? "md:ml-64" : "md:ml-16"
          }`}
        >
          <main className="flex-1 w-full overflow-x-hidden md:pr-15 ">
            {children}
          </main>

<footer className="bg-background dark:bg-background py-4 w-full">
  <div className="w-full px-6 flex justify-between text-sm text-gray-600 dark:text-gray-300">
    <span className="text-left">© Copyright 2025</span>
    <span className="text-right px-11">
      Developed By{" "}
      <Link href="https://digiwebspot.com/">
        <span className="text-black dark:text-white hover:underline">
          Digiwebspot
        </span>
      </Link>
    </span>
  </div>
</footer>


        </div>
      </div>
    </div>
  );
};

export default ClientLayout;
