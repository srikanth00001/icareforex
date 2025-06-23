// components/TransactionModal.tsx
"use client";

import React, { useState, FormEvent } from "react";
import { FaTimes } from "react-icons/fa";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Record<string, any>) => void;
  initialValues?: Record<string, any>;
  title: string;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues = {},
  title,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({
    transaction_type: initialValues.transaction_type || "debit",
    transaction_amount: initialValues.transaction_amount || "",
    log: initialValues.log || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} aria-label="Close">
            <FaTimes className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Transaction Type
            </label>
            <select
              name="transaction_type"
              value={formData.transaction_type}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Transaction Amount
            </label>
            <input
              type="number"
              name="transaction_amount"
              value={formData.transaction_amount}
              onChange={handleChange}
              placeholder="Enter amount (e.g., 100.00)"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Notes
            </label>
            <textarea
              name="log"
              value={formData.log}
              onChange={handleChange}
              placeholder="Enter transaction notes"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-gray-900 dark:text-gray-100 font-medium bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 transition-colors"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;