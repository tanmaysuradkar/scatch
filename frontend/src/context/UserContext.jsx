import React, { createContext, useState } from 'react'

export const UserDataContext = createContext()


const UserContext = ({ children }) => {

    const [ userAuth, setUserAuth ] = useState({
        email: '',
        fullName: "",
        _id:""
    })

    return (
        <div>
            <UserDataContext.Provider value={{ userAuth, setUserAuth }}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext