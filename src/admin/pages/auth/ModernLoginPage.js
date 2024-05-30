import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ModernLoginView from '../../sections/auth/ModernLoginView';

// ----------------------------------------------------------------------

export default function ModernLoginPage() {
  useEffect(() => {
    console.log('LoginModernPage loaded');
  }, []);

  return (
    <>
      <Helmet>
        <title> Auth Classic: Login</title>
      </Helmet>
      <ModernLoginView />
    </>
  );
}
