import React, { Fragment, useEffect } from 'react'
import { Metadata } from './layout/Metadata'
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../actions/productActions';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';

export const Home = () => {
  const { products, loading, error } = useSelector(state => state.products);
  const alert = useAlert();
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts());
    alert.success("ok");
  }, [dispatch]);


  return (
    <Fragment>
      {loading ? <i class="fas fa-cog fa-spin"></i>: (
        <Fragment>
          <Metadata title={'Buy Best Products Online'} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products.map(product => (
                <div key={product._id} className="col-sm-12 col-md-6 col-lg-3 my-3">
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
                      <Link to={`/product/${product._id}`} id="view_btn" className="btn w-80">View Details</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Home