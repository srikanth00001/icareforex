"use client";
import DataTable from "@/app/components/table/table"; // Import the new DataTable
import { API_ENDPOINTS } from "@/constants/api";
import React, { useState, useEffect, useCallback } from "react";
import { useLoading } from "@/app/components/loader/loading-context";
import { toast } from "react-toastify";
import FormTemplate from "../components/forms/form";
import ClientLayout from "../components/Layout/Layout";

interface TableRow {
  id: string;
  name: string;
  active: boolean;
}

const getToken = () => localStorage.getItem("access_token");

const RolePage: React.FC = () => {
  const headers: string[] = ["Name", "Phone number","Company","Role","Status","Actions"];
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { setIsLoading } = useLoading();
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const roleFormFields = [
    {
      name: "name",
      label: "Role Name",
      type: "text" as const,
      required: true,
      placeholder: "Enter role name",
    },
  ];

  // Sample data to use instead of fetching from API
  const sampleData: TableRow[] = [
    {
      id: "1",
      name: "Srikanth",
      phoneNumber: "+968 112 3456",
      company: "Wuckert Inc",
      role: "Content Creator",
      status: "Active",
    },
    {
      id: "2",
      name: "Sivakumar Velu",
      phoneNumber: "+941 11234-5678",
      company: "Feest Group",
      role: "IT Admin",
      status: "Pending",
    },
    {
      id: "3",
      name: "Karthikeyan Murugan",
      phoneNumber: "+3491 123 4567",
      company: "Kihn, Marquardt and Crist",
      role: "Financial Planner",
      status: "Banned",
    },
    {
      id: "4",
      name: "suddep",
      phoneNumber: "+9255 1234 5678",
      company: "Rempel, Hand and Herzog",
      role: "HR Recruiter",
      status: "Active",
    },
    {
      id: "5",
      name: "Vignesh Balasubramanian",
      phoneNumber: "+8610 1234 5678",
      company: "Mraz, Donnelly and Collins",
      role: "Graphic Designer",
      status: "Banned",
    },
  ];

  // Comment out the fetchData function
  /*
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) throw new Error("Access token not found");

      const response = await fetch(`${API_ENDPOINTS.ROLE_LIST}?limit=1000`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to fetch roles: ${errorData}`);
      }

      const json = await response.json();
      if (!json.data?.items || !Array.isArray(json.data.items)) {
        throw new Error("Invalid response structure: items array missing");
      }

      const formattedData: TableRow[] = json.data.items.map(
        (item: any, index: number) => {
          const id = item.id || item._id || item.roleId;
          if (!id || !item.name) {
            throw new Error(`Role at index ${index} missing id or name`);
          }
          return {
            id,
            name: item.name,
            active: item.active ?? false,
          };
        }
      );

      setTableData(formattedData);
    } catch (err: Error | unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      toast.error(error.message || "Failed to fetch roles");
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);
  */

  // Use sample data instead of fetching
  useEffect(() => {
    setTableData(sampleData);
  }, []);

  const handleEdit = async (row: TableRow, index: number) => {
    const token = getToken();
    if (!token) {
      toast.error("Access token missing");
      return;
    }
    if (!row.id || !row.name) {
      toast.error("Cannot update role: Missing role ID or name");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(API_ENDPOINTS.ROLE_UPDATE(row.id), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: row.name,
          active: row.active,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update role: ${errorData}`);
      }

      const result = await response.json();
      const updatedData = [...tableData];
      updatedData[index] = {
        ...row,
        name: result.data.name,
        active: result.data.active,
      };
      setTableData(updatedData);
      toast.success("Role updated successfully");
    } catch (err: Error | unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      toast.error(error.message || "Failed to update role");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (
    row: TableRow,
    index: number,
    active: boolean
  ) => {
    const token = getToken();
    if (!token) {
      toast.error("Access token missing");
      return;
    }
    if (!row.id) {
      toast.error("Cannot update role: Missing role ID");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(API_ENDPOINTS.ROLE_UPDATE(row.id), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: row.name,
          active,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to toggle role: ${errorData}`);
      }

      const result = await response.json();
      const updatedData = [...tableData];
      updatedData[index] = { ...row, active: result.data.active ?? active };
      setTableData(updatedData);
      toast.success(
        `Role ${active ? "activated" : "deactivated"} successfully`
      );
    } catch (err: Error | unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      toast.error(error.message || "Failed to toggle role status");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (newRow: TableRow) => {
    const token = getToken();
    if (!token) {
      setFormError("Access token missing");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(API_ENDPOINTS.ROLE_CREATE, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newRow.name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add role");
      }

      // Instead of fetching, append new row to sample data for demo purposes
      setTableData([...tableData, { ...newRow, id: `${tableData.length + 1}`, active: false }]);
      setShowForm(false);
      toast.success("Role added successfully");
    } catch (err: Error | unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      toast.error(error.message || "Failed to add role");
    } finally {
      setIsLoading(false);
    }
  };

  const parentTitle = "Manage Roles & Permissions";

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
                onEdit={handleEdit}
                onToggleActive={handleToggleActive}
                searchKey="name"
                title="Roles"
                parent={parentTitle}
                formFields={roleFormFields}
              />
            ) : (
              <div className="mt-6">
                {formError && (
                  <div className="text-center text-red-600 dark:text-red-400 mb-4">
                    {formError}
                  </div>
                )}
                <FormTemplate
                  fields={roleFormFields}
                  onSubmit={(data: Record<string, any>) =>
                    handleAdd(data as TableRow)
                  }
                  parent={parentTitle}
                  parentLink="#"
                  onCancel={() => setShowForm(false)}
                  title="Add Role"
                  initialValues={{ name: "", active: false }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </ClientLayout>
  );
};

export default RolePage;