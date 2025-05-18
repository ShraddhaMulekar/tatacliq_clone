import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footbar from './components/Footbar'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Products from './components/Products'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'
import Register from './components/Register'
import Login from './components/LogIn'
import Orders from './components/Order'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Orders />} />
      </Routes>
      <Footbar />
    </>
  )
}

export default App
