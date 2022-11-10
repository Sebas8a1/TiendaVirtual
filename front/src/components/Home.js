import React, { Fragment, useEffect, useState } from 'react'
import { Metadata } from './layout/Metadata'
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../actions/productActions';
import { useParams, Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Product } from './products/Product';
import  Pagination  from 'react-js-pagination';

export const Home = () => {
  const params = useParams();
  const keyword = params.keyword;
  const [currentPage, setCurrentPage] = useState(1);
  const { products, loading, error, resPerPage, productsCount } = useSelector(state => state.products);
  const alert = useAlert();
    const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage));
    alert.success("ok");
  }, [dispatch, alert, error, keyword, currentPage]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <Fragment>
      {loading ? <i class="fas fa-cog fa-spin"></i>: (
        <Fragment>
          <Metadata title={'Find the most awesome collection of books nline'} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products&&products.map(product => ( // Path: front\src\components\products\Product.js (products && products.map) => Natali
                /* <Product key={product._id} product={product} /> */
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
                      <Link to={`/product/${product._id}`} id="view_btn" className="button">View Details</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          <div className="d-flex justify-content-center mt-5">
          <Pagination 
          activePage={currentPage}
          itemsCountPerPage={resPerPage}
          totalItemsCount={productsCount}
          onChange={setCurrentPageNo}
          nextPageText={'Next'}
          prevPageText={'Prev'}
          firstPageText={'First'}
          lastPageText={'Last'}
          itemClass="page-item"
          linkClass="page-link"
          />
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Home