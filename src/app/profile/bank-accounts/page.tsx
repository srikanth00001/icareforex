"use client";

import Modal from "@/app/components/model/model";
import DataTable from "@/app/components/table/table";
import React, { useState } from "react";
import { FaUniversity } from "react-icons/fa";

interface TableRow {
  id: string;
  bankName?: string;
  owner?: string;
  swiftCode?: string;
  iban?: string;
  accountNumber?: string;
  currency?: string;
}

const profilePageStyles = {
  formGrid: "grid grid-cols-1 md:grid-cols-2 gap-4",
  formGroup: "mb-4",
  label: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
  input:
    "w-full px-3 py-2 border border-gray-600 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-[#121212] dark:text-gray-100",
  select:
    "w-full px-3 py-2 border border-gray-600 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-[#121212] dark:text-gray-100",
};

const BankAccountsTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bankAccountData, setBankAccountData] = useState({
    beneficiaryName: "",
    bankName: "",
    accountNumber: "",
    swiftCode: "",
    address: "",
    iban: "",
    currency: "",
  });

  const [bankAccountsData, setBankAccountsData] = useState<TableRow[]>([
    {
      id: "1",
      bankName: "Bank A",
      owner: "Srikanth M",
      swiftCode: "AAAAUS33",
      iban: "AE1234567890123456",
      accountNumber: "1234567890",
      currency: "AED",
    },
  ]);

  const handleAddBankAccount = () => {
    setIsModalOpen(true);
  };

  const handleModalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankAccountData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleModalSubmit = () => {
    console.log("New bank account added:", bankAccountData);
    setBankAccountsData([
      ...bankAccountsData,
      { ...bankAccountData, id: (bankAccountsData.length + 1).toString() },
    ]);
    setBankAccountData({
      beneficiaryName: "",
      bankName: "",
      accountNumber: "",
      swiftCode: "",
      address: "",
      iban: "",
      currency: "",
    });
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setBankAccountData({
      beneficiaryName: "",
      bankName: "",
      accountNumber: "",
      swiftCode: "",
      address: "",
      iban: "",
      currency: "",
    });
    setIsModalOpen(false);
  };

  return (
    <div className="text-gray-700 dark:text-gray-300 bg-white dark:bg-[#121212] dark:border dark:border-gray-200 p-6 rounded-lg shadow">
      <DataTable
        headers={[
          "Bank Name",
          "Owner",
          "Swift Code",
          "IBAN",
          "Account Number",
          "Currency",
          "Actions",
        ]}
        data={bankAccountsData}
        onAdd={handleAddBankAccount}
        searchKey="bankName"
        title="Bank Accounts"
        parent="Profile • Bank Accounts"
      />

      <Modal isOpen={isModalOpen} onClose={handleModalClose} title="Add new bank account">
        <div className={profilePageStyles.formGrid}>
          <div className={profilePageStyles.formGroup}>
            <label htmlFor="beneficiaryName" className={profilePageStyles.label}>
              Beneficiary Name
            </label>
            <input
              type="text"
              id="beneficiaryName"
              name="beneficiaryName"
              className={profilePageStyles.input}
              value={bankAccountData.beneficiaryName}
              onChange={handleModalInputChange}
              placeholder="Enter Beneficiary Name"
            />
          </div>
          <div className={profilePageStyles.formGroup}>
            <label htmlFor="bankName" className={profilePageStyles.label}>
              Bank name
            </label>
            <input
              type="text"
              id="bankName"
              name="bankName"
              className={profilePageStyles.input}
              value={bankAccountData.bankName}
              onChange={handleModalInputChange}
              placeholder="Enter Bank Name"
            />
          </div>
          <div className={profilePageStyles.formGroup}>
            <label htmlFor="accountNumber" className={profilePageStyles.label}>
              Account number
            </label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              className={profilePageStyles.input}
              value={bankAccountData.accountNumber}
              onChange={handleModalInputChange}
              placeholder="Enter Account Number"
            />
          </div>
          <div className={profilePageStyles.formGroup}>
            <label htmlFor="swiftCode" className={profilePageStyles.label}>
              Swift code
            </label>
            <input
              type="text"
              id="swiftCode"
              name="swiftCode"
              className={profilePageStyles.input}
              value={bankAccountData.swiftCode}
              onChange={handleModalInputChange}
              placeholder="Enter Swift Code"
            />
          </div>
          <div className={profilePageStyles.formGroup}>
            <label htmlFor="address" className={profilePageStyles.label}>
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className={profilePageStyles.input}
              value={bankAccountData.address}
              onChange={handleModalInputChange}
              placeholder="Enter Address"
            />
          </div>
          <div className={profilePageStyles.formGroup}>
            <label htmlFor="iban" className={profilePageStyles.label}>
              IBAN
            </label>
            <input
              type="text"
              id="iban"
              name="iban"
              className={profilePageStyles.input}
              value={bankAccountData.iban}
              onChange={handleModalInputChange}
              placeholder="Enter IBAN"
            />
          </div>
          <div className={profilePageStyles.formGroup}>
            <label htmlFor="currency" className={profilePageStyles.label}>
              Currency
            </label>
            <input
              type="text"
              id="currency"
              name="currency"
              className={profilePageStyles.input}
              value={bankAccountData.currency}
              onChange={handleModalInputChange}
              placeholder="Enter Currency"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleModalClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Close
          </button>
          <button
            onClick={handleModalSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BankAccountsTab;