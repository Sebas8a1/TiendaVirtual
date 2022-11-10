import React, { Fragment } from 'react'
import "../../App.css"
import { Link } from 'react-router-dom'
import { Search } from './Search'

const Header = () => {
    return (
        <Fragment>
            <nav className="navbar row navbar-expand-lg navbar-dark bg-secondary">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to="/"><img src="..\images\bookstore1.png" alt="Aca deberia ir un logo" class="App-logo"></img></Link>
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Search />
                    {/* <div className="input-group">
                        <input type="text" id="search_field" class="form-control" placeholder="Buscar productos..." />
                        <div class="input-group-append">
                            <button id="search_btn" className="button"><i class="fa fa-search" aria-hidden="true"></i></button>
                        </div>
                    </div> */}
                </div>

                <div className="col-12 col-md-3  text-center">
                    <div className="ml-4 dropdown d-inline">
                        <Link to="#!" className="btn dropdown-toggle mr-4 mr-4" type="button"
                            id="dropDownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span>Panel de control</span> </Link>
                        <div className="dropdown-menu" aria-labelledby="dropDownMenu">
                            <Link className="dropdown-item" to="/admin/dashboard">Adm. de Productos</Link>
                            <Link className="dropdown-item" to="#!">Pedidos</Link>
                            <Link className="dropdown-item" to="#!">Mi Cuenta</Link>
                            <Link className="dropdown-item" to="#!">Cerrar Sesión</Link>
                        </div>
                    </div>

                    <Link to="/cart"><i class="fa fa-shopping-cart fa-lg text-white" aria-hidden="false"></i>
                    <button type="button" class="btn btn-secondary cart-count" disabled="">2</button></Link>
                </div>

            </nav>
        </Fragment>

    )
}

export default Header