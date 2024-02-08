import React, { useEffect, useState } from 'react'
import SignUpImg from '../../assets/signUpImg.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { userSignIn, userSignUpRej } from '../../services/Actions/authActions'
import { NavLink, useNavigate } from 'react-router-dom'

function SignIn() {

  const { isSignIn, isLoading } = useSelector(state => state.authReducer)

  const [userData, setuserData] = useState({
    "email": '',
    "password": ''
  })

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (event) => {

    let name = event.target.name;
    let value = event.target.value;

    setuserData({ ...userData, [name]: value })

  }

  const handleSubmit = (event) => {

    event.preventDefault();

    dispatch(userSignIn(userData));

  }

  useEffect(() => {
    dispatch(userSignUpRej())
  }, [isSignIn])


  if (isSignIn) {

    navigate('/')

  }

  return (
    <>
      {
        isLoading ? <div className="loader"></div> : console.log(false)
      }
      <div className="formWrapper">
        <div className="signUpForm shadow rounded d-flex flex-column">
          <div className="image">
            <img src={SignUpImg} className='img-fluid rounded-top' height={200} alt="Sign Up Imgae" />
          </div>
          <div className="content col p-5 d-flex flex-column justify-content-between">
            <form action="" onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
              <h4>SignIn to view your profile</h4>
              <input className='border-0 border-bottom py-2' type="email" value={userData.email} name='email' placeholder='Enter Your Email' onChange={handleChange} required />
              <input className='border-0 border-bottom py-2' type="password" value={userData.password} name='password' placeholder='Enter Password' onChange={handleChange} required />
              <div id="error" className='text-danger'></div>
              <button type='submit' className='btn bg-primary text-white py-2 mb-3'>Sign In</button>
              <NavLink to='/signUp' className="text-center text-primary mb-3">
                Create a VeeShop account? <b>SignUp</b>
              </NavLink>
            </form>
            <p className='text-secondary text-center m-0'>By continuing, you agree to VeeShop's <br />
              <a href="#" className='text-primary fw-semibold'> Terms & Conditions</a> and <a href="#" className='text-primary fw-semibold'>Privacy Policy</a></p>
          </div>
        </div>
      </div>
    </>
  )

}

export default SignIn