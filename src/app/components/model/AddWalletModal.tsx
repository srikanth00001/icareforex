"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Modal from "./model";

// --- AddWalletModal Component ---
// Modal specifically for adding a new wallet, based on image (29).png.
const AddWalletModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  // State for the selected asset type in the dropdown
  const [assetType, setAssetType] = useState(""); // Default to empty string for "Select..."

  // Handles form submission for adding a new wallet
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetType) {
      toast.error("Please select an asset type.");
      return;
    }
    console.log({ assetType });
    toast.success(`New wallet for ${assetType} added successfully!`);
    onClose(); // Close modal after submission
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add new wallet">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="assetType" className="sr-only">Select Asset Type</label> {/* Hidden label for accessibility */}
          <select
            id="assetType"
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          >
            <option value="" disabled>Select...</option> {/* Placeholder option */}
            <option value="TRX">TRX</option>
            <option value="ETH Crypto Asset">ETH Crypto Asset</option>
            <option value="USDT Crypto Asset">USDT Crypto Asset</option>
            <option value="USD Fiat Asset">USD Fiat Asset</option>
          </select>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Wallet
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddWalletModal;
