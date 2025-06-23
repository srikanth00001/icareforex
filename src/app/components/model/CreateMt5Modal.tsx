"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Modal from "./model";


// --- CreateMt5Modal Component ---
// Modal specifically for creating an MT5 account, based on image (22).png.
const CreateMt5Modal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  // State for form fields
  const [type, setType] = useState("LIVE");
  const [accountType, setAccountType] = useState("Executive MT5");
  const [accountCurrency, setAccountCurrency] = useState("USD");
  const [leverage, setLeverage] = useState("1:100"); // Default leverage

  // Handles form submission for creating an MT5 account
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ type, accountType, accountCurrency, leverage });
    toast.success("MT5 Account Created Successfully!"); // Display success toast
    onClose(); // Close modal after submission
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create MT5 Account">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type (LIVE/DEMO) Radio Buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="type"
                value="LIVE"
                checked={type === "LIVE"}
                onChange={(e) => setType(e.target.value)}
                className="form-radio h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">LIVE</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="type"
                value="DEMO"
                checked={type === "DEMO"}
                onChange={(e) => setType(e.target.value)}
                className="form-radio h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">DEMO</span>
            </label>
          </div>
        </div>

        {/* Account Type Radio Buttons (Grid Layout) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Type</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              "Executive MT5",
              "Standard",
              "Premium",
              "Pro",
              "real\\A\\gold",
              "real\\USD",
              "GOLD"
            ].map((accType) => (
              <label key={accType} className="inline-flex items-center py-2 px-3 border border-gray-300 dark:border-gray-700 rounded-md cursor-pointer transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                <input
                  type="radio"
                  name="accountType"
                  value={accType}
                  checked={accountType === accType}
                  onChange={(e) => setAccountType(e.target.value)}
                  className="form-radio h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">{accType.replace(/\\A\\/g, 'A/').replace(/\\/g, '')}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Account Currency Radio Buttons */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Currency</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center py-2 px-3 border border-gray-300 dark:border-gray-700 rounded-md cursor-pointer transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              <input
                type="radio"
                name="accountCurrency"
                value="USD"
                checked={accountCurrency === "USD"}
                onChange={(e) => setAccountCurrency(e.target.value)}
                className="form-radio h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">USD</span>
            </label>
          </div>
        </div>

        {/* Select Leverage Dropdown */}
        <div>
          <label htmlFor="leverage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Leverage</label>
          <select
            id="leverage"
            value={leverage}
            onChange={(e) => setLeverage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="1:100">1:100</option>
            <option value="1:200">1:200</option>
            <option value="1:500">1:500</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateMt5Modal;
