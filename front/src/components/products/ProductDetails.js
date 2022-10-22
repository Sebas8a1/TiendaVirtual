import React, { Fragment } from 'react'
import { Metadata } from '../layout/Metadata'

export const ProductDetails = () => {
    return (
        <Fragment>
            <Metadata title="El Hobbit"></Metadata>
                <div className="row f-flex justify-content-around">
                    <div className="col-12 col-lg-5 img-fluid" id="product_image">
                        <img src='../images/libros/The_Hobbit.png' alt="El Hobbit" />
                    </div>
                    <div className="col-12 col-lg-5 mt-5">
                        <h3>El Hobbit</h3>
                        <p className="mt-3">J.R.R. Tolkien</p>
                        <hr />
                        <div className="rating-outer">
                            <div className="rating-inner"></div>
                        </div>
                        <span id="no_of_reviews">5 Reviews</span>
                        <hr />
                        <p id="product_price">$ 100.00</p>
                        <div className="stockCounter d-inline">
                            <span className="btn btn-danger minus">-</span>
                            <input type="number" className="form-control count d-inline" value="1" readOnly />
                            <span className="btn btn-primary plus">+</span>
                        </div>
                        <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>
                        <hr />
                        <p>Status: <span id="stock_status">In Stock</span></p>
                        <hr />
                        <h4 className="mt-2">Description:</h4>
                        <p>El Hobbit es una novela fantástica escrita por el filólogo y académico británico J. R. R. Tolkien y publicada en 1937. Es la primera parte de la trilogía de El Señor de los Anillos, aunque también puede considerarse una obra independiente. La novela narra las aventuras de Bilbo Bolsón, un hobbit que vive en la Comarca, una región ficticia de la Tierra Media, y que es reclutado por el mago Gandalf para participar en la conquista del Reino de Erebor, en la Montaña Solitaria, por parte de trece enanos liderados por el príncipe Thorin Escudo de Roble. La novela fue un éxito de ventas y de crítica, y ha sido traducida a más de 50 idiomas. En 1966, la revista Time la incluyó en su lista de las 100 mejores novelas en inglés de todos los tiempos.</p>
                        <hr />
                        <p id="product_seller mb-3">Sold by: <strong>BookStore</strong></p>
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
                )
}
