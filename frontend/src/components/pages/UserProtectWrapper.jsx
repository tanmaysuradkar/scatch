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
    const setUserAuth = setUserInfo;
    const Sk = ({ w = '100%', h = '14px', r = '6px', style = {} }) => (
  <div style={{
    width: w, height: h, borderRadius: r,
    background: 'linear-gradient(90deg, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%)',
    backgroundSize: '600px 100%',
    animation: 'shimmer 1.6s infinite linear',
    ...style
  }} />
);

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
        console.log(token,"token of Account")
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
             <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position:  600px 0; }
        }
      `}</style>

      <div style={{ display: 'flex', border: '1px solid #eee',
        borderRadius: 12, overflow: 'hidden', minHeight: 560 }}>

        {/* Sidebar */}
        <div style={{ width: 200, background: '#f7f7f7', padding: '24px 16px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <Sk w="72px" h="72px" r="50%" />
          <Sk w="140px" h="32px" r="20px" />
          <Sk w="160px" h="40px" />
          <Sk w="160px" h="40px" />
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '32px 40px' }}>
          <Sk w="160px" h="22px" style={{ marginBottom: 8 }} />
          <Sk w="120px" h="14px" style={{ marginBottom: 28 }} />

          <div style={{ border: '1px solid #eee', borderRadius: 10, padding: 28 }}>

            {/* Row 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 20 }}>
              <div>
                <Sk w="80px" h="12px" style={{ marginBottom: 10 }} />
                <Sk h="40px" />
              </div>
              <div>
                <Sk w="50px" h="12px" style={{ marginBottom: 10 }} />
                <Sk h="40px" />
              </div>
            </div>

            {/* Address */}
            <div style={{ marginBottom: 20 }}>
              <Sk w="60px" h="12px" style={{ marginBottom: 10 }} />
              <Sk h="80px" />
            </div>

            {/* Row 3 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginBottom: 28 }}>
              <div>
                <Sk w="60px" h="12px" style={{ marginBottom: 10 }} />
                <Sk h="40px" />
              </div>
              <div>
                <Sk w="90px" h="12px" style={{ marginBottom: 10 }} />
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 10 }}>
                  <Sk w="14px" h="14px" r="50%" />
                  <Sk w="36px" h="12px" />
                  <Sk w="14px" h="14px" r="50%" />
                  <Sk w="36px" h="12px" />
                </div>
              </div>
              <div>
                <Sk w="70px" h="12px" style={{ marginBottom: 10 }} />
                <Sk h="40px" />
              </div>
            </div>

            {/* Contact section */}
            <Sk w="140px" h="16px" style={{ margin: '0 auto 20px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>
              <div>
                <Sk w="100px" h="12px" style={{ marginBottom: 10 }} />
                <Sk h="40px" />
              </div>
              <div>
                <Sk w="50px" h="12px" style={{ marginBottom: 10 }} />
                <Sk h="40px" />
              </div>
            </div>

            {/* Edit button */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Sk w="100px" h="40px" r="8px" />
            </div>
          </div>
        </div>
      </div>
    </>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper