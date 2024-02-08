import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getDataAction, getSingleDataAction } from '../../services/Actions/productAction';
import './productlist.css'

function ProductList() {

  const { datas, isLoading } = useSelector(state => state.productReducer)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDataAction());
  }, [dispatch]);

  const handalEdit = async (id) => {
    await dispatch(getSingleDataAction(id))
    navigate('/viewProduct')
  };

  return (
    <>
      {
        isLoading ? <div className="loader"></div> : console.log(false)
      }
      <div className="container">
        <div className="row justify-content-between py-5">
          {
            datas.map((item, index) => {
              return (
                <button className="card border-0 col-12 col-md-6 col-lg-4 col-xxl-3 p-3" key={index} onClick={() => { handalEdit(item.id) }}>
                  <div className="border rounded w-100 p-3">
                    <div className="image">
                      <img src={item.image} alt="Image" className='img-fluid' />
                    </div>
                    <div className="content d-flex flex-column gap-2 text-start pt-3">
                      <div className="pro-title fs-4">
                        {item.name}
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="price fs-3">
                          ${item.price * 80 / 100}
                        </span>
                        <span className='discount'>
                          <span className="text-decoration-line-through">${item.price}</span>
                          <span className='text-success ms-2'>20% off</span>
                        </span>
                      </div>
                      <div>
                        <span className='border d-inline-block px-4 py-1 rounded-pill'>Free Delivery</span>
                      </div>
                      <div className="d-flex py-2 align-items-center">
                        <span className="rating bg-success rounded-pill text-light py-1 px-3 me-3">{Math.round(Math.floor(Math.random() * 5) + 4 * 10) / 10
                        } &nbsp;<i className="bi bi-star text-light"></i></span>
                        <span className="reviews">
                          {Math.floor(Math.random() * 10000)} &nbsp;Reviews
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })
          }
        </div>
      </div>
    </>
  )
}
export default ProductList
