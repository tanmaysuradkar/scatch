import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setOwnerInfo,clearOwnerInfo } from '../../redux/features/ownerInfo';

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

        axios.get(`${import.meta.env.VITE_backendURL}auth/owner`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
        })
        .then(res => {
            dispatch(setOwnerInfo(res.data.ownerInfo || res.data));
            navigate("/owner-dashboard");
        })
        .catch(() => {
            localStorage.removeItem("token");
            dispatch(clearownerInfo());
            navigate("/login");
        })
        .finally(() => setIsLoading(false));

        // Remove token from URL
        window.history.replaceState({}, document.title, "/oauth");
    }, []);

    if (isLoading) return <div>Loading...</div>;

    return <div>Redirecting...</div>;
};

export default OAuthWrapper;