import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo, clearUserInfo } from '../../redux/features/userInfo'
export const UserLogout = () => {
  const navigate = useNavigate();
  const userAuth = useSelector((state) => state.userInformation.value)
  const setUserAuth = setUserAuth;
  const dispatch = useDispatch()

  useEffect(() => {
    const logoutUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        dispatch(clearUserInfo());
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_backendURL}users/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          localStorage.removeItem('token');
          dispatch(clearUserInfo());
          navigate('/login');
        }
      } catch (error) {
        // 401 just means the token is already blacklisted
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          dispatch(clearUserInfo());
          navigate('/login');
        } else {
          console.error('Logout error:', error);
        }
      }
    };

    logoutUser();
  }, []); // <-- run once when mounted

  return <div>Logging out...</div>;
};

export default UserLogout;
