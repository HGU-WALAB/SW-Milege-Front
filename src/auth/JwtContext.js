import PropTypes from 'prop-types';
import { createContext, useReducer, useCallback, useMemo, useEffect } from 'react';
// utils
import axiosInstance from 'src/utils/axios';
//
import { getSession, setSession } from './utils';
import { useRouter } from 'next/router';
import { DOMAIN } from 'src/components/common/Appbar/MileageHeader';

const initialState = {
  isLogined: false,
  isInitialized: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLogined: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLogined: false,
      };
    case 'SET_INITIALIZED':
      return {
        ...state,
        isInitialized: true,
      };
    default:
      return state;
  }
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  const { push, pathname } = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  // LOGIN
  const login = useCallback(async (loginData) => {
    const response = await axiosInstance.post('/api/admin/login', loginData);
    const { token } = response.data;

    setSession(token);

    await dispatch({
      type: 'LOGIN',
    });
    push(`${DOMAIN}/`);
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
    push(`${DOMAIN}/auth/login`);
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const isLogined = getSession();

      alert('!!');
      if (isLogined) {
        dispatch({ type: 'LOGIN' });
      }
      dispatch({ type: 'SET_INITIALIZED' });
    };

    checkAuthStatus();
  }, [pathname, push, dispatch]);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isLogined: state.isLogined,
      user: state.user,
      method: 'jwt',
      login,
      logout,
    }),
    [state.isLogined, state.isInitialized, state.user, login, logout]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
