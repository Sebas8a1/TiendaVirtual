import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getAdminProducts } from '../../actions/productActions'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Metadata } from '../layout/Metadata'
import Sidebar from './Sidebar'
import { MDBDataTable } from 'mdbreact'
import { deleteProduct } from '../../actions/productActions'





export const Productlist = () => {
    const alert = useAlert();
    const { loading, products, error } = useSelector(state => state.products);
    const dispatch = useDispatch();

    const deleteProductHandler = (id) => {
        const response = window.confirm('Are you sure you want to delete this product?')
            if  (response) {
                dispatch(deleteProduct(id))
                window.location.reload();
            }
    }
    
    useEffect(() => {
        dispatch(getAdminProducts());
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        
        alert.success("ok");
    }, [dispatch, alert, error]);

    

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc"
                },

                {
                    label: "Nombre",
                    field: "nombre",
                    sort: "asc"
                },
                {
                    label: "Precio",
                    field: "precio",
                    sort: "asc"
                },
                {
                    label: "Inventario",
                    field: "inventario",
                    sort: "asc"
                },

                {
                    label: "Edit",
                    field: "edit",
                },
                {
                    label: "Delete",
                    field: "delete",
                },

            ],
            rows: []
        }
        products.forEach(producto => {
            data.rows.push({
                id: producto._id,
                nombre: producto.nombre,
                precio: `$${producto.precio}`,
                inventario: producto.stock,
                edit:/* <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" >Edit</button>, */
                    <Link to={`/admin/edit/${producto._id}`} className="fa-sharp fa-solid fa-file-pen icon-border" ></Link>,
                delete: <Link to='/admin/productList' onClick={() => deleteProductHandler(producto._id)} className="fa-sharp fa-solid fa-trash-can icon-border"></Link>
            });
        })
        return data;
    }


    return (
        <Fragment>
            <Metadata title={"Todos los productos"}></Metadata>
            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar />
                </div>
                <div className='col-12 col-md-10'>
                    <Fragment>
                        <h1 className='my-5'>Productos registrados</h1>

                    </Fragment>
                    {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> : (
                        <MDBDataTable
                            data={setProducts()}>
                            className="px-3"
                            bordered
                            striped
                            hover

                        </MDBDataTable>

                    )}

                </div>
            </div>
        </Fragment>
    )
}