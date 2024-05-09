import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/DealerShopMainPage';
import DealerShopListPage from './pages/DealerShopListPage';
import DealerShopCreatePage from './pages/DealerShopCreatePage';
import DealerShopUpdatePage from './pages/DealerShopUpdatePage';
import DealerShopPurchaseList from './pages/DealerShopPurchaseList';
import DealerShopPurchaseTargetList from './pages/DealerShopPurchaseTargetList';
import EnterIMEI from './pages/EnterIMEI';
import EnterPhoneInfo from './pages/EnterPhoneInfo';
import EnterInspection from './pages/EnterInspection';
import EnterPrice from './pages/EnterPrice';
import PurchaseConfirm from './pages/PurchaseConfirm';
import PurchaseList from './pages/PurchaseList';
import { DataProvider } from './contexts/PurchaseDataContext';
import { AuthProvider} from './contexts/AuthContext'

const App = () => {
  return (
    <AuthProvider>
    <DataProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/DealerShopListPage" element={<DealerShopListPage />} />
        <Route
          path="/DealerShopCreatePage"
          element={<DealerShopCreatePage />}
        />
        <Route
          path="/DealerShopUpdatePage/:shop_id"
          element={<DealerShopUpdatePage />}
        />
        <Route
          path="/DealerShopPurchaseList"
          element={<DealerShopPurchaseList />}
        />
        <Route
          path="/DealerShopPurchaseTargetList/:shopID/:shopName"
          element={<DealerShopPurchaseTargetList />}
        />
        <Route path="/EnterIMEI" element={<EnterIMEI />} />
        <Route path="/EnterPhoneInfo" element={<EnterPhoneInfo />} />
        <Route path="/EnterInspection" element={<EnterInspection />} />
        <Route path="/EnterPrice" element={<EnterPrice />} />
        <Route path="/PurchaseConfirm" element={<PurchaseConfirm />} />
        <Route path="/PurchaseList" element={<PurchaseList />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    </DataProvider>
    </AuthProvider>
  );
};

export default App;
