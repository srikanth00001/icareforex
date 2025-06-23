"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaBars,
  FaTimes,
  FaBell,
  FaChartBar,
  FaEllipsisH,
} from "react-icons/fa";
import { ModeToggle } from "../darkMode/mode-toggle";

interface UserData {
  name: string;
  mobile_number: string; // Still here for data consistency if needed elsewhere, but won't be displayed in this bar
  email_id: string; // Same as above
  role: { name: string }; // Same as above
  last_login: string; // Same as above
}

const styles = {
  container: "w-full border",
  mobileView: "block md:hidden",
  mobileFlex:
    "flex bg-white dark:bg-black text-gray-900 dark:text-gray-100 shadow-lg p-4 items-center justify-between relative dark:border-b dark:border-gray-700",
  toggleButton:
    "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
  icon: "text-xl transition-transform duration-300 ease-in-out",
  logoContainer: "flex items-center",
  logoIcon: "text-blue-500 text-xl mr-2",
  logoText: "text-gray-900 dark:text-white text-lg font-bold",
  moreButton:
    "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded",
  moreIcon: "text-xl",
  dropdown:
    "absolute top-full right-0 bg-white dark:bg-black text-gray-900 dark:text-gray-100 shadow-xl p-4 flex justify-between items-center z-50 w-full border-b dark:border-gray-700",
  dropdownIcons: "flex items-center space-x-4",
  iconWrapper: "border border-gray-300 dark:border-gray-600 rounded-full",
  notificationButton:
    "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white relative p-3 border border-gray-300 dark:border-gray-600 rounded-full",
  notificationIcon: "text-xl",
  notificationBadge: "absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full",
  // Modified userSection to be directly clickable for navigation
  userSection: "flex items-center cursor-pointer relative hover:bg-gray-100 dark:hover:bg-gray-700  rounded-lg transition-colors duration-200",
  userImage: "h-8 w-8 rounded-full mr-2",
  userName: "text-sm text-gray-900 dark:text-gray-100 font-medium",
  // chevron: "ml-1 text-sm text-gray-500 dark:text-gray-400", // No longer needed
  desktopView:
    "hidden md:block bg-white dark:bg-black text-gray-900 dark:text-gray-100 shadow-lg p-4 md:flex items-center justify-between dark:border-b dark:border-gray-700",
  desktopLeft: "flex items-center",
  desktopToggle:
    "mr-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
  desktopRight: "flex items-center space-x-4",
  // Removed profileDropdown related styles as the dropdown is removed
};

const ProfileBar = ({
  toggleSidebar,
  isSidebarOpen,
}: {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Still used for mobile's "more" button
  const [userData, setUserData] = useState<UserData>({
    name: "Guest",
    mobile_number: "",
    email_id: "N/A",
    role: { name: "" },
    last_login: "N/A",
  });
  const router = useRouter();

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData({
          name: parsedUserData.name || "Guest",
          mobile_number: parsedUserData.mobile_number || "+9715574444",
          email_id: parsedUserData.email_id || "srikanth@digiwebspot.com",
          role: parsedUserData.role || { name: "admin" },
          last_login: parsedUserData.last_login || "N/A",
        });
      } catch (err: Error | unknown) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        console.error("Error parsing user data:", error);
        setUserData({
          name: "Guest",
          mobile_number: "",
          email_id: "N/A",
          role: { name: "" },
          last_login: "N/A",
        });
      }
    } else {
      // Default for demonstration as per image_6ddcfa.png
      setUserData({
        name: "Srikanth M",
        mobile_number: "+9715574444",
        email_id: "srikanth@digiwebspot.com",
        role: { name: "" }, // Role isn't directly shown in the image here
        last_login: "N/A",
      });
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // This function now directly navigates, no dropdown logic
  const handleUserIconClick = () => {
    router.push("/profile");
  };

  // handleLogout is removed from here as there's no dropdown.
  // Logout functionality would typically be on the actual profile page,
  // or a dedicated logout button elsewhere.

  return (
    <div className={styles.container}>
      {/* Mobile View */}
      <div className={styles.mobileView}>
        <div className={styles.mobileFlex}>
          <button
            onClick={toggleSidebar}
            className={styles.toggleButton}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? (
              <FaTimes className={styles.icon} />
            ) : (
              <FaBars className={styles.icon} />
            )}
          </button>

          <div className={styles.logoContainer}>
            <span className={styles.logoIcon}>
              <FaChartBar />
            </span>
            <span className={styles.logoText}>TailAdmin</span>
          </div>

          <button
            onClick={toggleDropdown}
            className={styles.moreButton}
            aria-label="More options"
            aria-expanded={isDropdownOpen}
            aria-controls="mobile-dropdown"
          >
            <FaEllipsisH className={styles.moreIcon} />
          </button>

          {isDropdownOpen && (
            <div id="mobile-dropdown" className={styles.dropdown}>
              <div className={styles.dropdownIcons}>
                <div className={styles.iconWrapper}>
                  <ModeToggle />
                </div>
                <button
                  className={styles.notificationButton}
                  aria-label="View notifications"
                >
                  <FaBell className={styles.notificationIcon} />
                  <span className={styles.notificationBadge}></span>
                </button>
              </div>

              {/* User Section - now directly navigates on click */}
              <div
                className={styles.userSection}
                onClick={handleUserIconClick} // Direct navigation
                aria-label="Go to profile page"
              >
                <div
                  className={`${styles.userImage} bg-blue-500 flex items-center justify-center text-white font-medium`}
                >
                  {userData.name.charAt(0).toUpperCase()}
                </div>
                <span className={styles.userName}>{userData.name}</span>
                {/* <FaChevronDown className={styles.chevron} /> -- Removed chevron */}
              </div>
            </div>
          )}
          {/* No profile dropdown when isProfileDropdownOpen is true, it's removed */}
        </div>
      </div>

      {/* Desktop View */}
      <div className={styles.desktopView}>
        <div className={styles.desktopLeft}>
          <button
            onClick={toggleSidebar}
            className={styles.desktopToggle}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? (
              <FaTimes className={styles.icon} />
            ) : (
              <FaBars className={styles.icon} />
            )}
          </button>
          <div className="relative flex items-center"></div>
        </div>

        <div className={styles.desktopRight}>
          <div className={styles.iconWrapper}>
            <ModeToggle />
          </div>
          {/* User Section - now directly navigates on click */}
          <div
            className={styles.userSection}
            onClick={handleUserIconClick} // Direct navigation
            aria-label="Go to profile page"
          >
            <div
              className={`${styles.userImage} bg-blue-500 flex items-center justify-center text-white font-medium`}
            >
              {userData.name.charAt(0).toUpperCase()}
            </div>
            <span className={styles.userName}>{userData.name}</span>
            {/* <FaChevronDown className={styles.chevron} /> -- Removed chevron */}
          </div>
        </div>

        {/* No profile dropdown when isProfileDropdownOpen is true, it's removed */}
      </div>
    </div>
  );
};

export default ProfileBar;