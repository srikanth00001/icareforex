import React from "react";

const documentsTabStyles = {
  formGrid: "grid grid-cols-1 md:grid-cols-2 gap-4",
  formGroup: "mb-4",
  label: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1",
};

const DocumentsTab: React.FC = () => {
  return (
    <div className="text-gray-700 dark:text-gray-300 bg-white dark:bg-[#121212] dark:border dark:border-gray-200 p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Documents</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow">
          <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">KYC Documents</h4>
          <div className={documentsTabStyles.formGrid}>
            <div className={documentsTabStyles.formGroup}>
              <label htmlFor="proofOfIdFront" className={documentsTabStyles.label}>
                Proof of ID - Front Side
              </label>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                <label
                  htmlFor="proofOfIdFront"
                  className="cursor-pointer bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-l-md font-medium"
                >
                  Choose File
                </label>
                <input
                  type="file"
                  id="proofOfIdFront"
                  name="proofOfIdFront"
                  className="hidden"
                />
                <span className="flex-grow px-3 py-2 text-gray-500 dark:text-gray-400">
                  No file chosen
                </span>
              </div>
            </div>
            <div className={documentsTabStyles.formGroup}>
              <label htmlFor="proofOfIdBack" className={documentsTabStyles.label}>
                Proof of ID - Back Side
              </label>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                <label
                  htmlFor="proofOfIdBack"
                  className="cursor-pointer bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-l-md font-medium"
                >
                  Choose File
                </label>
                <input
                  type="file"
                  id="proofOfIdBack"
                  name="proofOfIdBack"
                  className="hidden"
                />
                <span className="flex-grow px-3 py-2 text-gray-500 dark:text-gray-400">
                  No file chosen
                </span>
              </div>
            </div>
            <div className={documentsTabStyles.formGroup}>
              <label htmlFor="proofOfAddress" className={documentsTabStyles.label}>
                Proof of Address
              </label>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                <label
                  htmlFor="proofOfAddress"
                  className="cursor-pointer bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-l-md font-medium"
                >
                  Choose File
                </label>
                <input
                  type="file"
                  id="proofOfAddress"
                  name="proofOfAddress"
                  className="hidden"
                />
                <span className="flex-grow px-3 py-2 text-gray-500 dark:text-gray-400">
                  No file chosen
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-4">
            <button className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
              Reset Form
            </button>
            <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Upload
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-[#121212] border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow">
          <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">Other Documents</h4>
          <div className={documentsTabStyles.formGrid}>
            <div className={documentsTabStyles.formGroup}>
              <label htmlFor="agreementFile" className={documentsTabStyles.label}>
                Agreement
              </label>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                <label
                  htmlFor="agreementFile"
                  className="cursor-pointer bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-l-md font-medium"
                >
                  Choose File
                </label>
                <input
                  type="file"
                  id="agreementFile"
                  name="agreementFile"
                  className="hidden"
                />
                <span className="flex-grow px-3 py-2 text-gray-500 dark:text-gray-400">
                  No file chosen
                </span>
              </div>
            </div>
            <div className={documentsTabStyles.formGroup}>
              <label htmlFor="sourceOfFundsFile" className={documentsTabStyles.label}>
                Source of Funds
              </label>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                <label
                  htmlFor="sourceOfFundsFile"
                  className="cursor-pointer bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-l-md font-medium"
                >
                  Choose File
                </label>
                <input
                  type="file"
                  id="sourceOfFundsFile"
                  name="sourceOfFundsFile"
                  className="hidden"
                />
                <span className="flex-grow px-3 py-2 text-gray-500 dark:text-gray-400">
                  No file chosen
                </span>
              </div>
            </div>
            <div className={documentsTabStyles.formGroup}>
              <label htmlFor="worldCheckFile" className={documentsTabStyles.label}>
                World Check
              </label>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                <label
                  htmlFor="worldCheckFile"
                  className="cursor-pointer bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-l-md font-medium"
                >
                  Choose File
                </label>
                <input
                  type="file"
                  id="worldCheckFile"
                  name="worldCheckFile"
                  className="hidden"
                />
                <span className="flex-grow px-3 py-2 text-gray-500 dark:text-gray-400">
                  No file chosen
                </span>
              </div>
            </div>
            <div className={documentsTabStyles.formGroup}>
              <label htmlFor="additionalDocuments" className={documentsTabStyles.label}>
                Additional Documents
              </label>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                <label
                  htmlFor="additionalDocuments"
                  className="cursor-pointer bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-l-md font-medium"
                >
                  Choose File
                </label>
                <input
                  type="file"
                  id="additionalDocuments"
                  name="additionalDocuments"
                  className="hidden"
                />
                <span className="flex-grow px-3 py-2 text-gray-500 dark:text-gray-400">
                  No file chosen
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-4">
            <button className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
              Reset Form
            </button>
            <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Upload
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 rounded-lg shadow">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Created Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Type</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Files</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Action</th>
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