import { configureStore } from '@reduxjs/toolkit'
import userInfo from './features/userInfo'
export const store = configureStore({
    reducer:{
        userInformation:userInfo
    }
})