import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// components
import LoadingScreen from '../components/loading-screen';
//
import Login from '../pages/auth/login';
import { useAuthContext } from './useAuthContext';
import MainLayout from '../layouts/main/MainLayout';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  // const { isLogined, isInitialized } = useAuthContext();
  // const { pathname, push } = useRouter();
  // const [requestedLocation, setRequestedLocation] = useState(null);

  // useEffect(() => {
  //   if (isInitialized && !isLogined && pathname !== '/auth/login') {
  //     push('/auth/login');
  //   }
  // }, [isInitialized, isLogined, pathname, push]);

  // if (!isInitialized) {
  //   return <LoadingScreen />;
  // }
  // if (!isLogined) {
  //   if (pathname === '/auth/login') {
  //     return <Login />;
  //   }
  //   return <LoadingScreen />;
  // }

  // if (!isLogined) {
  //   if (pathname !== requestedLocation) {
  //     setRequestedLocation(pathname);
  //   }
  //   return <Login />;
  // }

  return <> {children} </>;
}
