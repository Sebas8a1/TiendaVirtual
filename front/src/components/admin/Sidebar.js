import React from 'react'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
    return (
        <div className="sidebar-wrapper bg-secondary">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/admin/dashboard"><i className="fa fa-tachometer"></i>Managment</Link>
                    </li>
                    {/*Botones de productos*/}
                    <li>
                        <a href="#productSubMenu" data-toggle="collapse" aria-expanded="false"
                            className="btn btn-secondary dropdown-toggle"><i className="fa fa-product-hunt"></i>Books</a>
                        <ul className="collapse list-unstyled" id="productSubMenu">
                            <li>
                                <Link to="/admin/productList"><i className="fa fa-clipboard"></i>List of Books</Link>
                            </li>
                            <li>
                                <Link to="/admin/newproduct"><i className="fa fa-plus"></i>New Book</Link>
                            </li>
                        </ul>
                    </li>

                    {/*Botones de pedidos*/}

                    <li>
                        <Link to="/orderList"><i className='fa fa-shopping-basket'></i>Orders</Link>
                    </li>

                    {/*Botones de usuarios*/}

                    <li>
                        <Link to="/admin/users"><i className='fa fa-users'></i>Users</Link>
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