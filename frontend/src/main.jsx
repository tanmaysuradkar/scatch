import React ,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import UserContext from './context/UserContext'
createRoot(document.getElementById('root')).render(
  <UserContext key="static">
  {/* <StrictMode> */}
    <BrowserRouter>
    <App />
    </BrowserRouter>
  {/* </StrictMode> */}
  </UserContext>,
)