import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { clearErrors, getProductDetails, updateProduct } from '../../actions/productActions'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'
import  Metadata  from '../layout/Metadata'
import Sidebar from './Sidebar'



export const EditProduct = () => {

    //Declaro las variables y sus valores de inicio

    const navigate = useNavigate();//Para que cuando cree el producto me redirija a algun lado
    const params = useParams();//Para que me traiga el id como parametro
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState(0);
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [stock, setStock] = useState(0);
    const [vendedor, setVendedor] = useState("")
    const [imagen, setImagen] = useState([])//es un arreglo que comienza vacio
    const [imagenPreview, setImagenPreview] = useState([])
    const [oldImagen, setOldImagen] = useState([])//Arreglo que considera las imagenes anteriores

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
    const { loading, isUpdated, error: updateError } = useSelector(state => state.product)//este state viene del store//Cargo los estados que creé en el reducer para updated
    const { error, productById } = useSelector(state => state.productDetails)//Este estado viene del store y me trae la info de los productos


    const productId = params.id;


    //creamos mensaje en caso de error

    useEffect(() => {
        if (productById && productById._id !== productId) {
            dispatch(getProductDetails(productId));
        } else {//Aqui ya llena los campos vacios
            setNombre(productById.nombre);
            setPrecio(productById.precio);
            setDescripcion(productById.descripcion);
            setCategoria(productById.categoria);
            setVendedor(productById.vendedor);
            setStock(productById.stock);
            setOldImagen(productById.imagen)
        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors)
        }
        if (updateError) {
            alert.error(error)
            dispatch(clearErrors)
        }
        if (isUpdated) {
            alert.success("Producto actualizado correctamente")
            navigate("/admin/dashboard")
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }
    }, [dispatch, alert, error, isUpdated, updateError, productById, productId, navigate])//esto es lo que se lleva, voy a sacar toda la info por si la necesito

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

        dispatch(updateProduct(productById._id, formData))//es el updateProduct del actions

    }

    const onChange = e => {
        const files = Array.from(e.target.files)
        setImagenPreview([])
        setImagen([])
        setOldImagen([])

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
            <Metadata title={'Edit Book'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Edit Book</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input type="text" id="name_field" className='form-control'
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)} />


                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={precio}
                                        onChange={(e) => setPrecio(e.target.value)}

                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control"
                                        id="description_field"
                                        rows="8"
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select id="categoria_field" className='form-control' value={categoria}
                                        onChange={(e) => setCategoria(e.target.value)} >
                                        {categorias.map(categoria => (
                                            <option key={categoria} value={categoria}>{categoria}</option>
                                        ))}

                                    </select>


                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input type="text" id="stock_field" className='form-control'
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Seller</label>
                                    <input type="text" id="vendedor_field" className='form-control'
                                        value={vendedor}
                                        onChange={(e) => setVendedor(e.target.value)} />
                                </div>

                                <div className='form-group'>
                                    <label>Images</label>

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
                                            Select Image
                                        </label>
                                    </div>

                                    {oldImagen && oldImagen.map(img => (
                                        <img key={img} src={"../"+img.url} alt="imagen del libro" className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                    {imagenPreview.map(img => (
                                        <img src={img} key={img} alt="Vista Previa" className="mt-3 mr-2" width="55" height="52" />
                                    ))}

                                </div>


                                <button
                                    id="login_button"
                                    type="submit"
                                    className="button py-2"
                                    disabled={loading ? true : false}
                                >
                                    Update
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