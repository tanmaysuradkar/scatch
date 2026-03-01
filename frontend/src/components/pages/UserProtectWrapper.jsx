import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import {setUserInfo,clearUserInfo} from '../../redux/features/userInfo'
const UserProtectWrapper = ({
    children
}) => {
    const userAuth = useSelector((state)=> state.userInformation.value)
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [ isLoading, setIsLoading ] = useState(true)
    const setUserAuth = setUserAuth;

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
                dispatch(setUserAuth(response.data.user))
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