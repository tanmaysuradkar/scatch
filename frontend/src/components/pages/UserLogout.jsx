import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../../context/UserContext';

export const UserLogout = () => {
  const navigate = useNavigate();
  const { setUserAuth } = useContext(UserDataContext);

  useEffect(() => {
    const logoutUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setUserAuth(null);
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
          setUserAuth(null);
          navigate('/login');
        }
      } catch (error) {
        // 401 just means the token is already blacklisted
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          setUserAuth(null);
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
