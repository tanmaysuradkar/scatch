import React, { useContext, useEffect } from 'react'
import { UserDataContext } from "../../context/UserContext";
export const OAuthWrapper = ({children}) => {
    const {setUserAuth} = useContext(UserDataContext)
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_backendURL}auth/user`, { withCredentials: true })
            .then((res) => setUserAuth(res.data))
            .catch(() => setUserAuth(null));
    }, []);

    return (
        <>
        {children}
        </>
    )
}