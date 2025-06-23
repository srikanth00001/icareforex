"use client";
import DataTable from "@/app/components/table/table";
import { API_ENDPOINTS } from "@/constants/api";
import React, { useState, useEffect, useMemo } from "react";
import { useLoading } from "@/app/components/loader/loading-context";
import { toast } from "react-toastify";
import FormTemplate from "../components/forms/form";
import ClientLayout from "../components/Layout/Layout";

interface TableRow {
  id: string;
  name: string;
  phoneNumber: string;
  company: string;
  role: string;
  status: string;
}

const getToken = () => localStorage.getItem("access_token");

const UserPage: React.FC = () => {
  const headers: string[] = ["Name", "Phone Number", "Company", "Role", "Status","Actions"];
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { setIsLoading } = useLoading();
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");

  const roles = [
    "All",
    "Content Creator",
    "IT Admin",
    "Financial Planner",
    "HR Recruiter",
    "Graphic Designer",
  ];

  const userFormFields = [
    {
      name: "name",
      label: "Full Name",
      type: "text" as const,
      required: true,
      placeholder: "Enter full name",
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "text" as const,
      required: true,
      placeholder: "Enter phone number",
    },
    {
      name: "company",
      label: "Company",
      type: "text" as const,
      required: true,
      placeholder: "Enter company name",
    },
    {
      name: "role",
      label: "Role",
      type: "text" as const,
      required: true,
      placeholder: "Enter role",
    },
    {
      name: "status",
      label: "Status",
      type: "select" as const,
      required: true,
      options: [
        { value: "Active", label: "Active" },
        { value: "Pending", label: "Pending" },
        { value: "Banned", label: "Banned" },
      ],
    },
  ];

  // Sample data for users
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
      name: "Suddep",
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

  // Use sample data instead of fetching
  useEffect(() => {
    setTableData(sampleData);
  }, []);

  const filteredData = useMemo(() => {
    return tableData.filter((row) => {
      const rowStatus = (row.status ?? "").toString();
      const matchesStatus =
        statusFilter === "All" ||
        rowStatus.toLowerCase() === statusFilter.toLowerCase();

      const rowRole = (row.role ?? "").toString();
      const matchesRole = roleFilter === "All" || rowRole === roleFilter;

      return matchesStatus && matchesRole;
    });
  }, [tableData, statusFilter, roleFilter]);

  const counts = useMemo(() => {
    const all = tableData.length;
    const active = tableData.filter(
      (row) => (row.status ?? "").toString().toLowerCase() === "active"
    ).length;
    const pending = tableData.filter(
      (row) => (row.status ?? "").toString().toLowerCase() === "pending"
    ).length;
    const banned = tableData.filter(
      (row) => (row.status ?? "").toString().toLowerCase() === "banned"
    ).length;
    const rejected = tableData.filter(
      (row) => (row.status ?? "").toString().toLowerCase() === "rejected"
    ).length;
    return { all, active, pending, banned, rejected };
  }, [tableData]);

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
  };

  const handleEdit = async (row: TableRow, index: number) => {
    const token = getToken();
    if (!token) {
      toast.error("Access token missing");
      return;
    }
    if (!row.id) {
      toast.error("Cannot update user: Missing user ID");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(API_ENDPOINTS.USER_UPDATE(row.id), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: row.name,
          phoneNumber: row.phoneNumber,
          company: row.company,
          role: row.role,
          status: row.status,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update user: ${errorData}`);
      }

      const result = await response.json();
      const updatedData = [...tableData];
      updatedData[index] = {
        ...row,
        name: result.data.name,
        phoneNumber: result.data.phoneNumber,
        company: result.data.company,
        role: result.data.role,
        status: result.data.status,
      };
      setTableData(updatedData);
      toast.success("User updated successfully");
    } catch (err: Error | unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      toast.error(error.message || "Failed to update user");
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
      toast.error("Cannot update user: Missing user ID");
      return;
    }

    const newStatus = active ? "Active" : "Banned";

    try {
      setIsLoading(true);
      const response = await fetch(API_ENDPOINTS.USER_UPDATE(row.id), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...row,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to toggle user status: ${errorData}`);
      }

      const result = await response.json();
      const updatedData = [...tableData];
      updatedData[index] = { ...row, status: result.data.status ?? newStatus };
      setTableData(updatedData);
      toast.success(
        `User ${newStatus === "Active" ? "activated" : "banned"} successfully`
      );
    } catch (err: Error | unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      toast.error(error.message || "Failed to toggle user status");
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
      const response = await fetch(API_ENDPOINTS.USER_CREATE, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newRow.name,
          phoneNumber: newRow.phoneNumber,
          company: newRow.company,
          role: newRow.role,
          status: newRow.status,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add user");
      }

      setTableData([...tableData, { ...newRow, id: `${tableData.length + 1}` }]);
      setShowForm(false);
      toast.success("User added successfully");
    } catch (err: Error | unknown) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      toast.error(error.message || "Failed to add user");
    } finally {
      setIsLoading(false);
    }
  };

  const parentTitle = "Manage Users";

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
              <>
                
                <DataTable
                  headers={headers}
                  data={filteredData}
                  onAdd={() => setShowForm(true)}
                  onEdit={handleEdit}
                  onToggleActive={handleToggleActive}
                  searchKey="name"
                  title="Users"
                  parent={parentTitle}
                  formFields={userFormFields}
                />
              </>
            ) : (
              <div className="mt-6">
                {formError && (
                  <div className="text-center text-red-600 dark:text-red-400 mb-4">
                    {formError}
                  </div>
                )}
                <FormTemplate
                  fields={userFormFields}
                  onSubmit={(data: Record<string, any>) =>
                    handleAdd(data as TableRow)
                  }
                  parent={parentTitle}
                  parentLink="#"
                  onCancel={() => setShowForm(false)}
                  title="Add User"
                  initialValues={{
                    name: "",
                    phoneNumber: "",
                    company: "",
                    role: "",
                    status: "Pending",
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

export default UserPage;