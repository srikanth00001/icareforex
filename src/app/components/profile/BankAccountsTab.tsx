import React from "react";
import DataTable from "../table/table";

interface TableRow {
  id: string;
  bankName?: string;
  owner?: string;
  swiftCode?: string;
  iban?: string;
  accountNumber?: string;
  currency?: string;
}

interface BankAccountsTabProps {
  bankAccountsData: TableRow[];
  handleAddBankAccount: () => void;
}

const BankAccountsTab: React.FC<BankAccountsTabProps> = ({ bankAccountsData, handleAddBankAccount }) => {
  return (
    <div className="text-gray-700 dark:text-gray-300 bg-white dark:bg-[#121212] dark:border dark:border-gray-200 p-1 rounded-lg shadow">
      <DataTable
        headers={["Bank Name", "Owner", "Swift Code", "IBAN", "Account Number", "Currency"]}
        data={bankAccountsData}
        onAdd={handleAddBankAccount}
        searchKey="bankName"
        title={`Bank Accounts list (${bankAccountsData.length})`}
        parent="Profile • Bank Accounts"
      />
    </div>
  );
};

export default BankAccountsTab;