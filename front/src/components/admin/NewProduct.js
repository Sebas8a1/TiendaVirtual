import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearErrors, newProduct } from '../../actions/productActions'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
import { Metadata } from '../layout/Metadata'
import Sidebar from './Sidebar'


const NewProduct = () => {

    //Declaro las variables y sus valores de inicio

    const [nombre, setNombre] = useState("")
    const [precio, setPrecio] = useState(0)
    const [descripcion, setDescripcion] = useState("")
    const [categoria, setCategoria] = useState("")
    const [stock, setStock] = useState("")
    const [vendedor, setVendedor] = useState("")
    const [imagen, setImagen] = useState([])//es un arreglo que comienza vacio
    const [imagenPreview, setImagenPreview] = useState([])

    //creamos arreglo con categorias

    const categorias = [
        '',
        'Literatura y linguisticos',
        'Cientificos',
        'De viajes',
        'Biografias',
        'Libro de texto',
        'De referencia y consulta',
        'Monografias',
        'Recreativos',
        'Poeticos',
        'Juveniles',
        'Ficcion',
        'Comedia',
        'Drama',
        'Terror',
        'Ciencia ficcion',
        'Fantasia',
        'Romance',
        'Novela',
        'Poesia',
        'Teatro',
        'Cuentos',
        'Ensayos',
        'Historia',
        'Filosofia',
        'Religion',
        'Ciencias sociales',
        'Ciencias naturales',
        'Matematicas',
        'Ciencias de la salud',
        'Ciencias de la tierra',
        'Ciencias de la computacion',
        'Ciencias de la ingenieria',
        'Ciencias economicas',
        'Ciencias politicas',
        'Ciencias de la educacion',
        'Ciencias de la comunicacion',
        'Ciencias de la administracion',
        'Ciencias de la agricultura',
        'Ciencias de la medicina',
        'Ciencias de la fisica'

    ]

    //creamos alertas y distpach

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector(state => state.newProduct)//este state viene del store
    const navigate = useNavigate();//Para que cuando cree el producto me redirija a algun lado

    //creamos mensaje en caso de error

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors)
        }
        if (success) {
            navigate("/admin/dashboard")
            alert.success("Producto registrado con exito")
            dispatch({ type: NEW_PRODUCT_RESET })//Para que se limpie la pantalla

        }
    }, [dispatch, alert, error,success])//esto es lo que se lleva

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("nombre", nombre);
        formData.set("precio", precio);
        formData.set("descripcion", descripcion);
        formData.set("categoria", categoria);
        formData.set("stock", stock);
        formData.set("vendedor", vendedor)

        imagen.forEach(img => {
            formData.append("imagen", img)
        })

        dispatch(newProduct(formData))//es el new product del actions

    }

    const onChange = e => {
        const files = Array.from(e.target.files)
        setImagenPreview([])
        setImagen([])

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagenPreview(oldArray => [...oldArray, reader.result])
                    setImagen(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
        
    }


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
                            <form className="shadow-lg" onSubmit={submitHandler} encType='application/json'>
                                <h1 className="mb-4">Nuevo libro</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Nombre</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}

                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Precio</label>
                                    <input
                                        type="number"
                                        id="price_field"
                                        className="form-control"
                                        value={precio}
                                        onChange={(e) => setPrecio(e.target.value)}


                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Descripcion</label>
                                    <textarea className="form-control" id="description_field" rows="8"
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}


                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Categoria</label>
                                    <select id="categoria_field" className='form-control'
                                        value={categoria}
                                        onChange={(e) => setCategoria(e.target.value)} >
                                        {categorias.map(categoria => (
                                            <option key={categoria} value={categoria}>{categoria}</option>
                                        ))}



                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Inventario</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}

                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Vendedor</label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                        value={vendedor}
                                        onChange={(e) => setVendedor(e.target.value)}

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
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Seleccione Imagen
                                        </label>
                                    </div>
                                    {imagenPreview.map(img => (
                                        <img src={img} key={img} alt="Vista previa de la imagen" className="mt-3 mr-2" width="55" height="55" />
                                    ))}

                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="button py-2"
                                    disabled={loading ? true : false}
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