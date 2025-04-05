import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/store/slices/authSlice';

export default function AuthInitializer() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const userStr = localStorage.getItem('user');

  //   if (token && userStr) {
  //     try {
  //       const user = JSON.parse(userStr);
  //       dispatch(loginSuccess(user));
  //     } catch (error) {
  //       console.error('Error parsing user data from localStorage:', error);
  //       localStorage.removeItem('token');
  //       localStorage.removeItem('user');
  //     }
  //   }
  // }, [dispatch]);

  return null;
} 