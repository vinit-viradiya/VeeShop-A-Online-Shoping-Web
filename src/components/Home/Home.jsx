import React, { useEffect } from 'react'
import freeDelivery from "../../assets/freedelivery.svg"
import cashOnDelivery from "../../assets/cod.svg"
import easyReturn from "../../assets/easyreturn.svg"
import playStore from "../../assets/ps.png"
import ws from "../../assets/ws.webp"
import ms from "../../assets/ms.webp"
import ks from "../../assets/ks.webp"
import e1 from "../../assets/e1.webp"
import e2 from "../../assets/e2.webp"
import e3 from "../../assets/e3.webp"
import ns1 from "../../assets/ns1.webp"
import ns2 from "../../assets/ns2.webp"
import ns3 from "../../assets/ns3.webp"
import psi from "../../assets/play-store-icon.webp"
import asi from "../../assets/app-store-icon.webp"
import './Home.css'
import { NavLink } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase-config/firebase.config'
import { addToCartRes } from '../../services/Actions/productAction'
import { useDispatch, useSelector } from 'react-redux'

function Home() {

  const { user, isLoading } = useSelector(state => state.authReducer);

  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      getDoc(doc(db, 'users', `${user.id}`)).then((res) => {
        if (res.data().cartData) {
          dispatch(addToCartRes(res.data().cartData))
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }, [user])

  return (
    <>
      {
        isLoading ? <div className="loader"></div> : console.log(false)
      }
      <section className="fir-sec py-5">
        <div className="container">
          <div className="row row-gap-4">
            <div className="col-12 col-md-8 col-lg-7">
              <h1 className='display-5 fw-semibold m-0'>Lowest Prices <br /> Best Quality Shopping</h1>
            </div>
            <div className="col-12 col-md-8 col-lg-5">
              <div className="d-flex flex-wrap gap-4">
                <div className="d-flex align-items-center">
                  <span><img src={freeDelivery} alt="freeDelivery" className='border rounded-circle me-2' /></span>
                  <span>Free <br /> Delivery</span>
                </div>
                <div className="d-flex align-items-center">
                  <span><img src={cashOnDelivery} alt="cashOnDelivery" className='border rounded-circle me-2' /></span>
                  <span>Cash on <br /> Delivery</span>
                </div>
                <div className="d-flex align-items-center">
                  <span><img src={easyReturn} alt="easyReturn" className='border rounded-circle me-2' /></span>
                  <span>Easy <br /> Returns</span>
                </div>
              </div>
              <div className="d-flex pt-4">
                <div className="bg-primary p-2 px-3 rounded d-flex align-items-center">
                  <span>
                    <img src={playStore} alt="Play Store" />
                  </span>
                  <span className='text-white ms-3'>
                    Download Veeshop
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec-sec">
        <div className="container">
          <div className="row">
            <span className="title fs-1 fw-semibold text-center">
              Top Categories to choose from
            </span>
          </div>
          <div className="row row-gap-5 col-11 m-auto py-5 my-5 rounded shadow justify-content-center">
            <div className="col-12 col-xl-5 text-center">
              <img src={ws} alt="" className='img-fluid' />
            </div>
            <div className="col-12 col-xl-7 d-flex flex-column justify-content-center">
              <div className='fw-bold display-5 text-center pt-2 mb-5'>
                Be fashion forward
              </div>
              <div className='text-center d-flex flex-column flex-md-row justify-content-center'>
                <span>
                  <img className='img-fluid' src={ms} alt="Men's store" />
                </span>
                <span>
                  <img className='img-fluid' src={ks} alt="Kid's store" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="thi-sec">
        <div className="container">
          <div className="row row-gap-3 col-11 m-auto py-5 my-5 rounded shadow align-items-center justify-content-evenly">
            <div className="col-12 col-lg-4 text-center">
              <div className="fw-bold display-5">
                Essentials
              </div>
              <div>
                <button className='btn bg-primary text-white fs-5 px-4 mt-4'>
                  <NavLink to='/productlist' className='text-light'>
                    View All
                  </NavLink>
                </button>
              </div>
            </div>
            <div className="col-12 col-lg-7 d-flex flex-column flex-md-row text-center justify-content-center">
              <span className='col'>
                <img className='img-fluid' src={e1} alt="Img" /><br />
                <span className='fs-5'>
                  Home Decor
                </span>
              </span>
              <span className='col'>
                <img className='img-fluid' src={e2} alt="Img" /><br />
                <span className='fs-5'>
                  Kitchen Appliances
                </span>
              </span>
              <span className='col'>
                <img className='img-fluid' src={e3} alt="Img" /><br />
                <span className='fs-5'>
                  Health Care
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="thi-sec">
        <div className="container">
          <div className="row row-gap-3 col-11 m-auto py-5 my-5 rounded shadow align-items-center justify-content-evenly">
            <div className="col-12 col-lg-4 text-center">
              <div className="fw-bold display-5">
                New Styles
              </div>
              <div>
                <button className='btn bg-primary text-white fs-5 px-4 mt-4'>
                  <NavLink to='/productlist' className='text-light'>
                    View All
                  </NavLink>
                </button>
              </div>
            </div>
            <div className="col-12 col-lg-7 d-flex flex-column flex-md-row text-center justify-content-center">
              <span className='col'>
                <img className='img-fluid' src={ns1} alt="Img" /><br />
                <span className='fs-5'>
                  Assessories
                </span>
              </span>
              <span className='col'>
                <img className='img-fluid' src={ns2} alt="Img" /><br />
                <span className='fs-5'>
                  Footwear
                </span>
              </span>
              <span className='col'>
                <img className='img-fluid' src={ns3} alt="Img" /><br />
                <span className='fs-5'>
                  Electronics
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="fif-sec">
        <div className="container">
          <div className="row py-3 col-11 m-auto rounded shadow text-end text-dark p-lg-5">
            <h3>
              Become a Reseller and
            </h3>
            <h2 className='display-5 fw-semibold mb-5'>
              Start your Online Business <br />
              with Zero Investment
            </h2>
            <div className='d-flex flex-wrap text-center justify-content-end gap-2 pb-lg-5 mb-lg-5'>
              <div className="bg-black p-2 px-4 rounded">
                <img src={psi} width={130} alt="Play store icon" />
              </div>
              <div className="bg-black p-2 px-4 rounded">
                <img src={asi} width={130} alt="App store icon" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='six-sec'>
        <div className="container">
          <div className="row col-11 m-auto py-3 my-5 rounded shadow p-lg-5">
            <h2>
              Register as a VeeShop Supplier
            </h2>
            <h6 className='mt-2'>
              Sell your products to crores of customers at 0% commission
            </h6>
            <div className="d-flex flex-column flex-lg-row my-4">
              <div className="d-flex align-items-center">
                <i className="bi bi-check-circle-fill text-success fs-5"></i><span className="text-white fw-semibold ms-3">Grow your business 10x</span>
              </div>
              <div className="vr m-2 my-lg-0 mx-lg-3 bg-white"></div>
              <div className="d-flex align-items-center">
                <i className="bi bi-check-circle-fill text-success fs-5"></i><span className="text-white fw-semibold ms-3">Enjoy 100% Profit</span>
              </div>
              <div className="vr m-2 my-lg-0 mx-lg-3 bg-white"></div>
              <div className="d-flex align-items-center">
                <i className="bi bi-check-circle-fill text-success fs-5"></i><span className="text-white fw-semibold ms-3">Sell all over India</span>
              </div>
            </div>
            <div>
              <button className='btn bg-white pb-2 px-4'>Sign up now</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home