import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import SignUp from './components/SignUp/SignUp'
import ProductList from './components/ProductList/ProductList'
import ViewProduct from './components/Viewproduct/Viewproduct'
import Cart from './components/Cart/Cart'
import Header from './components/Header/Header'
import SignIn from './components/SignIn/SignIn'
import { useSelector } from 'react-redux'

function App() {

  let { isLoading } = useSelector(state => state.authReducer);

  if (isLoading) {
    return (
      <>
        <div className="loader"></div>
      </>
    )
  }

  
  else {
    return (
      <>
        <Header />
        <Routes>
          <Route element={<Home />} path='/' />
          <Route element={<SignUp />} path='/signUp' />
          <Route element={<SignIn />} path='/signIn' />
          <Route element={<ProductList />} path='/productList' />
          <Route element={<ViewProduct />} path='/viewProduct' />
          <Route element={<Cart />} path='/cart' />
        </Routes>
      </>
    )
  }
}

export default App