import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserInfo, clearUserInfo } from "../../redux/features/userInfo";

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(clearUserInfo());
      return;
    }

    axios.get(
      `${import.meta.env.VITE_backendURL}auth/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      dispatch(setUserInfo(res.data)); // or res.data.userInfo
    })
    .catch(() => {
      localStorage.removeItem("token");
      dispatch(clearUserInfo());
    });
  }, []);

  return children;
};

export default AuthLoader;