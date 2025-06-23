"use client";
import DataTable from "@/app/components/table/table";
import React, { useState, useEffect } from "react";
import { useLoading } from "@/app/components/loader/loading-context";
import { toast } from "react-toastify";
import FormTemplate from "../components/forms/form";
import ClientLayout from "../components/Layout/Layout";

interface PermissionRow {
  id: string;
  menuName: string;
  role: string;
  permissions: {
    view: boolean;
    add: boolean;
    edit: boolean;
    delete: boolean;
  };
}

const getToken = () => localStorage.getItem("access_token");

const PermissionPage: React.FC = () => {
  const headers: string[] = ["Menu name", "View", "Add", "Edit", "Delete"];
  const [tableData, setTableData] = useState<PermissionRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { setIsLoading } = useLoading();
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const permissionFormFields = [
    {
      name: "menuName",
      label: "Menu Name",
      type: "text" as const,
      required: true,
      placeholder: "Enter menu name",
    },
    {
      name: "role",
      label: "Role",
      type: "select" as const,
      required: true,
      options: [
        "Content Creator",
        "IT Admin",
        "Financial Planner",
        "HR Recruiter",
        "Graphic Designer",
      ],
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

  // Sample data to simulate API response
  const sampleData: PermissionRow[] = [
    {
      id: "1",
      menuName: "Dashboard",
      role: "Content Creator",
      permissions: { view: true, add: false, edit: true, delete: false },
    },
    {
      id: "2",
      menuName: "Reports",
      role: "IT Admin",
      permissions: { view: true, add: true, edit: false, delete: false },
    },
    {
      id: "3",
      menuName: "Settings",
      role: "Financial Planner",
      permissions: { view: true, add: false, edit: true, delete: true },
    },
    {
      id: "4",
      menuName: "Users",
      role: "HR Recruiter",
      permissions: { view: true, add: true, edit: true, delete: false },
    },
    {
      id: "5",
      menuName: "Analytics",
      role: "Graphic Designer",
      permissions: { view: false, add: false, edit: false, delete: false },
    },
  ];

  // Use sample data instead of fetching
  useEffect(() => {
    setTableData(sampleData);
  }, []);

  const handleEdit = async (row: PermissionRow, index: number) => {
    const token = getToken();
    if (!token) {
      toast.error("Access token missing");
      return;
    }
    if (!row.id || !row.menuName) {
      toast.error("Cannot update permission: Missing menu ID or name");
      return;
    }

    try {
      setIsLoading(true);
      // Simulate API update
      const updatedData = [...tableData];
      updatedData[index] = { ...row };
      setTableData(updatedData);
      toast.success("Permission updated successfully");
    } catch (err: Error | unknown) {
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

  const handleAdd = async (newRow: PermissionRow) => {
    const token = getToken();
    if (!token) {
      setFormError("Access token missing");
      return;
    }

    try {
      setIsLoading(true);
      // Simulate API create
      const newPermission: PermissionRow = {
        id: `${tableData.length + 1}`,
        menuName: newRow.menuName,
        role: newRow.role,
        permissions: {
          view: newRow.permissions.view || false,
          add: newRow.permissions.add || false,
          edit: newRow.permissions.edit || false,
          delete: newRow.permissions.delete || false,
        },
      };
      setTableData([...tableData, newPermission]);
      setShowForm(false);
      toast.success("Permission added successfully");
    } catch (err: Error | unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
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
                data={tableData}
                onAdd={() => setShowForm(true)}
                onEdit={(row: PermissionRow, index: number) => handleEdit(row, index)}
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
                  onSubmit={(data: Record<string, any>) =>
                    handleAdd({
                      id: "",
                      menuName: data.menuName,
                      role: data.role,
                      permissions: {
                        view: data.view || false,
                        add: data.add || false,
                        edit: data.edit || false,
                        delete: data.delete || false,
                      },
                    })
                  }
                  parent={parentTitle}
                  parentLink="#"
                  onCancel={() => setShowForm(false)}
                  title="Add Permission"
                  initialValues={{
                    menuName: "",
                    role: "",
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