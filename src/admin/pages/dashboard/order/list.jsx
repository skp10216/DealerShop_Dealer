import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { OrderListView } from 'admin/sections/order/view';

// ----------------------------------------------------------------------

export default function OrderListPage() {
  useEffect(() => {
    console.log('OrderListPage loaded');
  }, []);

  return (    
    <>
      <Helmet>
        <title> Dashboard: Order List</title>
      </Helmet>

      <OrderListView />
    </>
  );
}
