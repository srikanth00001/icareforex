"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaChevronDown,
  FaChevronRight,
  FaChartBar,
  FaCogs,
  FaStore,
  FaUsers,
  FaNewspaper,
  FaSignOutAlt,
  FaUserShield,
  FaBars,
  FaKey,
  FaUserFriends,
  FaSitemap,
  FaListAlt,
  FaClipboardList,
  FaDollarSign,
  FaBell,
} from "react-icons/fa";

const styles = {
  sidebar:
    "bg-white dark:bg-black text-sidebar-foreground shadow-md h-screen transition-all duration-300 z-50 fixed top-0 border-r border-r-[1px]  dark:border-white",
  sidebarWidthOpen: "w-64",
  sidebarWidthClosed: "w-16",
  sidebarVisibility: "hidden md:block",
  sidebarBlock: "block",
  header: "flex items-center p-4 hidden md:block",
  headerIcon: "text-sidebar-primary text-xl mr-2",
  headerText: "text-sidebar-foreground text-lg font-bold",
  contentWrapper: "md:pt-0 pt-16 h-full overflow-y-auto",
  sectionTitle: "px-4 py-2 text-sidebar-muted-foreground text-xs uppercase",
  navContainer: "flex flex-col space-y-4",
  dropdownButton:
    "flex items-center p-4 text-sidebar-foreground hover:bg-sidebar-accent w-full text-left",
  dropdownButtonActive: "bg-sidebar-accent",
  dropdownIcon: "text-lg mr-3",
  dropdownText: "flex-1 text-left text-sm",
  dropdownChevron: "text-sm",
  dropdownContent: "ml-4",
  childButton:
    "group flex items-center gap-3 w-full px-4 py-3 text-sm text-sidebar-foreground hover:text-white hover:bg-sidebar-primary rounded-lg transition-all duration-200",
  childIndicator:
    "w-1 h-1 bg-sidebar-primary rounded-full group-hover:scale-150 transition-transform",
  childText: "whitespace-nowrap",
  navButton:
    "flex items-center p-4 text-sidebar-foreground hover:bg-sidebar-accent w-full text-left",
  navIcon: "text-lg mr-3",
  navText: "text-sm",
};

const NavBar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const router = useRouter();
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const [isHovered, setIsHovered] = useState(false);

  const toggleDropdown = (name: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaChartBar /> },
    { name: "User", path: "/user", icon: <FaUser /> },

    {
      name: "Manage Roles & Permissions",
      icon: <FaUserShield />,
      children: [
        { name: "Roles", path: "/roles", icon: <FaUser /> },
          { name: "Menus", path: "/menus", icon: <FaBars /> },
          { name: "Permission", path: "/permission", icon: <FaKey /> },
      ],
    },
    { name: "News", path: "/news", icon: <FaNewspaper /> },
    { name: "Logout", path: "/auth/login", icon: <FaSignOutAlt /> },
  ];

  return (
    <div
      className={`${styles.sidebar} ${
        isOpen || isHovered
          ? styles.sidebarWidthOpen
          : styles.sidebarWidthClosed
      } ${isOpen ? styles.sidebarBlock : styles.sidebarVisibility}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header: Visible on desktop, hidden on mobile */}
      <div className={styles.header}>
        <span className={styles.headerIcon}>
          <FaChartBar />
        </span>
        {(isOpen || isHovered) && (
          <span className={styles.headerText}>Thendral</span>
        )}
      </div>

      {/* Content Wrapper: Offset on mobile to account for TopBar */}
      <div className={styles.contentWrapper}>
        {(isOpen || isHovered) && <div className={styles.sectionTitle}></div>}

        <div className={styles.navContainer}>
          {navItems.map((item, idx) => (
            <div key={idx}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`${styles.dropdownButton} ${
                      openDropdowns[item.name]
                        ? styles.dropdownButtonActive
                        : ""
                    }`}
                  >
                    <span className={styles.dropdownIcon}>{item.icon}</span>
                    {(isOpen || isHovered) && (
                      <span className={styles.dropdownText}>{item.name}</span>
                    )}
                    {(isOpen || isHovered) && (
                      <span className={styles.dropdownChevron}>
                        {openDropdowns[item.name] ? (
                          <FaChevronDown />
                        ) : (
                          <FaChevronRight />
                        )}
                      </span>
                    )}
                  </button>
                  {openDropdowns[item.name] && (isOpen || isHovered) && (
                    <div className={styles.dropdownContent}>
                      {item.children.map((child, cidx) => (
                        <button
                          key={cidx}
                          onClick={() => {
                            router.push(child.path);
                            toggleSidebar();
                          }}
                          className={styles.childButton}
                        >
                          <div className={styles.childIndicator}></div>
                          <span className={styles.childText}>{child.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {
                    router.push(item.path);
                    toggleSidebar();
                  }}
                  className={styles.navButton}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  {(isOpen || isHovered) && (
                    <span className={styles.navText}>{item.name}</span>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
