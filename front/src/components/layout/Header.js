import React, { Fragment } from 'react'

const Header = () => {
    return (
    <Fragment>
        <nav className="navbar row navbar-expand-lg navbar-dark bg-dark">
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <img src=".\images\bookstore.png" alt="Aca deberia ir un logo" class="App-logo"></img>
            </div>
        </div>

            <div className="col-12 col-md-6 mt-2 mt-md-0">
                <div className="input-group">
                    <input type="text" id="search_field" class="form-control" placeholder="Buscar productos..."/>
                    <div class="input-group-append">
                        <button id="search_btn" class="btn"><i class="fa fa-search" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>

            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                <button className="btn" id="login_btn">Iniciar Sesión</button>
                <i class="fa-solid fa-cart-shopping"></i>
                <span className="ml-1" id="cart_count">2</span>
            </div>
            
        </nav>
    </Fragment>
    
    )
}

export default Header