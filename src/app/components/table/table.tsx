"use client";
import React, { useState, useMemo } from "react";

// --- DataTable Interfaces ---
export interface TableRow {
  id: string;
  menuName?: string;
  name?: string;
  phoneNumber?: string;
  company?: string;
  role?: string;
  status?: string;
  permissions?: {
    view: boolean;
    add: boolean;
    edit: boolean;
    delete: boolean;
  };
  login?: string;
  accountType?: string;
  platform?: string;
  type?: string;
  currency?: string;
  leverage?: string;
  balance?: string;
  credit?: string;
  equity?: string;
  margin?: string;
  marginLevel?: string;
  marginFree?: string;
  dateCreated?: string;
  bankName?: string;
  owner?: string;
  swiftCode?: string;
  iban?: string;
  accountNumber?: string;
  transactionId?: string;
  gateway?: string;
  tradingAccount?: string;
  bankReceipt?: string;
  note?: string;
  paid?: string;
  fee?: string;
  amount?: string;
  salesRep?: string;
  date?: string;
  client?: string;
  fromCurrency?: string;
  toCurrency?: string;
  from?: string;
  to?: string;
  baseAmount?: string;
  conversionRate?: string;
  convertedAmount?: string;
  reason?: string;
  txId?: string;
  creditId?: string;
  creditType?: string;
  asset?: string;
  crypto?: string;
  address?: string;
  freezeAmount?: string;
  isActive?: boolean;
  active?: boolean; // For Menus
  triggeredBy?: string;
  logLevel?: string;
  logType?: string;
  message?: string;
  Title?: string; // For Menus
  Order?: string;
  Icon?: string;
  Path?: string;
  Params?: string;
  "Created At"?: string;
  "Updated At"?: string;
}

export interface DataTableProps {
  headers: string[];
  data: TableRow[];
  onAdd?: () => void;
  onEdit?: (row: TableRow, index: number) => void;
  onToggleActive?: (row: TableRow, index: number, active: boolean) => void;
  searchKey: keyof TableRow;
  title: string;
  parent?: string;
  formFields?: Array<{
    name: string;
    label: string;
    type: "text" | "select" | "checkbox" | "textarea";
    required?: boolean;
    placeholder?: string;
    options?: string[];
  }>;
  actionIcons?: string[];
  onLinkMt5?: () => void;
  onCreateTradingAccount?: () => void;
  onAddTransaction?: () => void;
  onWithdrawal?: () => void;
  onAddNewInternalTransfer?: () => void;
  onAddWallet?: () => void;
  headerToKeyMap?: { [key: string]: string };
}

// --- DataTable Component ---
const DataTable: React.FC<DataTableProps> = ({
  headers = [],
  data = [],
  onAdd,
  onEdit,
  searchKey,
  title,
  parent,
  onLinkMt5,
  onCreateTradingAccount,
  onAddTransaction,
  onWithdrawal,
  onAddNewInternalTransfer,
  onAddWallet,
  onToggleActive,
  actionIcons = [],
  headerToKeyMap = {},
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [isDense, setIsDense] = useState(false);

  const roles = [
    "All",
    "Content Creator",
    "IT Admin",
    "Financial Planner",
    "HR Recruiter",
    "Graphic Designer",
  ];

  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    const result = data.filter((row) => {
      const searchValue = (row[searchKey as keyof TableRow] ?? "").toString();
      const matchesSearch = searchValue.toLowerCase().includes(searchTerm.toLowerCase());

      // Handle status/active filtering
      let matchesStatus = true;
      if (title.toLowerCase() === "menus") {
        matchesStatus =
          statusFilter === "All" ||
          (statusFilter === "Active" && row.active === true) ||
          (statusFilter === "Banned" && row.active === false);
      } else if (title.toLowerCase() === "client wallets") {
        matchesStatus =
          statusFilter === "All" ||
          (statusFilter === "Active" && row.isActive === true) ||
          (statusFilter === "Banned" && row.isActive === false);
      } else {
        const rowStatus = (row.status ?? "").toString().toLowerCase();
        matchesStatus = statusFilter === "All" || rowStatus === statusFilter.toLowerCase();
      }

      const matchesRole =
        title.toLowerCase() === "menus"
          ? true
          : roleFilter === "All" || (row.role ?? "").toString() === roleFilter;

      return matchesSearch && matchesStatus && matchesRole;
    });
    return result;
  }, [data, searchTerm, statusFilter, roleFilter, searchKey, title]);

  const counts = useMemo(() => {
    if (!Array.isArray(data)) return { all: 0, active: 0, pending: 0, banned: 0, rejected: 0 };
    const all = data.length;
    let active = 0;
    let banned = 0;
    if (title.toLowerCase() === "menus") {
      active = data.filter((row) => row.active === true).length;
      banned = data.filter((row) => row.active === false).length;
    } else if (title.toLowerCase() === "client wallets") {
      active = data.filter((row) => row.isActive === true).length;
      banned = data.filter((row) => row.isActive === false).length;
    } else {
      active = data.filter((row) => (row.status ?? "").toString().toLowerCase() === "active").length;
      banned = data.filter((row) => (row.status ?? "").toString().toLowerCase() === "banned").length;
    }
    const pending = data.filter((row) => (row.status ?? "").toString().toLowerCase() === "pending").length;
    const rejected = data.filter((row) => (row.status ?? "").toString().toLowerCase() === "rejected").length;
    return { all, active, pending, banned, rejected };
  }, [data, title]);

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePermissionChange = (
    row: TableRow,
    index: number,
    permissionKey: keyof NonNullable<TableRow["permissions"]>,
    checked: boolean
  ) => {
    if (onEdit && row.permissions) {
      const updatedRow = { ...row, permissions: { ...row.permissions, [permissionKey]: checked } };
      onEdit(updatedRow, index);
    }
  };

  const getAddButtonText = () => {
    switch (title.toLowerCase()) {
      case "bank accounts": return "+ Add New Bank Account";
      case "permissions": return "+ New Permission";
      case "client wallets": return "+ Add New Wallet";
      case "menus": return "+ Add New Menu";
      default: return "+ New Item";
    }
  };

  const showActionsColumn = [
    "menus",
    "bank accounts",
    "trading accounts",
    "transactions list",
    "internal transfers",
    "client wallets",
  ].includes(title.toLowerCase());

  const totalRows = filteredData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-5 bg-gray-50 dark:bg-black min-h-screen font-sans flex flex-col">
      <div className="text-sm text-gray-500 dark:text-gray-300 mb-4">{parent}</div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-gray-100">
          {["bank accounts", "trading accounts", "transactions list", "withdrawal list", "internal transfers", "credits", "client wallets", "activities"].includes(title.toLowerCase()) ? `${title} (${data.length})` : title}
        </h2>
        <div className="flex flex-wrap gap-2">
          {title === "Trading Accounts" ? (
            <>
              {onLinkMt5 && (
                <button
                  onClick={onLinkMt5}
                  className="text-sm px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Link MT5
                </button>
              )}
              {onCreateTradingAccount && (
                <button
                  onClick={onCreateTradingAccount}
                  className="text-sm px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  + Create Trading Account
                </button>
              )}
            </>
          ) : title === "Transactions List" ? (
            <>
              {onAddTransaction && (
                <button
                  onClick={onAddTransaction}
                  className="text-sm px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Add Transaction
                </button>
              )}
              {onWithdrawal && (
                <button
                  onClick={onWithdrawal}
                  className="text-sm px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Withdrawal
                </button>
              )}
            </>
          ) : title === "Internal Transfers" ? (
            <>
              {onAddNewInternalTransfer && (
                <button
                  onClick={onAddNewInternalTransfer}
                  className="text-sm px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  + Add New Internal Transfer
                </button>
              )}
              <button
                className="text-sm px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
              >
                Wallet ▾
              </button>
            </>
          ) : title === "Client Wallets" ? (
            <>
              {onAddWallet && (
                <button
                  onClick={onAddWallet}
                  className="text-sm px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  {getAddButtonText()}
                </button>
              )}
            </>
          ) : (
            onAdd && (
              <button
                onClick={onAdd}
                className="text-sm px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                {getAddButtonText()}
              </button>
            )
          )}
        </div>
      </div>

      <div className="flex flex-col space-y-4 mb-4">
        {(title === "Roles" || title === "Users") && (
          <div className="flex space-x-2 overflow-x-auto border-b border-gray-200 dark:border-gray-800">
            {["All", "Active", "Pending", "Banned", "Rejected"].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusFilter(status)}
                className={`px-4 py-2 text-sm font-medium rounded ${
                  statusFilter === status
                    ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    : "bg-gray-200 dark:bg-gray-950 text-gray-600 dark:text-gray-300"
                }`}
              >
                {status}{" "}
                <span
                  className={`ml-1 ${
                    status.toLowerCase() === "active"
                      ? "text-green-500"
                      : status.toLowerCase() === "pending"
                      ? "text-yellow-500"
                      : status.toLowerCase() === "banned" || status.toLowerCase() === "rejected"
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  {counts[status.toLowerCase() as keyof typeof counts]}
                </span>
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:space-x-2 w-full">
          {title.toLowerCase() !== "menus" && (
            <div className="w-full sm:w-64 mb-2 sm:mb-0">
              <select
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="border border-gray-300 dark:border-gray-800 rounded px-3 py-2 w-full text-sm bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 dark:border-gray-800 rounded px-3 py-2 pl-10 w-full text-sm bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto rounded-lg border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 min-h-[calc(100vh-250px)]">
        <table className="w-full min-w-max table-auto border-collapse h-full">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-900 text-gray-500 dark:text-gray-300 uppercase text-sm font-semibold sticky top-0">
              <th className="px-4 py-3 text-left">
                <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
              </th>
              {headers.map((header, index) => (
                <th key={index} className="px-4 py-3 text-left">
                  {header}
                </th>
              ))}
              {showActionsColumn && <th className="px-4 py-3 text-right w-32">Actions</th>}
            </tr>
          </thead>
          <tbody className="relative">
            {paginatedData.map((row, index) => (
              <tr
                key={row.id}
                className={`hover:bg-gray-50 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800 ${
                  isDense ? "text-sm" : ""
                }`}
              >
                <td className="px-4 py-3 text-left">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                </td>
                {title.toLowerCase() === "permissions" ? (
                  <>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.menuName}</td>
                    <td className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={row.permissions?.view ?? false}
                        onChange={(e) => handlePermissionChange(row, index, "view", e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                    </td>
                    <td className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={row.permissions?.add ?? false}
                        onChange={(e) => handlePermissionChange(row, index, "add", e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                    </td>
                    <td className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={row.permissions?.edit ?? false}
                        onChange={(e) => handlePermissionChange(row, index, "edit", e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                    </td>
                    <td className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={row.permissions?.delete ?? false}
                        onChange={(e) => handlePermissionChange(row, index, "delete", e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                    </td>
                  </>
                ) : title.toLowerCase() === "trading accounts" ? (
                  <>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.login}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.accountType}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.platform}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.type}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.currency}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.leverage}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.balance}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.credit}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.equity}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.margin}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.marginLevel}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.marginFree}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.dateCreated}</td>
                  </>
                ) : title.toLowerCase() === "transactions list" ? (
                  <>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.date}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.transactionId}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.client}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.gateway}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.tradingAccount}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.currency}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.bankReceipt}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.note}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.paid}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.fee}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.amount}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.salesRep}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.status}</td>
                  </>
                ) : title.toLowerCase() === "withdrawal list" ? (
                  <>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.date}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.client}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.gateway}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.currency}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.from}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.status}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.reason}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.amount}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.note}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.txId}</td>
                  </>
                ) : title.toLowerCase() === "internal transfers" ? (
                  <>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.transactionId}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.date}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.client}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.fromCurrency}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.toCurrency}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.from}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.to}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.fee}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.baseAmount}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.conversionRate}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.convertedAmount}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.status}</td>
                  </>
                ) : title.toLowerCase() === "credits" ? (
                  <>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.creditId}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.date}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.amount}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.creditType}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.client}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.currency}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.status}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.note}</td>
                  </>
                ) : title.toLowerCase() === "client wallets" ? (
                  <>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.asset}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.amount}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.crypto}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.address}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.freezeAmount}</td>
                  </>
                ) : title.toLowerCase() === "activities" ? (
                  <>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.id}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.triggeredBy}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.logLevel}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.logType}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.dateCreated}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.message}</td>
                  </>
                ) : title.toLowerCase() === "menus" ? (
                  <>
                    {headers.map((header, headerIndex) => (
                      <td
                        key={headerIndex}
                        className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words"
                      >
                        {row[headerToKeyMap[header] as keyof TableRow] ?? row[header as keyof TableRow] ?? ""}
                      </td>
                    ))}
                  </>
                ) : (
                  <>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.bankName || row.name}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.owner || row.phoneNumber}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.swiftCode || row.company}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.iban || row.role}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.accountNumber || row.status}</td>
                    <td className="px-4 py-3 text-left text-gray-900 dark:text-gray-100 break-words">{row.currency}</td>
                  </>
                )}
                {showActionsColumn && (
                  <td className="px-4 py-3 text-right w-32">
                    {(title.toLowerCase() === "menus" || (title.toLowerCase() === "client wallets" && actionIcons.includes("function"))) ? (
                      <div className="relative inline-block w-10 select-none">
                        <input
                          type="checkbox"
                          id={`${title.toLowerCase()}-status-toggle-${row.id}`}
                          checked={title.toLowerCase() === "menus" ? row.active ?? false : row.isActive ?? false}
                          onChange={(e) => onToggleActive && onToggleActive(row, index, e.target.checked)}
                          className="sr-only"
                        />
                        <label
                          htmlFor={`${title.toLowerCase()}-status-toggle-${row.id}`}
                          className={`block h-6 rounded-full cursor-pointer transition-colors duration-200 ${
                            (title.toLowerCase() === "menus" ? row.active : row.isActive) ?? false
                              ? "bg-blue-600"
                              : "bg-gray-300 dark:bg-gray-700"
                          }`}
                        >
                          <span
                            className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                              (title.toLowerCase() === "menus" ? row.active : row.isActive) ?? false
                                ? "transform translate-x-4"
                                : ""
                            }`}
                          />
                        </label>
                      </div>
                    ) : (
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => onEdit && onEdit(row, index)}
                          className="text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-7.036L16.657 3.657a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"
                            />
                          </svg>
                        </button>
                        <button className="text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td
                  colSpan={headers.length + (showActionsColumn ? 2 : 1)}
                  className="text-center py-4 text-gray-500 dark:text-gray-400 h-[calc(100vh-300px)] align-middle"
                >
                  No records
                </td>
              </tr>
            )}
            {paginatedData.length > 0 && paginatedData.length < rowsPerPage && (
              <tr>
                <td
                  colSpan={headers.length + (showActionsColumn ? 2 : 1)}
                  className={`h-[calc(100vh-300px-(48px*${paginatedData.length}))]`}
                ></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-black">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <label className="text-gray-600 dark:text-gray-300">Dense</label>
          <div className="relative inline-block w-10 select-none">
            <input
              type="checkbox"
              id="dense-toggle"
              checked={isDense}
              onChange={() => setIsDense(!isDense)}
              className="sr-only"
            />
            <label
              htmlFor="dense-toggle"
              className={`block w-10 h-6 rounded-full cursor-pointer transition-colors duration-200 ${
                isDense ? "bg-green-500" : "bg-gray-300 dark:bg-gray-800"
              }`}
            >
              <span
                className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                  isDense ? "transform translate-x-4" : ""
                }`}
              />
            </label>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-gray-600 dark:text-gray-300">Rows per page:</label>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="border border-gray-300 dark:border-gray-800 rounded px-2 py-1 text-sm bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <span className="text-gray-600 dark:text-gray-300">
            {`${(currentPage - 1) * rowsPerPage + 1}-${Math.min(currentPage * rowsPerPage, totalRows)} of ${totalRows}`}
          </span>
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-50"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-50"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;