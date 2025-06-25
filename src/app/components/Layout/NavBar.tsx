"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaChevronDown,
  FaChevronRight,
  FaChartBar,
  FaCogs,
  FaNewspaper,
  FaSignOutAlt,
  FaUserShield,
  FaBars,
  FaKey,
  FaCog,
  FaClipboardList,
} from "react-icons/fa";

// Icon mapping based on menu names
const iconMap = {
  dashboard: <FaChartBar />,
  user: <FaUser />,
  roles: <FaUserShield />,
  menus: <FaBars />,
  permission: <FaKey />,
  news: <FaNewspaper />,
  settings: <FaCog />,
  reports: <FaClipboardList />,
  manage_roles_permissions: <FaUserShield />,
  logout: <FaSignOutAlt />,
};

// Styles (same as provided)
const styles = {
  sidebar:
    "bg-white dark:bg-black text-sidebar-foreground shadow-md h-screen transition-all duration-300 z-50 fixed top-0 border-r border-r-[1px] dark:border-white",
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

// Mock menu data
const menuData = [
  {
    id: "6854ffe8b1d7f8a34770a120",
    name: "dashboard",
    icon: "Uploads/menu-icons/dfbab178-ecf8-454d-98a6-061ea5632ea1.png",
    path: "dashboard",
    parent_id: null,
    active: true,
    created_at: "2025-06-20T11:55:43.457000",
    created_by: null,
    updated_at: null,
    updated_by: null,
  },
  {
    id: "6854ffe8b1d7f8a34770a121",
    name: "user",
    icon: "Uploads/menu-icons/user.png",
    path: "user",
    parent_id: null,
    active: true,
    created_at: "2025-06-20T11:55:43.457000",
    created_by: null,
    updated_at: null,
    updated_by: null,
  },
  {
    id: "6854ffe8b1d7f8a34770a122",
    name: "manage_roles_permissions",
    icon: "Uploads/menu-icons/manage_roles.png",
    path: null,
    parent_id: null,
    active: true,
    created_at: "2025-06-20T11:55:43.457000",
    created_by: null,
    updated_at: null,
    updated_by: null,
  },
  {
    id: "6854ffe8b1d7f8a34770a123",
    name: "roles",
    icon: "Uploads/menu-icons/roles.png",
    path: "roles",
    parent_id: "6854ffe8b1d7f8a34770a122",
    active: true,
    created_at: "2025-06-20T11:55:43.457000",
    created_by: null,
    updated_at: null,
    updated_by: null,
  },
  {
    id: "6854ffe8b1d7f8a34770a124",
    name: "menus",
    icon: "Uploads/menu-icons/menus.png",
    path: "menus",
    parent_id: "6854ffe8b1d7f8a34770a122",
    active: true,
    created_at: "2025-06-20T11:55:43.457000",
    created_by: null,
    updated_at: null,
    updated_by: null,
  },
  {
    id: "6854ffe8b1d7f8a34770a125",
    name: "permission",
    icon: "Uploads/menu-icons/permission.png",
    path: "permission",
    parent_id: "6854ffe8b1d7f8a34770a122",
    active: true,
    created_at: "2025-06-20T11:55:43.457000",
    created_by: null,
    updated_at: null,
    updated_by: null,
  },
  {
    id: "6854ffe8b1d7f8a34770a126",
    name: "news",
    icon: "Uploads/menu-icons/news.png",
    path: "news",
    parent_id: null,
    active: true,
    created_at: "2025-06-20T11:55:43.457000",
    created_by: null,
    updated_at: null,
    updated_by: null,
  },
  {
    id: "6854ffe8b1d7f8a34770a127",
    name: "settings",
    icon: "Uploads/menu-icons/settings.png",
    path: "settings",
    parent_id: null,
    active: true,
    created_at: "2025-06-20T11:55:43.457000",
    created_by: null,
    updated_at: null,
    updated_by: null,
  },
  {
    id: "6854ffe8b1d7f8a34770a128",
    name: "reports",
    icon: "Uploads/menu-icons/reports.png",
    path: "reports",
    parent_id: null,
    active: true,
    created_at: "2025-06-20T11:55:43.457000",
    created_by: null,
    updated_at: null,
    updated_by: null,
  },
  {
    id: "6854ffe8b1d7f8a34770a129",
    name: "logout",
    icon: "Uploads/menu-icons/logout.png",
    path: "auth/login",
    parent_id: null,
    active: true,
    created_at: "2025-06-20T11:55:43.457000",
    created_by: null,
    updated_at: null,
    updated_by: null,
  },
];

// Mock permission data
const permissionData = [
  {
    id: "6855017ab1d7f8a34770a12f",
    role_id: "6854ff25b1d7f8a34770a112",
    menu_data: {
      "6854ffe8b1d7f8a34770a120": ["add", "edit", "view", "delete"], // Dashboard
      "6854ffe8b1d7f8a34770a121": ["view"], // User
      "6854ffe8b1d7f8a34770a122": ["view"], // Manage Roles & Permissions
      "6854ffe8b1d7f8a34770a123": ["view"], // Roles
      "6854ffe8b1d7f8a34770a124": ["view"], // Menus
      "6854ffe8b1d7f8a34770a125": ["view"], // Permission
      "6854ffe8b1d7f8a34770a126": ["view"], // News
      "6854ffe8b1d7f8a34770a127": ["view"], // Settings
      "6854ffe8b1d7f8a34770a128": [], // Reports (no view permission)
      "6854ffe8b1d7f8a34770a129": ["view"], // Logout
    },
    active: true,
    created_at: "2025-06-20T11:55:43.486320",
    created_by: null,
    updated_at: null,
    updated_by: null,
  },
];

// Function to capitalize first letter of each word
const capitalizeWords = (str) =>
  str
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

const NavBar = ({
  isOpen,
  toggleSidebar,
  roleId = "6854ff25b1d7f8a34770a112", // Mock roleId, replace with actual user role
}) => {
  const router = useRouter();
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [navItems, setNavItems] = useState([]);

  const toggleDropdown = (name) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  // Process menu and permission data
  useEffect(() => {
    // Fetch permissions for the user's role
    const userPermissions = permissionData.find(
      (perm) => perm.role_id === roleId && perm.active
    );

    if (!userPermissions) {
      setNavItems([]);
      return;
    }

    // Build menu tree
    const menuMap = new Map();
    menuData.forEach((menu) => {
      if (menu.active) {
        menuMap.set(menu.id, { ...menu, children: [] });
      }
    });

    const rootMenus = [];
    menuMap.forEach((menu) => {
      if (menu.parent_id && menuMap.has(menu.parent_id)) {
        menuMap.get(menu.parent_id).children.push(menu);
      } else if (!menu.parent_id) {
        rootMenus.push(menu);
      }
    });

    // Filter menus based on permissions and map to nav items
    const allowedNavItems = rootMenus
      .filter((menu) => {
        // Check if user has 'view' permission for this menu
        return userPermissions.menu_data[menu.id]?.includes("view");
      })
      .map((menu) => {
        const navItem = {
          name: capitalizeWords(menu.name), // Format name (e.g., "Manage Roles Permissions")
          path: menu.path ? `/${menu.path}` : null,
          icon: iconMap[menu.name.toLowerCase()] || <FaCogs />, // Fallback icon
        };

        // Process children if any
        if (menu.children.length > 0) {
          navItem.children = menu.children
            .filter((child) =>
              userPermissions.menu_data[child.id]?.includes("view")
            )
            .map((child) => ({
              name: capitalizeWords(child.name),
              path: `/${child.path}`,
              icon: iconMap[child.name.toLowerCase()] || <FaCogs />,
            }));
        }

        return navItem;
      });

    setNavItems(allowedNavItems);
  }, [roleId]);

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
                item.path && (
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
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;