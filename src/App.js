import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import LoginPage from './LoginPage';
import MainPage from './DealerShopMainPage';
import DealerShopListPage from './DealerShopListPage';
import DealerShopCreatePage from './DealerShopCreatePage';
import DealerShopUpdatePage from './DealerShopUpdatePage';
import DealerShopPurchaseList from './DealerShopPurchaseList';
import DealerShopPurchaseTargetList from './DealerShopPurchaseTargetList';
import EnterIMEI from './EnterIMEI';
import EnterPhoneInfo from './EnterPhoneInfo';
import EnterInspection from './EnterInspection';
import EnterPrice from './EnterPrice';
import PurchaseConfirm from './PurchaseConfirm';
import PurchaseList from './PurchaseList';

const App = () => {
  return (
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
          path="/DealerShopUpdatePage/:dealerShopId"
          element={<DealerShopUpdatePage />}
        />
        <Route
          path="/DealerShopPurchaseList"
          element={<DealerShopPurchaseList />}
        />
        <Route
          path="/DealerShopPurchaseTargetList"
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
  );
};

export default App;
