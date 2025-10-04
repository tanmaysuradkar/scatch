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
import Verified from './components/pages/isVerify'
import CreateProducts from './components/pages/CreateProduct'
import UserLogout from './components/pages/UserLogout'
import UserProtectWrapper from './components/pages/UserProtectWrapper'
const App = () => {
  return (
    <div>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/Sigup' element={<Signi />}/>
      <Route path='/Login' element={<Login  />}/>
      <Route path='/Logout' element={<UserLogout  />}/>
      <Route path='/MyAccount' element={<UserProtectWrapper><Profile /></UserProtectWrapper>}/>
      <Route path='/Shop' element={<ProductCard />}/>
      <Route path='/CART' element={<MyProductList />}/>
      <Route path='/Product/:productId' element={<ProductsSection />}/>
      <Route path='/contact' element={<ContactSection />}/>
      <Route path='/CreateProducts' element={<CreateProducts />}/>
      <Route path='/verified/:id' element={<Verified />}/>
    </Routes>
    </div>
  )
}

export default App