import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCartAction } from '../../services/Actions/productAction';

function ViewProduct() {

    const { data } = useSelector(state => state.productReducer);
    const { isSignIn, user, isLoading } = useSelector(state => state.authReducer);

    console.log(data);

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const handleAddCart = async () => {

        if (isSignIn) {

            await dispatch(addToCartAction(data, user));

            navigate('/cart')

        } else {

            navigate('/signIn');

        }
    }

    return (
        <>
            {
                isLoading ? <div className="loader"></div> : console.log(false)
            }
            <div className="container">
                <div className="row py-5 pro_detail">
                    <div className="col-12 col-lg-5">
                        <div className="image border rounded overflow-hidden">
                            <img src={data.image} alt="" className='img-fluid' />
                        </div>
                        <div className="btns d-flex justify-content-center gap-3 py-3 px-2">
                            <button onClick={handleAddCart} id='cart-btn' className='py-2 col-6 rounded bg-transparent fw-semibold border'><i className="bi bi-cart"></i> Add to Cart</button>
                            <button className='py-2 col-6 rounded bg-secondary border border-secondary text-white fw-semibold'><i className="bi bi-chevron-double-right text-light"></i> Buy Now</button>
                        </div>
                    </div>
                    <div className="col-12 col-lg-7">
                        <div className="content border rounded p-3 d-flex flex-column gap-2 text-start">
                            <div className="pro-title fs-4 fw-semibold">
                                {data.name}
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <span className="price fs-3">
                                    ${data.price * 80 / 100}
                                </span>
                                <span className='discount'>
                                    <span className="text-decoration-line-through">${data.price}</span>
                                    <span className='text-success ms-2'>20% off</span>
                                </span>
                            </div>
                            <div className="d-flex py-2 align-items-center">
                                <span className="rating bg-success rounded-pill text-light py-1 px-3 me-3">{Math.round(Math.floor(Math.random() * 5) + 4 * 10) / 10
                                } &nbsp;<i className="bi bi-star text-light"></i></span>
                                <span className="reviews">
                                    {Math.floor(Math.random() * 10000)} &nbsp;Reviews
                                </span>
                            </div>
                            <div>
                                <span className='border d-inline-block px-4 py-1 rounded-pill mt-2'>Free Delivery</span>
                            </div>
                        </div>
                        <div className="size border p-3 rounded mt-3">
                            <h4 className='mb-4'>
                                Select Size
                            </h4>
                            <span className='bg-secondary-subtle border border-secondary rounded-pill pb-1 px-4 fs-5 fw-semibold'>
                                Free Size
                            </span>
                        </div>
                        <div className="pro-detail border p-3 rounded mt-3 fw-semibold">
                            Name : {data.name} <br />
                            Product Name : {data.name} <br />
                            Net Quantity (N) : 1 <br />
                            {data.discription}<br /><br />
                            Country of Origin : India
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewProduct
