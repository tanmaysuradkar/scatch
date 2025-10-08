import React, { createContext, useState, useEffect } from 'react'

export const UserDataContext = createContext()


const UserContext = ({ children }) => {

    const [userAuth, setUserAuth] = useState({ email: "", fullname: "", _id: "" })
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) setUserAuth(user);
    }, []);
    return (
            <UserDataContext.Provider value={{ userAuth, setUserAuth }}>
                {children}
            </UserDataContext.Provider>
    )
}

export default UserContext