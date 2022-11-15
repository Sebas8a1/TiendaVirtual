import React, { Fragment } from 'react'
import "../../App.css"
import { Link } from 'react-router-dom'
import { Search } from './Search'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../actions/userActions'

const Header = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { user, loading } = useSelector(state => state.auth)
    const logoutHandler = () => {
        dispatch(logout());
        alert.success('Logged out successfully.')
    }
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
                <Link to="/cart"><i class="fa fa-shopping-cart fa-lg text-white" aria-hidden="false"></i>
                    <button type="button" class="btn btn-secondary cart-count mx-2" disabled="">2</button></Link>
                    <b/>
                    <b/>
                    <b/>
                    
                    {user ? (   //If user is logged in
                    <div className="ml-4 dropdown d-inline">
                    <Link to="#!" className="btn dropdown-toggle mr-4" type="button"
                        id="dropDownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <figure className="avatar avatar-nav">
                            <img src={user.avatar
                                && user.avatar.url
                                }
                                onerror="this.onerror=null; this.src='../images/default_avatar.jpg'"
                                alt= ""/>
                        </figure>
                        <span>{user && user.nombre}</span>
                        </Link>
                    <div className="dropdown-menu" aria-labelledby="dropDownMenu">
                        {user && user.role === 'admin' && (
                        <Link className="dropdown-item" to="/admin/dashboard">Adm. de Productos</Link>
                        )}
                        <Link className="dropdown-item" to="/">Pedidos</Link>
                        <Link className="dropdown-item" to="/me">Mi Cuenta</Link>
                        <Link className="dropdown-item" to="/" onClick={ logoutHandler} >Cerrar Sesión</Link>
                    </div>
                </div>
                    ) : !loading && <Link to="/login" type="button" className="button ml-4" id="login_button">Login</Link>}


                    
                </div>

            </nav>
        </Fragment>

    )
}

export default Header