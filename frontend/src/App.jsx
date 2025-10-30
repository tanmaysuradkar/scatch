import './App.css'
import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Signi from './components/pages/Signi'
import Login from './components/pages/Login'
import Home from './components/pages/Home'
import ProductCard from './components/pages/ProductCard'
import ProductsSection from './components/pages/ProductsSection'
import MyProductList from './components/pages/MyProductList'
import ContactSection from './components/pages/ContactSection'
import ScrollToTop from './components/pages/ScrollToTop'
import Profile from './components/pages/Profile'
import OwenerProfile from './components/pages/OwenerProfile'
import Verified from './components/pages/isVerify'
import CreateProducts from './components/pages/CreateProduct'
import UserLogout from './components/pages/UserLogout'
import UserProtectWrapper from './components/pages/UserProtectWrapper'
import OAuthWrapper from './components/pages/OAuthWrapper'
import PaymentGat from './components/pages/PaymentPage'
const App = () => {
  return (
    <div>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/Signup' element={<Signi />}/>
      <Route path='/Paymant' element={<PaymentGat />}/>
      <Route path='/Signup' element={<Signi />}/>
      <Route path='/OAuth' element={<OAuthWrapper />}/>
      <Route path='/Login' element={<Login  />}/>
      <Route path='/Logout' element={<UserLogout  />}/>
      <Route path='/MyAccount' element={<UserProtectWrapper><Profile /></UserProtectWrapper>}/>
      <Route path='/Shop' element={<ProductCard />}/>
      <Route path='/OwenerDashboard' element={<OwenerProfile />}/>
      <Route path='/Cart' element={<MyProductList />}/>
      <Route path='/Product/:productId' element={<ProductsSection />}/>
      <Route path='/contact' element={<ContactSection />}/>
      <Route path='/CreateProducts' element={<CreateProducts />}/>
      <Route path='/verified/:id' element={<Verified />}/>
    </Routes>
    </div>
  )
}

export default App