"use client";

import React, { useState } from "react";
import { FaUser, FaBuildingColumns, FaFileLines, FaChartLine, FaMoneyBillTransfer, FaWallet, FaScroll } from "react-icons/fa6";
import { FaClipboardList, FaExchangeAlt, FaFileAlt, FaUniversity } from "react-icons/fa";
import ClientLayout from "../components/Layout/Layout";
import ProfileTab from "../components/profile/ProfileTab";
import BankAccountsTab from "../components/profile/BankAccountsTab";
import DocumentsTab from "../components/profile/DocumentsTab";
import TradingAccountsTab from "../components/profile/TradingAccountsTab";
import TransactionsTab from "../components/profile/TransactionsTab";
import WalletsTab from "../components/profile/WalletsTab";
import LogsTab from "../components/profile/LogsTab";
import Modal from "../components/model/model";

interface ProfileFormData {
  title: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  dob: string;
  nationality: string;
  country: string;
  city: string;
  address: string;
  address2: string;
  postalCode: string;
  language: string;
  source: string;
  gender: string;
  usCitizen: string;
  taxId: string;
  politicallyExposed: string;
  idType: string;
  countryOfIssue: string;
  idNumber: string;
  dateOfIssue: string;
  dateOfExpiry: string;
  employmentStatus: string;
  industry: string;
  jobIndustry: string;
  employer: string;
  annualIncome: string;
  sourceOfFunds: string;
  workedInFinancial: string;
  consent: boolean;
}

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
  container: "p-6 bg-gray-50 dark:bg-black min-h-screen",
  header: "bg-white dark:bg-[#121212] dark:border dark:border-gray-200 shadow rounded-lg p-6 mb-6",
  clientInfoGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm",
  clientInfoItem: "flex items-center",
  clientInfoLabel: "font-semibold text-gray-600 dark:text-gray-400 mr-2",
  clientInfoValue: "text-gray-800 dark:text-gray-200",
  tabsContainer: "bg-white dark:bg-[#121212] dark:border dark:border-gray-200 shadow rounded-lg mb-6",
  tabList: "flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto",
  tabButton: (isActive: boolean) =>
    `py-3 px-6 text-sm font-medium focus:outline-none transition-colors duration-200 whitespace-nowrap
    ${isActive
      ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
      : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
    }`,
  tabContent: "p-6",
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState<ProfileFormData>({
    title: "",
    firstName: "Srikanth",
    lastName: "M",
    mobile: "+971564931164",
    email: "srikanth@gmail.com",
    dob: "",
    nationality: "",
    country: "United Arab Emirates",
    city: "Enter City",
    address: "Address",
    address2: "Address Line 2",
    postalCode: "Postal Code",
    language: "English",
    source: "FOREX_LIVE",
    gender: "",
    usCitizen: "",
    taxId: "",
    politicallyExposed: "",
    idType: "",
    countryOfIssue: "",
    idNumber: "",
    dateOfIssue: "",
    dateOfExpiry: "",
    employmentStatus: "",
    industry: "",
    jobIndustry: "",
    employer: "",
    annualIncome: "",
    sourceOfFunds: "",
    workedInFinancial: "",
    consent: false,
  });
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
    { id: "1", bankName: "Bank A", owner: "Srikanth M", swiftCode: "AAAAUS33", iban: "AE1234567890123456", accountNumber: "1234567890", currency: "AED" },
  ]);

  const clientInfo = {
    id: "10124",
    name: "Srikanth M",
    relation: "Master",
    createdOn: "2023-06-15",
    status: "Active",
    category: "Individual",
    kycStatus: "Pending",
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = (section: string) => {
    console.log(`Updating ${section} with data:`, formData);
    alert("Profile update initiated (check console for data)");
  };

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
    setBankAccountsData([...bankAccountsData, { ...bankAccountData, id: (bankAccountsData.length + 1).toString() }]);
    setBankAccountData({ beneficiaryName: "", bankName: "", accountNumber: "", swiftCode: "", address: "", iban: "", currency: "" });
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setBankAccountData({ beneficiaryName: "", bankName: "", accountNumber: "", swiftCode: "", address: "", iban: "", currency: "" });
    setIsModalOpen(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab formData={formData} handleInputChange={handleInputChange} handleUpdate={handleUpdate} />;
      case "bankAccounts":
        return <BankAccountsTab bankAccountsData={bankAccountsData} handleAddBankAccount={handleAddBankAccount} />;
      case "documents":
        return <DocumentsTab />;
      case "tradingAccounts":
        return <TradingAccountsTab />;
      case "transactions":
        return <TransactionsTab />;
      case "wallets":
        return <WalletsTab />;
      case "logs":
        return <LogsTab />;
      default:
        return null;
    }
  };

  return (
    <ClientLayout>
      <div className={profilePageStyles.container}>
        <div className={profilePageStyles.header}>
          <div className={profilePageStyles.clientInfoGrid}>
            <div className={profilePageStyles.clientInfoItem}>
              <span className={profilePageStyles.clientInfoLabel}>ID:</span>
              <span className={profilePageStyles.clientInfoValue}>{clientInfo.id}</span>
            </div>
            <div className={profilePageStyles.clientInfoItem}>
              <span className={profilePageStyles.clientInfoLabel}>Name:</span>
              <span className={profilePageStyles.clientInfoValue}>{clientInfo.name}</span>
            </div>
            <div className={profilePageStyles.clientInfoItem}>
              <span className={profilePageStyles.clientInfoLabel}>Relation:</span>
              <span className={profilePageStyles.clientInfoValue}>{clientInfo.relation}</span>
            </div>
            <div className={profilePageStyles.clientInfoItem}>
              <span className={profilePageStyles.clientInfoLabel}>Created on:</span>
              <span className={clientInfo.createdOn === "2023-06-15" ? "text-blue-500 font-medium" : profilePageStyles.clientInfoValue}>{clientInfo.createdOn}</span>
            </div>
            <div className={profilePageStyles.clientInfoItem}>
              <span className={profilePageStyles.clientInfoLabel}>Status:</span>
              <span className={clientInfo.status === "Active" ? "text-green-500 font-medium" : profilePageStyles.clientInfoValue}>{clientInfo.status}</span>
            </div>
            <div className={profilePageStyles.clientInfoItem}>
              <span className={profilePageStyles.clientInfoLabel}>Category:</span>
              <span className={profilePageStyles.clientInfoValue}>{clientInfo.category}</span>
            </div>
            <div className={profilePageStyles.clientInfoItem}>
              <span className={profilePageStyles.clientInfoLabel}>KYC Status:</span>
              <span className={clientInfo.kycStatus === "Pending" ? "text-red-500 font-medium" : profilePageStyles.clientInfoValue}>{clientInfo.kycStatus}</span>
            </div>
          </div>
        </div>

        <div className={profilePageStyles.tabsContainer}>
          <div className={profilePageStyles.tabList}>
            <button className={profilePageStyles.tabButton(activeTab === "profile")} onClick={() => setActiveTab("profile")}>
              <FaUser className="inline mr-2" /> Profile
            </button>
            <button className={profilePageStyles.tabButton(activeTab === "bankAccounts")} onClick={() => setActiveTab("bankAccounts")}>
              <FaUniversity className="inline mr-2" /> Bank Accounts
            </button>
            <button className={profilePageStyles.tabButton(activeTab === "documents")} onClick={() => setActiveTab("documents")}>
              <FaFileAlt className="inline mr-2" /> Documents
            </button>
            <button className={profilePageStyles.tabButton(activeTab === "tradingAccounts")} onClick={() => setActiveTab("tradingAccounts")}>
              <FaChartLine className="inline mr-2" /> Trading Accounts
            </button>
            <button className={profilePageStyles.tabButton(activeTab === "transactions")} onClick={() => setActiveTab("transactions")}>
              <FaExchangeAlt className="inline mr-2" /> Transactions
            </button>
            <button className={profilePageStyles.tabButton(activeTab === "wallets")} onClick={() => setActiveTab("wallets")}>
              <FaWallet className="inline mr-2" /> Wallets
            </button>
            <button className={profilePageStyles.tabButton(activeTab === "logs")} onClick={() => setActiveTab("logs")}>
              <FaClipboardList className="inline mr-2" /> Logs
            </button>
          </div>

          <div className={profilePageStyles.tabContent}>
            {renderTabContent()}
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          title="Add new bank account"
        >
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
    </ClientLayout>
  );
};

export default ProfilePage;