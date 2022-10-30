import React from 'react'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/admin/dashboard"><i className="fa fa-tachometer"></i>Administración</Link>
                    </li>
                    {/*Botones de productos*/}
                    <li>
                        <a href="#productSubMenu" data-toggle="collapse" aria-expanded="false"
                            className="btn btn-secondary dropdown-toggle"><i className="fa fa-product-hunt"></i>Libros</a>
                        <ul className="collapse list-unstyled" id="productSubMenu">
                            <li>
                                <Link to="/admin/producList"><i className="fa fa-clipboard"></i>Lista de libros</Link>
                            </li>
                            <li>
                                <Link to="/admin/newproduct"><i className="fa fa-plus"></i>Crear Libro</Link>
                            </li>
                        </ul>
                    </li>

                    {/*Botones de pedidos*/}

                    <li>
                        <Link to="/"><i className='fa fa-shopping-basket'></i>Ordenes</Link>
                    </li>

                    {/*Botones de usuarios*/}

                    <li>
                        <Link to="/"><i className='fa fa-users'></i>Usuarios</Link>
                    </li>
                    {/*Botones de reviesws*/}

                    <li>
                        <Link to="/"><i className='fa fa-users'></i>Reviews</Link>
                    </li>

                </ul>
            </nav>

        </div>

    )
}
export default Sidebar