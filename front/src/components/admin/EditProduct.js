import React, { Fragment, useEffect, useState } from 'react'
import { Metadata } from '../layout/Metadata'
import Sidebar from './Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { clearErrors, getProductDetails } from '../../actions/productActions'



export const EditProduct = () => {

    const { loading, productById, error } = useSelector(state => state.productDetails)
    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [quantity, setQuantity] = useState(1)



    useEffect(() => {
        dispatch(getProductDetails(id))
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, id])

    return (
        <Fragment>
            <Metadata title={'Editar Libro'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" encType='multipart/form-data'>
                                <h1 className="mb-4">Editar Libro</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Nombre</label>
                                    <input type="text" id="name_field" className='form-control' defaultValue={productById.nombre} />


                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={productById.precio}

                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Descripcion</label>
                                    <input type="text" id="description_field" className='form-control' defaultValue={productById.descripcion} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Categoria</label>
                                    <select id="categoria_field" className='form-control' defaultValue={productById.categoria}>
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
                                        <option value="Religiosos" >Religiosos</option>
                                        <option value="Tecnicos" >Tecnicos</option>
                                        <option value="Terror" >Terror</option>
                                                                                
                                    </select>


                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Inventario</label>
                                    <input type="text" id="stock_field" className='form-control' defaultValue={productById.stock} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Vendedor</label>
                                    <input type="text" id="vendedor_field" className='form-control' defaultValue={productById.vendedor} />
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
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default EditProduct