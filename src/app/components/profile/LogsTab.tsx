"use client";
import React from "react";
import DataTable, { TableRow } from "../table/table";

// --- LogsTab Component ---
// This component displays the "Individual Stage" progress tracker and an "Activities" table.
const LogsTab: React.FC = () => {
  // Mock data for the Activities table
  const activitiesData: TableRow[] = [
    {
      id: "13234",
      triggeredBy: "I care FX admin",
      logLevel: "INFO",
      logType: "CHANGE_DOC_STATUS",
      dateCreated: "16/06/2023 05:12 PM +0530",
      message: "ADDRESS document has been APPROVED",
    },
    {
      id: "13231",
      triggeredBy: "I care FX admin",
      logLevel: "INFO",
      logType: "CHANGE_DOC_STATUS",
      dateCreated: "16/06/2023 05:12 PM +0530",
      message: "ID document has been APPROVED",
    },
    {
      id: "13229",
      triggeredBy: "I care FX admin",
      logLevel: "INFO",
      logType: "UPLOAD_DOCS",
      dateCreated: "16/06/2023 15:11 PM +0530",
      message: "ADDRESS document(s) has been uploaded",
    },
    {
      id: "13227",
      triggeredBy: "I care FX admin",
      logLevel: "INFO",
      logType: "UPLOAD_DOCS",
      dateCreated: "16/06/2023 15:11 PM +0530",
      message: "ID document(s) has been uploaded",
    },
    {
      id: "13220",
      triggeredBy: "Inego Lancy",
      logLevel: "INFO",
      logType: "LOGIN",
      dateCreated: "16/06/2023 12:46 PM +0530",
      message: "Inego Lancy has logged in from ###.127.0.0.1",
    },
    {
      id: "13217",
      triggeredBy: "Inego Lancy",
      logLevel: "INFO",
      logType: "REGISTER",
      dateCreated: "16/06/2023 12:46 PM +0530",
      message: "Inego Lancy has registered from FOREX_LIVE from SP undefined",
    },
  ];

  // Headers for the Activities table
  const activitiesHeaders = [
    "ID",
    "Triggered by",
    "Log Level",
    "Log Type",
    "Date Created",
    "Message",
  ];

  // Helper component for rendering individual stage items
  const StageItem: React.FC<{ label: string; completed: boolean }> = ({ label, completed }) => (
    <div className="flex flex-col items-center flex-1 min-w-[80px] sm:min-w-[100px]">
      <div
        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
          completed
            ? "bg-green-500 text-white"
            : "bg-red-600 text-white"
        }`}
      >
        {/* Checkmark icon for completed, or red cross for incomplete */}
        {completed ? (
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        ) : (
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6L18 18"></path>
          </svg>
        )}
      </div>
      <p className="mt-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 text-center">{label}</p>
    </div>
  );

  return (
    <div className="bg-gray-100 dark:bg-black min-h-screen font-inter px-4 sm:px-6 lg:px-8 py-6 border rounded">
      {/* Individual Stage Section */}
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow p-4 sm:p-6 mb-6 sm:mb-8 max-w-full overflow-hidden">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Individual Stage
        </h3>
        <div className="relative">
          {/* Horizontal connecting line, hidden on small screens */}
          <div className="absolute left-0 right-0 h-0.5 bg-gray-300 dark:bg-gray-700 mx-6 sm:mx-8 top-3 sm:top-4 z-0 hidden sm:block"></div>

          {/* Stages */}
          <div className="flex flex-col sm:flex-row justify-between w-full relative z-10 gap-4 sm:gap-0">
            <StageItem label="Submit Profile" completed={true} />
            <StageItem label="KYC Uploaded" completed={true} />
            <StageItem label="KYC Rejected" completed={false} />
            <StageItem label="KYC Approved" completed={true} />
            <StageItem label="Deposit" completed={false} />
            <StageItem label="Start Trading" completed={false} />
          </div>
        </div>
      </div>

      {/* Activities Section (using DataTable) */}
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow p-4 sm:p-6 max-w-full overflow-x-auto">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Activities</h3>
        <DataTable
          headers={activitiesHeaders}
          data={activitiesData}
          searchKey="message"
          title="Activities"
          parent="Records"
        />
      </div>
    </div>
  );
};

export default LogsTab;