import React, { Fragment } from 'react'

export const Home = () => {
  return (
    <Fragment>
      <h1 id="Encabezado productos" className="text-center">Productos</h1>
      <section id="prductos" className="container mt-5"> 
        <div className="row">
          <div className="col-md-4">
            <div className="card">
            <img className="card-img-top mx-auto" src="../images/escritorios.png" alt="producto-1"></img>
              <div className="card-body">
                <h5 id="titulo-producto"><a href="#">Escritorio</a></h5>
                <div className="rating-outer">
                  <div className="rating-inner"></div>
                  </div>
                  <span id="no_of_reviews">(5 Reviews)</span>
              </div>
              <p className="card-text">Desde $323.000</p><a href="#" id="view_btn" className="btn btn-block mx-auto">Ver más</a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
            <img className="card-img-top mx-auto" src="../images/herramientas-electricas.png" alt="producto-2"></img>
              <div className="card-body">
                <h5 id="titulo-producto"><a href="#">Herramientas electricas</a></h5>
                <div className="rating-outer">
                  <div className="rating-inner"></div>
                  </div>
                  <span id="no_of_reviews">(5 Reviews)</span>
              </div>
              <p className="card-text">Desde $65.000</p><a href="#" id="view_btn" className="btn btn-block mx-auto">Ver más</a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
            <img className="card-img-top mx-auto" src="../images/lavadoras.png" alt="producto-3"></img>
              <div className="card-body">
                <h5 id="titulo-producto"><a href="#">Lavadoras</a></h5>
                <div className="rating-outer">
                  <div className="rating-inner"></div>
                  </div>
                  <span id="no_of_reviews">(5 Reviews)</span>
              </div>
              <p className="card-text">Desde $750.000</p><a href="#" id="view_btn" className="btn btn-block mx-auto">Ver más</a>
            </div>
          </div>
        </div>
      </section>

      <section id="prductos" className="container mt-5"> 
        <div className="row">
          <div className="col-md-4">
            <div className="card">
            <img className="card-img-top mx-auto" src="../images/escritorios.png" alt="producto-1"></img>
              <div className="card-body">
                <h5 id="titulo-producto"><a href="#">Escritorio</a></h5>
                <div className="rating-outer">
                  <div className="rating-inner"></div>
                  </div>
                  <span id="no_of_reviews">(5 Reviews)</span>
              </div>
              <p className="card-text">Desde $323.000</p><a href="#" id="view_btn" className="btn btn-block mx-auto">Ver más</a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
            <img className="card-img-top mx-auto" src="../images/herramientas-electricas.png" alt="producto-2"></img>
              <div className="card-body">
                <h5 id="titulo-producto"><a href="#">Herramientas electricas</a></h5>
                <div className="rating-outer">
                  <div className="rating-inner"></div>
                  </div>
                  <span id="no_of_reviews">(5 Reviews)</span>
              </div>
              <p className="card-text">Desde $65.000</p><a href="#" id="view_btn" className="btn btn-block mx-auto">Ver más</a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
            <img className="card-img-top mx-auto" src="../images/lavadoras.png" alt="producto-3"></img>
              <div className="card-body">
                <h5 id="titulo-producto"><a href="#">Lavadoras</a></h5>
                <div className="rating-outer">
                  <div className="rating-inner"></div>
                  </div>
                  <span id="no_of_reviews">(5 Reviews)</span>
              </div>
              <p className="card-text">Desde $750.000</p><a href="#" id="view_btn" className="btn btn-block mx-auto">Ver más</a>
            </div>
          </div>
        </div>
      </section>


        
    </Fragment>
  )
}

export default Home