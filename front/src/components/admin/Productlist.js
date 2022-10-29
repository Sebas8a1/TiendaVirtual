import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/productActions'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Metadata } from '../layout/Metadata'
import Sidebar from './Sidebar'
import {MDBDataTable} from 'mdbreact'
import { useEffect } from 'react'


export const Productlist = () => {
    const { loading, products, error } = useSelector(state => state.products)
    const alert = useAlert();

    const dispatch = useDispatch();
    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getProducts());
        alert.success("OK")
    }, [dispatch])

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label:"ID",
                    field:"id",
                    sort:"asc"
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

            ],
            rows: []
        }
        products.forEach(producto => {
            data.rows.push({
                id:producto._id,
                nombre: producto.nombre,
                precio: `$${producto.precio}`,
                inventario: producto.inventario,
                
            })
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
                {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>:(
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
