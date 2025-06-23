"use client";

import ClientLayout from "@/app/components/layout/Layout";
import DataTable from "@/app/components/table/table";
// import { API_ENDPOINTS } from "@/constants/api"; // Commented out: API_ENDPOINTS
import React, { useState, useEffect, useCallback } from "react";
import { useLoading } from "@/app/components/loader/loading-context";
import FormTemplate from "@/app/components/forms/form";
import { toast } from "react-toastify";

// Function to format date as DD-MM-YY HH:MM:SS AM/PM
const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${ampm}`;
};

interface TableRow {
  id: string;
  Title: string;
  Order: string;
  Icon: string;
  Path: string;
  Params: string;
  "Created At": string;
  "Updated At": string;
  active: boolean;
}

const getToken = () => localStorage.getItem("access_token");

// Sample Data instead of API call
const sampleMenuData = {
  status: true,
  message: "Menus fetched successfully",
  data: {
    items: [
      {
        id: "6854ffe8b1d7f8a34770a120",
        name: "dashboard",
        icon: "uploads/menu-icons/dfbab178-ecf8-454d-98a6-061ea5632ea1.png",
        path: "dashboard",
        path_params: null,
        parent_id: null,
        active: true,
        created_at: "2025-06-20T11:55:43.457000",
        created_by: null,
        updated_at: "2025-06-21T10:30:00.000000",
        updated_by: null,
        order_by: 1, // Added for completeness based on form fields
        params: { key: "value" }, // Added for completeness based on form fields
      },
      {
        id: "a1b2c3d4e5f6g7h8i9j0k1l2",
        name: "settings",
        icon: "uploads/menu-icons/settings-icon.png",
        path: "settings",
        path_params: { tab: "general" },
        parent_id: null,
        active: true,
        created_at: "2025-06-19T09:00:00.000000",
        created_by: null,
        updated_at: "2025-06-20T14:15:00.000000",
        updated_by: null,
        order_by: 2,
        params: { tab: "general" },
      },
      {
        id: "m3n4o5p6q7r8s9t0u1v2w3x4",
        name: "users",
        icon: "uploads/menu-icons/users-icon.png",
        path: "users",
        path_params: null,
        parent_id: null,
        active: false,
        created_at: "2025-06-18T08:30:00.000000",
        created_by: null,
        updated_at: null,
        updated_by: null,
        order_by: 3,
        params: {},
      },
    ],
  },
};

const MenuPage: React.FC = () => {
  const headers: string[] = [
    "Title",
    "Order",
    "Icon",
    "Path",
    "Params",
    "Created At",
    "Updated At",
    "Actions",
  ];
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { setIsLoading } = useLoading();
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const menuFormFields = [
    {
      name: "title",
      label: "Menu Title",
      type: "text" as const,
      required: true,
      placeholder: "Enter menu title",
    },
    {
      name: "order_by",
      label: "Order",
      type: "number" as const, // Changed type to number for order_by
      required: true,
      placeholder: "Enter order number",
    },
    {
      name: "icon",
      label: "Icon",
      type: "text" as const,
      required: false,
      placeholder: "Enter icon name",
    },
    {
      name: "path",
      label: "Path",
      type: "text" as const,
      required: false,
      placeholder: "Enter path (e.g., /dashboard)",
    },
    {
      name: "params",
      label: "Params (JSON)",
      type: "textarea" as const,
      required: false,
      placeholder: 'Enter params as JSON (e.g., {"id": 1})',
    },
  ];

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Commented out actual API call and using sample data instead
      // const token = getToken();
      // if (!token) throw new Error("Access token not found");

      // const response = await fetch(API_ENDPOINTS.MENU_LIST, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "application/json",
      //   },
      // });

      // if (!response.ok) {
      //   const errorData = await response.text();
      //   throw new Error(`Failed to fetch menus: ${errorData}`);
      // }

      // const json = await response.json();
      const json = sampleMenuData; // Using sample data

      console.log("MENU_LIST Response:", JSON.stringify(json, null, 2));

      if (!json.data?.items || !Array.isArray(json.data.items)) {
        throw new Error(
          "Invalid response structure: items array missing or not an array"
        );
      }

      if (json.data.items.length === 0) {
        console.warn("No menu items found in response");
        setTableData([]);
        setIsLoading(false);
        return;
      }

      const formattedData: TableRow[] = json.data.items
        .map((item: any, index: number) => {
          const id = item.id || item._id || item.menuId;
          if (!id || !item.name) {
            console.warn(`Skipping invalid menu at index ${index}:`, item);
            return null;
          }
          return {
            id,
            Title: item.name,
            Order: String(item.order_by ?? 0),
            Icon: item.icon ?? "",
            Path: item.path ?? "",
            Params: item.params ? JSON.stringify(item.params) : "{}",
            "Created At": item.created_at
              ? formatDateTime(item.created_at)
              : "",
            "Updated At": item.updated_at
              ? formatDateTime(item.updated_at)
              : "",
            active: item.active ?? false,
          };
        })
        .filter((item: TableRow | null): item is TableRow => item !== null);

      if (formattedData.length === 0 && json.data.items.length > 0) {
        setError("No valid menu items found in response");
      } else if (formattedData.length < json.data.items.length) {
        setError("Some menu items were invalid and skipped");
      }

      console.log("Formatted Table Data:", formattedData);
      setTableData(formattedData);
    } catch (err: Error | unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      toast.error(error.message || "Failed to fetch menus");
      console.error("Fetch menus error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEdit = async (row: TableRow, index: number) => {
    console.log("handleEdit called with row:", row, "index:", index);
    const token = getToken();
    if (!token) {
      toast.error("Access token missing");
      return;
    }
    if (!row.id || !row.Title) {
      toast.error("Cannot update menu: Missing menu ID or title");
      return;
    }

    let parsedParams = {};
    try {
      parsedParams = row.Params ? JSON.parse(row.Params) : {};
    } catch (err: Error | unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      console.log("Error:Invalid JSON format:", error);
      toast.error("Invalid JSON format for params");
      return;
    }

    // Simulate API call for editing
    setIsLoading(true);
    try {
      // Commented out actual API call
      // const response = await fetch(`${API_ENDPOINTS.MENU_LIST}/${row.id}`, {
      //   method: "PUT",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     name: row.Title,
      //     order_by: parseInt(row.Order),
      //     icon: row.Icon,
      //     path: row.Path,
      //     params: parsedParams,
      //     active: row.active,
      //   }),
      // });

      // if (!response.ok) {
      //   const errorData = await response.text();
      //   throw new Error(`Failed to update menu: ${errorData}`);
      // }

      // const result = await response.json();
      // Simulate result from API for update
      const result = {
        data: {
          ...row,
          name: row.Title,
          order_by: parseInt(row.Order),
          icon: row.Icon,
          path: row.Path,
          params: parsedParams,
          active: row.active,
          updated_at: new Date().toISOString(), // Simulate update time
        },
      };

      const updatedData = [...tableData];
      updatedData[index] = {
        ...row,
        Title: result.data.name,
        Order: String(result.data.order_by ?? row.Order),
        Icon: result.data.icon ?? row.Icon,
        Path: result.data.path ?? row.Path,
        Params: result.data.params
          ? JSON.stringify(result.data.params)
          : row.Params,
        "Created At": result.data.created_at
          ? formatDateTime(result.data.created_at)
          : row["Created At"],
        "Updated At": result.data.updated_at
          ? formatDateTime(result.data.updated_at)
          : row["Updated At"],
        active: result.data.active ?? row.active,
      };
      setTableData(updatedData);
      toast.success("Menu updated successfully");
    } catch (err: Error | unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      toast.error(error.message || "Failed to update menu");
      console.error("Update menu error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (
    row: TableRow,
    index: number,
    active: boolean
  ) => {
    console.log(
      `handleToggleActive called with menu ID: ${row.id}, title: ${row.Title}, active: ${active}, index: ${index}`
    );
    const token = getToken();
    if (!token) {
      toast.error("Access token missing");
      return;
    }
    if (!row.id) {
      toast.error("Cannot update menu: Missing menu ID");
      return;
    }

    let parsedParams = {};
    try {
      parsedParams = row.Params ? JSON.parse(row.Params) : {};
    } catch (err: Error | unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      console.log("Error: Invalid JSON format:", error);
      toast.error("Invalid JSON format for params");
      return;
    }

    // Simulate API call for toggling active status
    setIsLoading(true);
    try {
      // Commented out actual API call
      // console.log(
      //   "Sending PUT request to:",
      //   `${API_ENDPOINTS.MENU_LIST}/${row.id}`
      // );
      // const response = await fetch(`${API_ENDPOINTS.MENU_LIST}/${row.id}`, {
      //   method: "PUT",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     name: row.Title,
      //     order_by: parseInt(row.Order),
      //     icon: row.Icon,
      //     path: row.Path,
      //     params: parsedParams,
      //     active,
      //   }),
      // });

      // if (!response.ok) {
      //   const errorData = await response.text();
      //   throw new Error(`Failed to toggle menu: ${errorData}`);
      // }

      // const result = await response.json();
      // Simulate result from API for toggle
      const result = {
        data: {
          ...row,
          active: active,
          updated_at: new Date().toISOString(), // Simulate update time
          params: parsedParams,
        },
      };

      console.log("API response:", result);
      const updatedData = [...tableData];
      updatedData[index] = {
        ...row,
        active: result.data.active ?? active,
        "Updated At": result.data.updated_at
          ? formatDateTime(result.data.updated_at)
          : row["Updated At"],
        Params: result.data.params
          ? JSON.stringify(result.data.params)
          : row.Params,
      };
      setTableData(updatedData);
      toast.success(
        `Menu ${active ? "activated" : "deactivated"} successfully`
      );
    } catch (err: Error | unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      toast.error(error.message || "Failed to toggle menu status");
      console.error("Toggle menu status error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (newRow: any) => {
    const token = getToken();
    if (!token) {
      setFormError("Access token missing");
      return;
    }

    setIsLoading(true);
    setFormError(null);

    let parsedParams = {};
    try {
      parsedParams = newRow.params ? JSON.parse(newRow.params) : {};
    } catch (err: Error | unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      console.log("Error: Invalid JSON format:", error);
      setFormError("Invalid JSON format for params");
      setIsLoading(false);
      return;
    }

    // Simulate API call for adding a new menu
    try {
      // Commented out actual API call
      // const response = await fetch(API_ENDPOINTS.MENU_LIST, {
      //   method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     name: newRow.title,
      //     order_by: parseInt(newRow.order_by),
      //     icon: newRow.icon,
      //     path: newRow.path,
      //     params: parsedParams,
      //   }),
      // });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || "Failed to add menu");
      // }

      // Simulate success response for adding a menu
      const simulatedNewMenu = {
        id: Math.random().toString(36).substring(2, 11), // Generate a unique ID
        name: newRow.title,
        order_by: parseInt(newRow.order_by),
        icon: newRow.icon,
        path: newRow.path,
        params: parsedParams,
        active: true, // New items are typically active by default
        created_at: new Date().toISOString(),
        updated_at: null,
      };

      // Add the new menu to the table data
      setTableData((prevData) => [
        ...prevData,
        {
          id: simulatedNewMenu.id,
          Title: simulatedNewMenu.name,
          Order: String(simulatedNewMenu.order_by),
          Icon: simulatedNewMenu.icon,
          Path: simulatedNewMenu.path,
          Params: JSON.stringify(simulatedNewMenu.params),
          "Created At": formatDateTime(simulatedNewMenu.created_at),
          "Updated At": "",
          active: simulatedNewMenu.active,
        },
      ]);

      setShowForm(false);
      toast.success("Menu added successfully");
    } catch (err: Error | unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      toast.error(error.message || "Failed to add menu");
      console.error("Add menu error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const parentTitle = "Manage Roles & Permissions";

  return (
    <ClientLayout>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg rounded-lg h-full">
        {error ? (
          <div className="text-center text-red-600 dark:text-red-400">
            {error}
          </div>
        ) : (
          <>
            {!showForm ? (
              <DataTable
                headers={headers}
                data={tableData}
                onAdd={() => setShowForm(true)}
                onEdit={handleEdit}
                onToggleActive={handleToggleActive}
                searchKey="Title"
                actionIcons={["function"]}
                title="Menus"
                parent={parentTitle}
                formFields={menuFormFields}
                headerToKeyMap={{
                  Title: "Title",
                  Order: "Order",
                  Icon: "Icon",
                  Path: "Path",
                  Params: "Params",
                  "Created At": "Created At",
                  "Updated At": "Updated At",
                  Actions: "Actions",
                }}
              />
            ) : (
              <div className="mt-6 pt-6">
                {formError && (
                  <div className="text-center text-red-600 dark:text-red-400 mb-4">
                    {formError}
                  </div>
                )}
                <FormTemplate
                  fields={menuFormFields}
                  onSubmit={handleAdd}
                  parent={parentTitle}
                  parentLink="#"
                  onCancel={() => setShowForm(false)}
                  title="Add New Menu"
                  initialValues={{
                    title: "",
                    order_by: 0,
                    icon: "",
                    path: "",
                    params: "{}",
                    active: false, // New menus generally start as active, adjust if needed
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </ClientLayout>
  );
};

export default MenuPage;