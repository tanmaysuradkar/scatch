import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import {setUserInfo,clearUserInfo} from '../../redux/features/userInfo'
const OAuthWrapper = () => {
    const userInfo = useSelector((state)=> state.userInformation.value)
    console.log(userInfo);
    const dispatch = useDispatch()
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const setUserAuth = setUserAuth;
    useEffect(()=> {
        axios
            .get(`${import.meta.env.VITE_backendURL}auth/user`, {
                withCredentials: true,
            })
            .then(async (res) => {
                dispatch(setUserAuth( {email:res.data.userInfo.email, fullname: res.data.userInfo.fullname, _id: res.data.userInfo._id}))
                localStorage.removeItem("token");
                console.log("user info:", userAuth);
                localStorage.setItem("token", res.data.token);
                setIsLoading(false);
                console.log("user Auth info", res);
                navigate("/shop");
            })
            .catch(() => {
                dispatch(setUserAuth())
                console.log("OAuth error:", err);
                localStorage.removeItem("token");
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
