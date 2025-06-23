"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import DataTable, { TableRow } from "../table/table";
import LinkMt5Modal from "../model/LinkMt5Modal";
import CreateMt5Modal from "../model/CreateMt5Modal";

// --- TradingAccountsTab Component ---
// The main component for the Trading Accounts page, integrating the DataTable and Modals.
const TradingAccountsTab: React.FC = () => {
  // State to control visibility of the two MT5 modals
  const [showLinkMt5Modal, setShowLinkMt5Modal] = useState(false);
  const [showCreateMt5Modal, setShowCreateMt5Modal] = useState(false);

  // Mock data for populating the Trading Accounts table
  const tradingAccountData: TableRow[] = [
    {
      id: "1",
      login: "1234567",
      accountType: "Executive MT5",
      platform: "MT5",
      type: "LIVE",
      currency: "USD",
      leverage: "1:500",
      balance: "10000.00",
      credit: "0.00",
      equity: "10000.00",
      margin: "500.00",
      marginLevel: "2000.00%",
      marginFree: "9500.00",
      dateCreated: "2024-01-15",
    },
    {
      id: "2",
      login: "7654321",
      accountType: "Standard",
      platform: "MT5",
      type: "DEMO",
      currency: "EUR",
      leverage: "1:200",
      balance: "5000.00",
      credit: "0.00",
      equity: "5000.00",
      margin: "250.00",
      marginLevel: "2000.00%",
      marginFree: "4750.00",
      dateCreated: "2024-02-20",
    },
  ];

  // Headers for the Trading Accounts table
  const tradingAccountHeaders = [
    "Login",
    "Account Type",
    "Platform",
    "Type",
    "Currency",
    "Leverage",
    "Balance",
    "Credit",
    "Equity",
    "Margin",
    "Margin Level",
    "Margin Free",
    "Date Created",
  ];

  // Handler to open the "Link MT5" modal
  const handleLinkMt5Click = () => {
    setShowLinkMt5Modal(true);
  };

  // Handler to open the "Create Trading Account" modal
  const handleCreateTradingAccountClick = () => {
    setShowCreateMt5Modal(true);
  };

  return (
    <div className="text-gray-700 dark:text-gray-300 bg-white dark:bg-[#121212] dark:border dark:border-gray-200 p-1 rounded-lg shadow font-inter">
      {/* Render the DataTable component for Trading Accounts */}
      <DataTable
        headers={tradingAccountHeaders}
        data={tradingAccountData}
        searchKey="login" // Use 'login' for searching in trading accounts table
        title="Trading Accounts" // Pass the title to enable specific button/column rendering
        parent="Trading Accounts (0) ↻" // Parent text as seen in the image
        onLinkMt5={handleLinkMt5Click} // Pass handler for "Link MT5" button
        onCreateTradingAccount={handleCreateTradingAccountClick} // Pass handler for "Create Trading Account" button
      />

      {/* Render the LinkMt5Modal, controlled by showLinkMt5Modal state */}
      <LinkMt5Modal
        isOpen={showLinkMt5Modal}
        onClose={() => setShowLinkMt5Modal(false)}
      />
      {/* Render the CreateMt5Modal, controlled by showCreateMt5Modal state */}
      <CreateMt5Modal
        isOpen={showCreateMt5Modal}
        onClose={() => setShowCreateMt5Modal(false)}
      />
    </div>
  );
};

export default TradingAccountsTab;
