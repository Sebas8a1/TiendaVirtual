import React, { Fragment, useEffect, useState } from 'react'
import { Metadata } from '../layout/Metadata'
import { useSelector, useDispatch } from 'react-redux'; // <--- 1
import { getProductDetails, clearErrors } from '../../actions/productActions'; // <--- 2
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';


export const ProductDetails = () => {
    const { loading, productById, error } = useSelector(state => state.productDetails)
    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [quantity, setQuantity] = useState(1)


    useEffect(() => {
        dispatch(getProductDetails(id))
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, id])

    const increaseQty = () => {
        const count = document.querySelector('.count');
        count.value++;
        setQuantity(count.value)
    }

    const decreaseQty = () => {
        const count = document.querySelector('.count');
        if (count.value > 1) {
            count.value--;
            setQuantity(count.value)
        }
    }

    return (
        <Fragment>
            {loading ? <i class="fas fa-cog fa-spin"></i> : (
                <Fragment>
                    <Metadata title={productById.nombre} />
                    <div className="row f-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel pause='hover'>
                                {productById.imagen && productById.imagen.map(image => (
                                    <Carousel.Item key={image.public_id}>
                                        <img className="d-block w-100   " src={image.url} alt={productById.nombre} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{productById.nombre}</h3>
                            <p id="product_id">Product # {productById._id}</p>
                            <hr />
                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${(productById.calificacion / 5) * 100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({productById.numCalificaciones} Reviews)</span>
                            <hr />
                            <p id="product_price">${productById.precio}</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
                                <input type="number" className="form-control-sm count d-inline" value={quantity} readOnly />
                                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                            </div>
                            <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>
                            <hr />
                            <p>Status: <span id="stock_status" className={productById.stock > 0 ? 'greenColor' : 'redColor'}>{productById.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
                            <hr />
                            <h4 className="mt-2">Description:</h4>
                            <p>{productById.descripcion
                            }</p>
                            <hr />
                            <p id="product_seller mb-3">Sold by: <strong>{productById.vendedor}</strong></p>
                            <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                                Submit Your Review
                            </button>
                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">
                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                

                                                <div className="modal-body">
                                                    <ul className="stars">
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>

                                                    <textarea name="review" id="review" className="form-control mt-3"></textarea>

                                                    <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )


}
