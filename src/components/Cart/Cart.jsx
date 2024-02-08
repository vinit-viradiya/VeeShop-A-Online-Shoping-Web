import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { db } from '../../firebase-config/firebase.config';
import { addToCartRes } from '../../services/Actions/productAction';
import emptyCart from '../../assets/empty-cart.png'
import safety from '../../assets/safety.png'


function Cart() {

    let { cartData, isLoading } = useSelector(state => state.productReducer);
    const { isSignIn, user } = useSelector(state => state.authReducer);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCountMinus = (id) => {
        cartData = cartData.map((item) => {
            if (item.id == id) {
                let count = item.count
                if (count >= 2) {
                    item = { ...item, count: count - 1 }
                }
            }
            return item
        })

        setDoc(doc(db, 'users', `${user.id}`), {
            ...user,
            cartData: cartData
        }).then((res) => {
            console.log(res, "Success");
            dispatch(addToCartRes(cartData))
        }).catch((err) => {
            console.log(err, "Failed");
        })
    }

    const handleCountPlus = (id) => {

        cartData = cartData.map((item) => {
            if (item.id == id) {
                let count = item.count
                item = { ...item, count: count + 1 }
            }
            return item
        })

        setDoc(doc(db, 'users', `${user.id}`), {
            ...user,
            cartData: cartData
        }).then((res) => {
            console.log(res, "Success");
            dispatch(addToCartRes(cartData))
        }).catch((err) => {
            console.log(err, "Failed");
        })

    }

    const handleRemoveItem = (id) => {

        cartData = cartData.filter((item) => {
            return item.id != id
        })

        setDoc(doc(db, 'users', `${user.id}`), {
            ...user,
            cartData: cartData
        }).then((res) => {
            console.log(res, "Success");
            dispatch(addToCartRes(cartData))
        }).catch((err) => {
            console.log(err, "Failed");
        })

    }

    let cartItems = null
    let totalPrice = null

    cartData.map((item) => {
        cartItems += item.count
        totalPrice = totalPrice + (item.price * item.count)
    })

    if (isSignIn) {
        if (cartItems >= 1) {
            return (
                <>
                    {
                        isLoading ? <div className="loader"></div> : console.log(false)
                    }
                    <div className="container px-xxl-5">
                        <div className="row px-xxl-5 justify-content-center">
                            <div className="col-12 col-md-9 col-lg-7 p-4">
                                <div className="main-title pb-4">
                                    <b>Cart</b> | {cartItems} Item
                                </div>
                                <div className="d-flex flex-column gap-4">
                                    {
                                        cartData.map((item, index) => {
                                            return (
                                                <div className="border rounded" key={index}>
                                                    <div className="item d-flex p-3">
                                                        <div className='border rounded p-2 cart-img'>
                                                            <img src={item.image} className='img-fluid' alt="Product Image" />
                                                        </div>
                                                        <div className="col px-3 d-flex flex-column gap-1">
                                                            <div className="p-title fw-semibold">
                                                                {
                                                                    item.name
                                                                }
                                                            </div>
                                                            <div className="p-price">
                                                                {
                                                                    "$" + item.price
                                                                }
                                                            </div>
                                                            <div className='mb-1'>
                                                                All issue easy returns allowed
                                                            </div>
                                                            <div className='d-flex align-items-center'>
                                                                Qty :
                                                                <div className="border d-flex ms-2">
                                                                    <button className='btn py-0' onClick={() => handleCountMinus(item.id)}>-</button>
                                                                    <div className="border-start border-end px-3">
                                                                        {
                                                                            item.count
                                                                        }
                                                                    </div>
                                                                    <button className='btn py-0' onClick={() => handleCountPlus(item.id)}>+</button>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <button className='fw-semibold mt-3 btn p-0' onClick={() => handleRemoveItem(item.id)}>
                                                                    <i className="bi bi-x-lg"></i> Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="d-flex justify-content-between p-3 py-2">
                                                        <span>
                                                            Sold by: vinit viradiya
                                                        </span>
                                                        <span>
                                                            Free Delivery
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="col-12 col-md-9 col-lg-5 p-4">
                                <div className='fw-semibold mb-1'>Price Details</div>
                                <div className="d-flex justify-content-between">
                                    <div className='text-underline'>Total Product Price</div><div id="price">+ ${totalPrice}</div>
                                </div>
                                <hr className='my-2' />
                                <div className="d-flex justify-content-between fw-semibold">
                                    <div>Order Total</div><div id="price">${totalPrice}</div>
                                </div>
                                <div className='bg-primary text-center bg-opacity-25 rounded py-1 my-3'>
                                    Clicking on 'Continue' will not deduct any money
                                </div>
                                <button className='btn bg-black text-light w-100 py-2 bg-opacity-75'>Continue</button>
                                <img src={safety} alt="Image" className='img-fluid' />
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        else {
            return (
                <>
                    <div className="text-center p-5">
                        <img src={emptyCart} alt="" className='img-fluid' />
                        <h4 className='my-3'>Your cart is empty</h4>
                        <NavLink to="/productList" className="text-dark">
                            <button className='btn border-dark'>View Products</button>
                        </NavLink>
                    </div>
                </>
            )
        }
    }
    else {

        useEffect(() => {
            navigate('/signIn')
        }, [])

    }

}

export default Cart
