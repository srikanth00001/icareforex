import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./profile/page";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<ProfilePage />}>
          <Route index element={<ProfileTab />} />
          <Route path="bank-accounts" element={<BankAccountsTab />} />
          <Route path="documents" element={<DocumentsTab />} />
          <Route path="trading-accounts" element={<TradingAccountsTab />} />
          <Route path="transactions" element={<TransactionsTab />} />
          <Route path="wallets" element={<WalletsTab />} />
          <Route path="logs" element={<LogsTab />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;