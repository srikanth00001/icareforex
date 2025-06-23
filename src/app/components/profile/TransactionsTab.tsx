"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import DataTable, { TableRow } from "../table/table";
import { FaWallet, FaMoneyBillTransfer, FaFileLines } from "react-icons/fa6";
import { FaExchangeAlt } from "react-icons/fa";

// --- Styles to match ProfilePage ---
const transactionsPageStyles = {
  container: "p-1 bg-gray-50 dark:bg-black min-h-screen",
  tabsContainer: "bg-white dark:bg-[#121212] dark:border dark:border-gray-200 shadow rounded-lg mb-6",
  tabList: "flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto",
  tabButton: (isActive: boolean) =>
    `py-3 px-6 text-sm font-medium focus:outline-none transition-colors duration-200 whitespace-nowrap
    ${isActive
      ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
      : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
    }`,
  tabContent: "p-1",
};

// --- TransactionsPage Component ---
const TransactionsPage: React.FC = () => {
  // State to manage the currently active tab
  const [activeTab, setActiveTab] = useState("Wallets"); // Default to 'Wallets' tab

  // --- Mock Data for each tab ---
  const walletsTransactionsData: TableRow[] = [
    {
      id: "wal1",
      date: "2024-06-19",
      transactionId: "TXN001",
      client: "Client A",
      gateway: "Bank Transfer",
      tradingAccount: "MT5-12345",
      currency: "USD",
      bankReceipt: "Receipt123.pdf",
      note: "Deposit",
      paid: "Yes",
      fee: "5.00",
      amount: "1000.00",
      salesRep: "John Doe",
      status: "Completed",
    },
    {
      id: "wal2",
      date: "2024-06-18",
      transactionId: "TXN002",
      client: "Client B",
      gateway: "Credit Card",
      tradingAccount: "MT5-67890",
      currency: "EUR",
      bankReceipt: "Receipt456.pdf",
      note: "Withdrawal",
      paid: "No",
      fee: "2.00",
      amount: "500.00",
      salesRep: "Jane Smith",
      status: "Pending",
    },
  ];

  const forexTransactionsData: TableRow[] = [
    {
      id: "for1",
      date: "2024-06-17",
      client: "Client C",
      gateway: "Crypto",
      currency: "BTC",
      from: "Exchange X",
      status: "Completed",
      reason: "Investment",
      amount: "0.05",
      note: "Bitcoin purchase",
      txId: "BTCXYZ123",
    },
    {
      id: "for2",
      date: "2024-06-16",
      client: "Client D",
      gateway: "Wire Transfer",
      currency: "JPY",
      from: "Bank Y",
      status: "Processing",
      reason: "Forex Trade",
      amount: "100000",
      note: "JPY trade",
      txId: "JPYABC456",
    },
  ];

  const internalTransferData: TableRow[] = [
    {
      id: "int1",
      transactionId: "INT001",
      date: "2024-06-15",
      client: "Client E",
      fromCurrency: "USD",
      toCurrency: "EUR",
      from: "Wallet A",
      to: "Trading Acc B",
      fee: "1.00",
      baseAmount: "100.00",
      conversionRate: "0.92",
      convertedAmount: "92.00",
      status: "Completed",
    },
    {
      id: "int2",
      transactionId: "INT002",
      date: "2024-06-14",
      client: "Client F",
      fromCurrency: "GBP",
      toCurrency: "USD",
      from: "Trading Acc C",
      to: "Wallet D",
      fee: "0.50",
      baseAmount: "50.00",
      conversionRate: "1.27",
      convertedAmount: "63.50",
      status: "Pending",
    },
  ];

  const creditsData: TableRow[] = [
    {
      id: "cred1",
      creditId: "CRD001",
      date: "2024-06-13",
      amount: "200.00",
      creditType: "Bonus",
      client: "Client G",
      currency: "USD",
      status: "Approved",
      note: "Welcome bonus",
    },
    {
      id: "cred2",
      creditId: "CRD002",
      date: "2024-06-12",
      amount: "50.00",
      creditType: "Referral",
      client: "Client H",
      currency: "EUR",
      status: "Pending",
      note: "Friend referral",
    },
  ];

  // --- Headers for each tab ---
  const walletsHeaders = [
    "Date",
    "Transaction Id",
    "Client",
    "Gateway",
    "Trading Account",
    "Currency",
    "Bank Receipt",
    "Note",
    "Paid",
    "Fee",
    "Amount",
    "Sales Rep",
    "Status",
  ];

  const forexHeaders = [
    "Date",
    "Client",
    "Gateway",
    "Currency",
    "From",
    "Status",
    "Reason",
    "Amount",
    "Note",
    "Tx-Id",
  ];

  const internalTransferHeaders = [
    "Transaction Id",
    "Date",
    "Client",
    "From Currency",
    "To Currency",
    "From",
    "To",
    "Fee",
    "Base Amount",
    "Conversion Rate",
    "Converted Amount",
    "Status",
  ];

  const creditsHeaders = [
    "Credit Id",
    "Date",
    "Amount",
    "Credit Type",
    "Client",
    "Currency",
    "Status",
    "Note",
  ];

  // --- Functions to handle button clicks (placeholders for modal/form logic) ---
  const handleAddTransaction = () => toast.info("Add Transaction clicked!");
  const handleWithdrawal = () => toast.info("Withdrawal clicked!");
  const handleAddNewInternalTransfer = () => toast.info("Add New Internal Transfer clicked!");

  // --- Conditional rendering of DataTable based on activeTab ---
  const renderDataTable = () => {
    switch (activeTab) {
      case "Wallets":
        return (
          <DataTable
            headers={walletsHeaders}
            data={walletsTransactionsData}
            searchKey="transactionId"
            title="Transactions List"
            parent="Transactions List (0)"
            onAddTransaction={handleAddTransaction}
            onWithdrawal={handleWithdrawal}
          />
        );
      case "Forex":
        return (
          <DataTable
            headers={forexHeaders}
            data={forexTransactionsData}
            searchKey="client"
            title="Withdrawal List"
            parent="Transactions List (0)"
            onWithdrawal={handleWithdrawal}
          />
        );
      case "Internal Transfer":
        return (
          <DataTable
            headers={internalTransferHeaders}
            data={internalTransferData}
            searchKey="transactionId"
            title="Internal Transfers"
            parent="Internal Transfers"
            onAddNewInternalTransfer={handleAddNewInternalTransfer}
          />
        );
      case "Credit":
        return (
          <DataTable
            headers={creditsHeaders}
            data={creditsData}
            searchKey="creditId"
            title="Credits"
            parent="Credits"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={transactionsPageStyles.container}>
      <div className={transactionsPageStyles.tabsContainer}>
        <div className={transactionsPageStyles.tabList}>
          <button
            className={transactionsPageStyles.tabButton(activeTab === "Wallets")}
            onClick={() => setActiveTab("Wallets")}
          >
            <FaWallet className="inline mr-2" /> Wallets
          </button>
          <button
            className={transactionsPageStyles.tabButton(activeTab === "Forex")}
            onClick={() => setActiveTab("Forex")}
          >
            <FaExchangeAlt className="inline mr-2" /> Forex
          </button>
          <button
            className={transactionsPageStyles.tabButton(activeTab === "Internal Transfer")}
            onClick={() => setActiveTab("Internal Transfer")}
          >
            <FaMoneyBillTransfer className="inline mr-2" /> Internal Transfer
          </button>
          <button
            className={transactionsPageStyles.tabButton(activeTab === "Credit")}
            onClick={() => setActiveTab("Credit")}
          >
            <FaFileLines className="inline mr-2" /> Credit
          </button>
        </div>

        <div className={transactionsPageStyles.tabContent}>
          {renderDataTable()}
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;