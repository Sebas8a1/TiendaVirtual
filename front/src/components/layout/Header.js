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

                        <Link to="/"><img src="../images/bookstore1.png" alt="Aca deberia ir un logo" class="App-logo"></img></Link>
                    </div>
                </div>

                <div className="col-12 col-md-5 mt-2 mt-md-0">
                    {/*Here was Search Bar*/}
                    <Search/>

                </div>
                <div className="col-12 col-md-4 mt-4 mt-md-0 text-center">
                <Link to="/login" type="button" className="button m-4" id="login_button">Login</Link>
                    <b/>
                    <b/>
                    <b/>
                    <div className="ml-4 dropdown d-inline">
                        <Link to="#!" className="btn dropdown-toggle mr-4" type="button"
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