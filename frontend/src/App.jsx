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
const App = () => {
  return (
    <div>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/Sigup' element={<Signi />}/>
      <Route path='/Login' element={<Login  />}/>
      <Route path='/MyAccount' element={<Profile />}/>
      <Route path='/EmailVerfytion' element={<Signi />}/>
      <Route path='/Shop' element={<ProductCard />}/>
      <Route path='/Wish' element={<MyProductList />}/>
      <Route path='/Product' element={<ProductsSection />}/>
      <Route path='/tanmay' element={<ScrollToTop />}/>
    </Routes>
    </div>
  )
}

export default App