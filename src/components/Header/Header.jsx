import React, { useEffect, useState } from 'react'
import './Header.css'
import mainLogo from '../../assets/veeshop-logo.png'
import Dropdown from 'react-bootstrap/Dropdown'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userSignOut } from '../../services/Actions/authActions'

function Header() {

  const { cartData } = useSelector(state => state.productReducer);

  const { isSignIn, user } = useSelector(state => state.authReducer);

  const dispatch = useDispatch()

  let quickLinks = ["Women Ethnic", "Women Western", "Men", "Kids", "Home & Kitchen", "Beauty & Health", "Jewellery & Accessories", "Bags & Footwear", "Electronics"]

  const navigate = useNavigate()

  const handleSignOut = () => {
    dispatch(userSignOut())
  }

  let cartItems = null

  useEffect(() => {
    cartData.map((item) => {
      cartItems += item.count
    })
    document.getElementById("cartItems").innerHTML = cartItems;
  }, [cartData, cartItems])

  return (
    <>
      <header>
        <div className="container py-2">
          <div className="row">
            <div className="d-flex row-gap-4 align-items-center justify-content-between">
              <div className='logo'>
                <NavLink to='/'>
                  <img src={mainLogo} className='img-fluid' alt="Veeshop's Logo" />
                </NavLink>
              </div>
              <div className='d-none d-xxl-block'>
                <span className="search-feild border rounded p-3 py-2 d-inline-block">
                  <i className="bi bi-search"></i>
                  <input type="search" placeholder='Try Saree, Kurti or Search by Product Code' />
                </span>
              </div>
              <div className='d-flex align-items-center'>
                <a href="#" className='link d-none d-lg-block'>
                  <i className="bi bi-phone"></i> Download App
                </a>
                <div className="vr my-3 d-none d-lg-block"></div>
                <a href="#" className='link d-none d-lg-block'>
                  Become a Supplier
                </a>
                <div className="vr my-3 d-none d-lg-block"></div>
                <a href="#" className='link d-none d-lg-block'>
                  Newsroom
                </a>
                <div className="vr my-3 d-none d-lg-block"></div>
                <div className="btns d-flex column-gap-3">
                  <Dropdown>
                    <Dropdown.Toggle className='bg-transparent border-0 d-flex flex-column align-items-center' id="dropdown-basic">
                      <div><i className="bi bi-person fs-4"></i></div><div>Profile</div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='d-menu border-0 shadow'>
                      <div className="d-flex align-items-center">
                        {
                          user ? user.picture ? <img src={user.picture} width={50} className='rounded-circle' alt="User" /> : <i className="bi bi-person-circle fs-1"></i> : <i className="bi bi-person-circle fs-1"></i>
                        }
                        <span className='ms-3'>
                          <h5 className='m-0'>Hello, {user ? user.name : "user"}</h5>
                          <div id="email">{user ? user.email : ""}</div>
                        </span>
                      </div>
                      {
                        isSignIn ? <></> :
                          <>
                            <p>To access your VeeShop account</p>
                            <NavLink className='btn w-100 bg-primary text-white' to='/signIn'>
                              Sign In
                            </NavLink>
                          </>

                      }
                      <hr className='my-3' />
                      <NavLink to='/cart' className='text-semibold'>
                        <i className="bi bi-bag me-2"></i>My Orders
                      </NavLink>
                      {
                        isSignIn
                          ?
                          <>
                            <br />
                            <hr className='my-3' />
                            <button onClick={handleSignOut} className='text-semibold'><i className="bi bi-box-arrow-right me-2"></i> Logout</button>
                          </>
                          :
                          <></>
                      }
                    </Dropdown.Menu>
                  </Dropdown>
                  <NavLink to="/cart" className="d-flex flex-column align-items-center justify-content-center">
                    <div className='position-relative'>
                      <i className="bi bi-cart fs-5"></i>
                      <span className="position-absolute top-0 start-100 translate-middle-y badge rounded-pill bg-dark" id='cartItems'></span>
                    </div>
                    <div>Cart</div>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="container d-none d-xl-block">
          <div className="row">
            <div className="col py-3 quick-links d-flex justify-content-between">
              {
                quickLinks.map((item, index) => {
                  return (
                    <NavLink to='productList' key={index}>
                      {item}
                    </NavLink>
                  )
                })
              }
            </div>
          </div>
        </div>
        <hr />
      </header>
    </>
  )
}

export default Header