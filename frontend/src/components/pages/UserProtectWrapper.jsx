import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectWrapper = ({
    children
}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { userAuth, setUserAuth } = useContext(UserDataContext)
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
        console.log(token,"tanmay My account")
        axios.post(`${import.meta.env.VITE_backendURL}users/profile`,{}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                console.log(response.data.user)
                setUserAuth(response.data.user)
                setIsLoading(false)
                console.log(userAuth)
            }
        }).catch(err => {
                console.log(err)
                localStorage.removeItem('token')
                navigate('/login')
            })
    }, [ token ])

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper