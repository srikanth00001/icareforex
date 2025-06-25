"use client";
import DataTable from "@/app/components/table/table";
import React, { useState, useEffect } from "react";
import { useLoading } from "@/app/components/loader/loading-context";
import { toast } from "react-toastify";
import FormTemplate from "../components/forms/form";
import ClientLayout from "../components/layout/Layout";

interface PermissionRow {
  id: string;
  menuName: string;
  roleId: string;
  roleName: string;
  permissions: {
    view: boolean;
    add: boolean;
    edit: boolean;
    delete: boolean;
  };
}

const getToken = () => localStorage.getItem("access_token");

const PermissionPage: React.FC = () => {
  const headers: string[] = ["Menu Name", "View", "Add", "Edit", "Delete"];
  const [tableData, setTableData] = useState<PermissionRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { setIsLoading } = useLoading();
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Sample role data for mapping role_id to roleName
  const roleData = [
    { id: "6854ff25b1d7f8a34770a112", name: "Admin" },
    { id: "6854ff25b1d7f8a34770a113", name: "Content Creator" },
    { id: "6854ff25b1d7f8a34770a114", name: "IT Admin" },
    { id: "6854ff25b1d7f8a34770a115", name: "Financial Planner" },
    { id: "6854ff25b1d7f8a34770a116", name: "HR Recruiter" },
  ];

  const permissionFormFields = [
    {
      name: "menuId",
      label: "Menu",
      type: "select" as const,
      required: true,
      options: [
        { value: "6854ffe8b1d7f8a34770a120", label: "Dashboard" },
        { value: "a1b2c3d4e5f6g7h8i9j0k1l2", label: "Settings" },
        { value: "m3n4o5p6q7r8s9t0u1v2w3x4", label: "Users" },
      ],
    },
    {
      name: "roleId",
      label: "Role",
      type: "select" as const,
      required: true,
      options: roleData.map((role) => ({
        value: role.id,
        label: role.name,
      })),
    },
    {
      name: "view",
      label: "View Permission",
      type: "checkbox" as const,
    },
    {
      name: "add",
      label: "Add Permission",
      type: "checkbox" as const,
    },
    {
      name: "edit",
      label: "Edit Permission",
      type: "checkbox" as const,
    },
    {
      name: "delete",
      label: "Delete Permission",
      type: "checkbox" as const,
    },
  ];

  // Sample API response data
  const samplePermissionData = {
    status: true,
    message: "Permissions fetched successfully",
    data: [
      {
        id: "6855017ab1d7f8a34770a12f",
        role_id: "6854ff25b1d7f8a34770a112",
        menu_data: {
          "6854ffe8b1d7f8a34770a120": ["add", "edit", "view", "delete"],
        },
        active: true,
        created_at: "2025-06-20T11:55:43.486320",
        created_by: null,
        updated_at: null,
        updated_by: null,
      },
    ],
  };

  const sampleMenuData = {
    status: true,
    message: "Menus fetched successfully",
    data: [
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
        updated_at: null,
        updated_by: null,
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
      },
    ],
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    try {
      const permissions = samplePermissionData.data;
      const menus = sampleMenuData.data;

      const formattedData: PermissionRow[] = permissions.flatMap((perm) =>
        Object.entries(perm.menu_data).map(([menuId, permList]) => {
          const menu = menus.find((m) => m.id === menuId);
          const role = roleData.find((r) => r.id === perm.role_id);
          return {
            id: perm.id,
            menuName: menu ? menu.name : "Unknown Menu",
            roleId: perm.role_id,
            roleName: role ? role.name : "Unknown Role",
            permissions: {
              view: permList.includes("view"),
              add: permList.includes("add"),
              edit: permList.includes("edit"),
              delete: permList.includes("delete"),
            },
          };
        })
      );

      setTableData(formattedData);
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error.message || "Failed to process permissions");
      toast.error(error.message || "Failed to process permissions");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleEdit = async (row: PermissionRow, index: number) => {
    const token = getToken();
    if (!token) {
      toast.error("Access token missing");
      return;
    }
    if (!row.id || !row.menuName || !row.roleId) {
      toast.error("Cannot update permission: Missing required fields");
      return;
    }

    try {
      setIsLoading(true);
      // Simulate API update
      const updatedPermissions = Object.entries(row.permissions)
        .filter(([_, value]) => value)
        .map(([key]) => key);
      const updatedData = [...tableData];
      updatedData[index] = { ...row };
      setTableData(updatedData);
      toast.success("Permission updated successfully");
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      toast.error(error.message || "Failed to update permission");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePermissionChange = (
    row: PermissionRow,
    index: number,
    permissionKey: keyof PermissionRow["permissions"],
    checked: boolean
  ) => {
    const updatedRow = {
      ...row,
      permissions: { ...row.permissions, [permissionKey]: checked },
    };
    handleEdit(updatedRow, index);
  };

  const handleAdd = async (newRow: any) => {
    const token = getToken();
    if (!token) {
      setFormError("Access token missing");
      return;
    }

    try {
      setIsLoading(true);
      const permissions = Object.entries({
        view: newRow.view || false,
        add: newRow.add || false,
        edit: newRow.edit || false,
        delete: newRow.delete || false,
      })
        .filter(([_, value]) => value)
        .map(([key]) => key);

      const newPermission: PermissionRow = {
        id: Math.random().toString(36).substring(2, 11),
        menuName:
          sampleMenuData.data.find((m) => m.id === newRow.menuId)?.name ||
          "Unknown Menu",
        roleId: newRow.roleId,
        roleName:
          roleData.find((r) => r.id === newRow.roleId)?.name || "Unknown Role",
        permissions: {
          view: newRow.view || false,
          add: newRow.add || false,
          edit: newRow.edit || false,
          delete: newRow.delete || false,
        },
      };

      setTableData([...tableData, newPermission]);
      setShowForm(false);
      toast.success("Permission added successfully");
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setFormError(error.message || "Failed to add permission");
      toast.error(error.message || "Failed to add permission");
    } finally {
      setIsLoading(false);
    }
  };

  const parentTitle = "Manage Permissions";

  return (
    <ClientLayout>
      <div className="text-gray-900 dark:text-gray-100">
        {error ? (
          <div className="text-center text-red-600 dark:text-red-400">
            {error}
          </div>
        ) : (
          <>
            {!showForm ? (
              <DataTable
                headers={headers}
                data={tableData.map((row) => ({
                  ...row,
                  role: row.roleName, // Map roleName to role for display
                }))}
                onAdd={() => setShowForm(true)}
                onEdit={(row: PermissionRow, index: number) =>
                  handleEdit({ ...row, roleId: tableData[index].roleId }, index)
                }
                onPermissionChange={handlePermissionChange}
                searchKey="menuName"
                actionIcons={["function"]}
                title="Permissions"
                parent={parentTitle}
                formFields={permissionFormFields}
              />
            ) : (
              <div className="mt-6">
                {formError && (
                  <div className="text-center text-red-600 dark:text-red-400 mb-4">
                    {formError}
                  </div>
                )}
                <FormTemplate
                  fields={permissionFormFields}
                  onSubmit={handleAdd}
                  parent={parentTitle}
                  parentLink="#"
                  onCancel={() => setShowForm(false)}
                  title="Add Permission"
                  initialValues={{
                    menuId: "",
                    roleId: "",
                    view: false,
                    add: false,
                    edit: false,
                    delete: false,
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

export default PermissionPage;