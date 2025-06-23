"use client";
import React, { useState } from "react";
import { toast } from "react-toastify"; // Ensure react-toastify is set up in your root App component
import DataTable, { TableRow } from "../table/table";
import AddWalletModal from "../model/AddWalletModal";

// --- WalletsPage Component ---
// This component displays a list of client wallets and allows adding new wallets.
const WalletsTab: React.FC = () => {
  // State to control the visibility of the AddWalletModal
  const [showAddWalletModal, setShowAddWalletModal] = useState(false);

  // Mock data for the Wallets table, matching the structure in image (28).png
  // The 'isActive' field is used to control the toggle switch in the DataTable.
  const [walletData, setWalletData] = useState<TableRow[]>([
    {
      id: "wall-001",
      asset: "USD",
      amount: "0",
      crypto: "Traditional wallet",
      address: "System Wallet",
      freezeAmount: "0",
      isActive: true, // Example: USD wallet is active
    },
    {
      id: "wall-002",
      asset: "TRX",
      amount: "100",
      crypto: "Crypto wallet",
      address: "TRX123XYZ",
      freezeAmount: "0",
      isActive: false, // Example: TRX wallet is inactive
    },
    {
      id: "wall-003",
      asset: "ETH",
      amount: "5",
      crypto: "Crypto wallet",
      address: "ETHABC789",
      freezeAmount: "1",
      isActive: true, // Example: ETH wallet is active
    },
  ]);

  // Headers for the Wallets table
  const walletHeaders = [
    "Asset",
    "Amount",
    "Crypto",
    "Address",
    "Freeze Amount",
    "Status", // This column will contain the toggle switch
  ];

  // Handler to open the AddWalletModal
  const handleAddWalletClick = () => {
    setShowAddWalletModal(true);
  };

  // Handler for the status toggle switch in the DataTable
  // This would typically update the backend and then refresh the local state.
  const handleToggleWalletStatus = (row: TableRow, index: number, active: boolean) => {
    console.log(`Toggling status for wallet ID: ${row.id} to ${active}`);
    // In a real application, you would make an API call here to update the status.
    // For this mock, we'll update the local state directly.
    setWalletData((prevData) =>
      prevData.map((item) =>
        item.id === row.id ? { ...item, isActive: active } : item
      )
    );
    toast.success(`Wallet ${row.asset} status updated to ${active ? "Active" : "Inactive"}`);
  };

  return (
    <div className="text-gray-700 dark:text-gray-300 bg-white dark:bg-[#121212] dark:border dark:border-gray-200 p-1 rounded-lg shadow font-inter min-h-screen">
      {/* The DataTable component for displaying wallet information */}
      <DataTable
        headers={walletHeaders}
        data={walletData}
        searchKey="asset" // Assuming 'asset' is a good search key for wallets
        title="Client Wallets" // This title will trigger specific rendering in DataTable
        parent={`Client Wallets (${walletData.length}) ↻`} // Parent text with dynamic count
        onAddWallet={handleAddWalletClick} // Pass the handler to open the Add Wallet modal
        onToggleActive={handleToggleWalletStatus} // Pass the handler for the toggle switch
      />

      {/* The AddWalletModal, controlled by showAddWalletModal state */}
      <AddWalletModal
        isOpen={showAddWalletModal}
        onClose={() => setShowAddWalletModal(false)}
      />
    </div>
  );
};

export default WalletsTab;
