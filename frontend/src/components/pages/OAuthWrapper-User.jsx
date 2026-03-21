import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setUserInfo, clearUserInfo } from '../../redux/features/userInfo';

const OAuthWrapper = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (!token) {
            navigate("/login");
            return;
        }

        localStorage.setItem("token", token);

        axios.get(`${import.meta.env.VITE_backendURL}auth/user`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
        })
        .then(res => {
            dispatch(setUserInfo(res.data?.userInfo));
            window.history.replaceState({}, document.title, "/oauth");
            navigate("/shop");
        })
        .catch(() => {
            localStorage.removeItem("token");
            dispatch(clearUserInfo());
            navigate("/login");
        })
        .finally(() => setIsLoading(false));
    }, [dispatch, navigate]);

    if (isLoading) return <div>Loading...</div>;

    return <div>Redirecting...</div>;
};

export default OAuthWrapper;