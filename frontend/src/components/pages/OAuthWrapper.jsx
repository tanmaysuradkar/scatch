import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuthWrapper = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const { userAuth, setUserAuth } = useContext(UserDataContext);
    useEffect(()=> {
        axios
            .get(`${import.meta.env.VITE_backendURL}auth/user`, {
                withCredentials: true,
            })
            .then(async (res) => {
                setUserAuth( {email:res.data.userInfo.email, fullname: res.data.userInfo.fullname, _id: res.data.userInfo._id});
                localStorage.removeItem("token");
                console.log("user info:", userAuth);
                localStorage.setItem("token", res.data.token);
                setIsLoading(false);
                console.log("user Auth info", res);
                navigate("/Shop");
            })
            .catch(() => {
                setUserAuth(null);
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
