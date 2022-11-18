import React, { Fragment, useEffect, useState } from 'react'
import { Metadata } from './layout/Metadata'
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../actions/productActions';
import { Link, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'



export const Home = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { loading, products, error, resPerPage, productsCount } = useSelector(state => state.products);
  const alert = useAlert();
  const params = useParams();
  const keyword = params.keyword;
  const [precio, setPrecio] = useState([100, 300000])

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(currentPage, keyword, precio));
    alert.success("ok");
  }, [dispatch, alert, error, currentPage, keyword, precio]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber) //param sent from onChange button
  }


  return (
    <Fragment>
      {loading ? <i className="fas fa-cog fa-spin"></i> : (
        <Fragment>
          <Metadata title={'Find the most awesome collection of books nline'} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              <Slider
                range
                className='t-slider'
                marks={{
                  100: `$100`,
                  30000: `$30000`,
                  70000: `$70000`,
                  110000: `$110000`,
                  150000: `$150000`,
                  190000: `$190000`,
                  230000: `$230000`,
                  270000: `$270000`,
                  300000: `$300000`
                }}
                min={100}
                max={300000}
                defaultValue={[100, 300000]}
                tipFormatter={value => `$${value}`}
                tipProps={{
                  placement: 'top',
                  prefixCls: 'rc-slider-tooltip',
                  visible: true
                }}
                value={precio}
                onChange={precio => setPrecio(precio)}
              ></Slider>
              <br />
              <br />
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
                      <Link to={`/product/${product._id}`} id="view_btn" className="button">View Details</Link>
                    </div>
                  </div>
                </div>

              ))}
            </div>
          </section>
          <div className='d-flex justify-content-center mt-5'>
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText={'Next'}
              prevPageText={'Previous'}
              firstPageText={'First'}
              lastPageText={'Last'}
              itemClass='page-item' //Class from bootstrap for buttons
              linkClass='page-link'
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Home