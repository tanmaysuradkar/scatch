import { configureStore } from '@reduxjs/toolkit'
import userInfo from './features/userInfo'
import ownerInfo from './features/ownerInfo'
export const store = configureStore({
    reducer:{
        ownerInformation:ownerInfo,
        userInformation:userInfo
    }
})