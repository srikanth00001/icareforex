"use client";

import React from "react";
import { FaFileAlt } from "react-icons/fa";

const profilePageStyles = {
  formGrid: "grid grid-cols-1 md:grid-cols-2 gap-4",
  formGroup: "mb-4",
  label: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
  input:
    "w-full px-3 py-2 border border-gray-600 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-[#121212] dark:text-gray-100",
  select:
    "w-full px-3 py-2 border border-gray-600 dark:border-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-[#121212] dark:text-gray-100",
};

const DocumentsTab = () => {
  return (
    <div className="text-gray-700 dark:text-gray-300 bg-white dark:bg-[#121212] dark:border dark:border-gray-200 p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Documents</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* KYC Documents Card */}
        <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow">
          <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">
            KYC Documents
          </h4>
          <div className={profilePageStyles.formGrid}>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="proofOfIdFront" className={profilePageStyles.label}>
                Proof of ID - Front Side
              </label>
              <input
                type="file"
                id="proofOfIdFront"
                name="proofOfIdFront"
                className={profilePageStyles.input}
                placeholder="No file chosen"
              />
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="proofOfIdBack" className={profilePageStyles.label}>
                Proof of ID - Back Side
              </label>
              <input
                type="file"
                id="proofOfIdBack"
                name="proofOfIdBack"
                className={profilePageStyles.input}
                placeholder="No file chosen"
              />
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="proofOfAddress" className={profilePageStyles.label}>
                Proof of Address
              </label>
              <input
                type="file"
                id="proofOfAddress"
                name="proofOfAddress"
                className={profilePageStyles.input}
                placeholder="No file chosen"
              />
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
              Reset Form
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Upload
            </button>
          </div>
        </div>

        {/* Other Documents Card */}
        <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow">
          <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">
            Other Documents
          </h4>
          <div className={profilePageStyles.formGrid}>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="agreementFile" className={profilePageStyles.label}>
                Agreement
              </label>
              <input
                type="file"
                id="agreementFile"
                name="agreementFile"
                className={profilePageStyles.input}
                placeholder="No file chosen"
              />
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="sourceOfFundsFile" className={profilePageStyles.label}>
                Source of Funds
              </label>
              <input
                type="file"
                id="sourceOfFundsFile"
                name="sourceOfFundsFile"
                className={profilePageStyles.input}
                placeholder="No file chosen"
              />
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="worldCheckFile" className={profilePageStyles.label}>
                World Check
              </label>
              <input
                type="file"
                id="worldCheckFile"
                name="worldCheckFile"
                className={profilePageStyles.input}
                placeholder="No file chosen"
              />
            </div>
            <div className={profilePageStyles.formGroup}>
              <label htmlFor="additionalDocuments" className={profilePageStyles.label}>
                Additional Documents
              </label>
              <input
                type="file"
                id="additionalDocuments"
                name="additionalDocuments"
                className={profilePageStyles.input}
                placeholder="No file chosen"
              />
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
              Reset Form
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Upload
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 rounded-lg shadow">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                Created Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                Type
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                Files
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2 text-gray-900 dark:text-gray-100">No records</td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-100">No records</td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-100">No records</td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-100">No records</td>
              <td className="px-4 py-2 text-gray-900 dark:text-gray-100">No records</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentsTab;