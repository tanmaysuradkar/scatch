import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserInfo, clearUserInfo } from "../../redux/features/userInfo";
import { setOwnerInfo,clearOwnerInfo } from "../../redux/features/ownerInfo";

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const userToken = localStorage.getItem("token");
    const ownerToken = localStorage.getItem("ownerToken"); // or whatever key you use

    // If no tokens exist, clear user info
    if (!userToken && !ownerToken) {
      dispatch(clearUserInfo());
      return;
    }

    // Check user token
    if (userToken) {
      axios
        .get(
          `${import.meta.env.VITE_backendURL}auth/user`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((res) => {
          dispatch(setUserInfo(res.data?.userInfo));
        })
        .catch((error) => {
          console.error("User auth error:", error);
          localStorage.removeItem("token");
          dispatch(clearUserInfo());
        });
      return; // Exit if user token exists
    }

    // Check owner token
    if (ownerToken) {
      axios
        .get(
          `${import.meta.env.VITE_backendURL}auth/owner`, 
          {
            headers: {
              Authorization: `Bearer ${ownerToken}`,
            },
          }
        )
        .then((res) => {
          dispatch(setOwnerInfo(res.data?.Owner));
        })
        .catch((error) => {
          console.log("Owner auth error:", error);
          localStorage.removeItem("ownerToken");
          dispatch(clearOwnerInfo());
        });
    }
  }, [dispatch]);

  return children;
};

export default AuthLoader;