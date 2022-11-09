import React from 'react'
import { Link } from 'react-router-dom'

export const Product = ({product}) => {
    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    src={product.imagen[0].url}
                    alt={product.imagen[0].public_id}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/product/${product._id}`}>{product.nombre}</Link>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(product.calificacion / 5) * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({product.numCalificaciones} Reviews)</span>
                    </div>
                    <p className="card-text">${product.precio}</p>
                    <Link to={`/product/${product._id}`} id="view_btn" className="button">View Details</Link>
                </div>
            </div>
        </div>
    )
}
