import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo, clearUserInfo } from '../../redux/features/userInfo'
const OAuthWrapper = () => {
    const userAuth = useSelector((state) => state.userInformation.value)

    const dispatch = useDispatch()
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        console.log("Token :- ", token)
        if (!token) {
            navigate("/login");
            return;
        }

        localStorage.setItem("token", token);

        axios.get(
            `${import.meta.env.VITE_backendURL}auth/user`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((res) => {
                console.log("RES User Info  ", res)
                dispatch(setUserInfo(res.data.userInfo));
                navigate("/shop");
            })
            .catch(() => {
                localStorage.removeItem("token");
                dispatch(clearUserInfo());
                navigate("/login");
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>Not Working Sorry........</div>
        </>
    );
};

export default OAuthWrapper;
