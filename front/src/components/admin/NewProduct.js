import React, { Fragment } from 'react'
import { Metadata } from '../layout/Metadata'
import Sidebar from './Sidebar'


const NewProduct = () => {


    return (
        <Fragment>
            <Metadata title={'Nuevo Producto'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg"  encType='multipart/form-data'>
                                <h1 className="mb-4">Nuevo libro</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Nombre</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Descripcion</label>
                                    <textarea className="form-control" id="description_field" rows="8"></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Categoria</label>
                                    <select id="categoria_field" className='form-control' >
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
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Vendedor</label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                    
                                    />
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
                                    Crear
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default NewProduct