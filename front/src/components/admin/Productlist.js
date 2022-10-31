import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/productActions'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Metadata } from '../layout/Metadata'
import Sidebar from './Sidebar'
import { MDBDataTable } from 'mdbreact'
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
                edit:<Link to={`/admin/edit/${producto._id}`} className="fa-sharp fa-solid fa-file-pen icon-border" ></Link>,
                delete: <Link to='/' className="fa-sharp fa-solid fa-trash-can icon-border"></Link>
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


            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" >Edit</button>
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">New message</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form className="shadow-lg" encType='multipart/form-data'>
                                <h1 className="mb-4">Editar Libro</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Nombre</label>
                                    <input type="text" id="name_field" className='form-control' defaultValue="HP" />


                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value="$ 95000"

                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Descripcion</label>
                                    <input type="text" id="description_field" className='form-control' defaultValue="Primer libro" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Categoria</label>
                                    <select id="categoria_field" className='form-control' defaultValue="Ficcion">
                                        <option value="Biografias" >Biografias</option>
                                        <option value="Cientificos" >Cientificos</option>
                                        <option value="Comedia" >Comedia</option>
                                        <option value="De referencia y consulta" >De referencia y consulta</option>
                                        <option value="De viaje" >De viaje</option>
                                        <option value="Ficcion" >Ficcion</option>
                                        <option value="Juveniles" >Juveniles</option>
                                        <option value="Libro de texto" >Libro de texto</option>
                                        <option value="Literatura y linguisticos" >Literatura y linguisticos</option>
                                        <option value="Monografias" >Monografias</option>
                                        <option value="Novelas" >Novelas</option>
                                        <option value="Poeticos" >Poeticos</option>
                                        <option value="Recreativos" >Recreativos</option>

                                    </select>


                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Inventario</label>
                                    <input type="text" id="stock_field" className='form-control' defaultValue="2" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Vendedor</label>
                                    <input type="text" id="vendedor_field" className='form-control' defaultValue="Yo" />
                                </div>

                                <div className='form-group'>
                                    <label>Imagenes</label>

                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            multiple

                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Seleccione Imagen
                                        </label>
                                    </div>

                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="button py-2"
                                >
                                    Actualizar
                                </button>

                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Send message</button>
                        </div>
                    </div>
                </div>
            </div>

            


        </Fragment>
    )
}
