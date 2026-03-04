import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import {setOwnerInfo,clearOwnerInfo} from '../../redux/features/ownerInfo'
const OwnerProtectWrapper = ({
    children
}) => {
    const OwnerAuth = useSelector((state)=> state.ownerInformation.value)
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [ isLoading, setIsLoading ] = useState(true)
    const setOwner = setOwnerInfo;

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
        console.log(token,"token of Account")
        axios.post(`${import.meta.env.VITE_backendURL}owner/profile`,{}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                console.log(response.data.Owner)
                dispatch(setOwner(response.data.Owner))
                setIsLoading(false)
                console.log(OwnerAuth)
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

export default OwnerProtectWrapper