import React, { Fragment, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts,} from '../../actions/productActions'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Metadata } from '../layout/Metadata'
import Sidebar from './Sidebar'
import { MDBDataTable } from 'mdbreact'





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
                delete: <Link to='/' className="fa-sharp fa-solid fa-trash-can icon-border"></Link>
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

            {/*Mensaje emergente para dejar opinion y calificacion
            <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div className="modal fade" id="editModal" tabIndex="-1" role="dialog"
                  aria-labelledby='ratingModalLabel' aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">Editar libro</h5>
                          <button type="button" className='close' data-dismiss="modal" aria-label='Close'>
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                        <div class="form-group">
                        <label class="control-label" for="nombre">Nombre:</label>
                        <input class="form-control" id="nombre" required="required"  type="text">Nombre delproducto: {products.nombre}</input>
                        </div>

                          <textarea name="review" id="review" className="form-control mt3"></textarea>

                          <button className="btn my-3 float-right review-btn px-4 text-white" 
                          data-dismiss="modal" aria-label="Close">Enviar</button>
                        
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>*/}
        
       {/*  <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
        Submit Your Review
                            </button>
                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">
                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Edite la informacion del libro</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                

                                                <div className="modal-body">
                                                <div className="form-group">
                                    <label htmlFor="description_field">Descripcion</label>
                                    <input type="text" id="description_field" className='form-control' defaultValue="Pepito" />
                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
        

        </Fragment>
    )
}

