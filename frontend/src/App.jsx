import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Signi from './components/pages/Signi'
import Login from './components/pages/Login'
import Home from './components/pages/Home'
import ProductCard from './components/pages/ProductCard'
import ProductsSection from './components/pages/ProductsSection'
import MyProductList from './components/pages/MyProductList'
import ContactSection from './components/pages/ContactSection'
import Profile from './components/pages/Profile'
import OwnerProfile from './components/pages/OwenerProfile'
import Verified from './components/pages/isVerify'
import CreateProducts from './components/pages/CreateProduct'
import UserLogout from './components/pages/UserLogout'
import UserProtectWrapper from './components/pages/UserProtectWrapper'
import OAuthWrapper from './components/pages/OAuthWrapper'
import PaymentPage from './components/pages/PaymentPage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<Signi />} />
      <Route path='/login' element={<Login />} />
      <Route path='/logout' element={<UserLogout />} />
      <Route path='/oauth' element={<OAuthWrapper />} />
      <Route path='/payment' element={<PaymentPage />} />

      <Route
        path='/my-account'
        element={
          <UserProtectWrapper>
            <Profile />
          </UserProtectWrapper>
        }
      />

      <Route path='/shop' element={<ProductCard />} />
      <Route path='/owner-dashboard' element={<OwnerProfile />} />
      <Route path='/cart' element={<MyProductList />} />
      <Route path='/product/:productId' element={<ProductsSection />} />
      <Route path='/contact' element={<ContactSection />} />
      <Route path='/create-products' element={<CreateProducts />} />
      <Route path='/verified/:id' element={<Verified />} />
    </Routes>
  )
}

export default App