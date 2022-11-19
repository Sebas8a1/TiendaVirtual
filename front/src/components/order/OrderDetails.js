import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom'
import { clearErrors, getOrderDetails } from '../../actions/orderActions';
import Metadata from '../layout/Metadata'

export const OrderDetails = () => {
    const navigate=useNavigate();
    const params= useParams();
    const alert= useAlert();
    const dispatch= useDispatch();
    const {loading, error, order={}}= useSelector(state=> state.orderDetails)
    const { envioInfo, items, pagoInfo, precioTotal, estado} = order
    const { user } = useSelector(state => state.auth)

    useEffect(()=>{
        dispatch(getOrderDetails(params.id));
        if (error){
            alert.error(error)
            dispatch(clearErrors)
        }
    },[dispatch, alert, error, params.id])
    const detalleEnvio= envioInfo && `${envioInfo.direccion}, ${envioInfo.ciudad}, ${envioInfo.departamento}`

    const esPago= pagoInfo && pagoInfo.estado==="Aceptado" ? true : false

  return (
    <Fragment>
            <Metadata title={'Detalle del Pedido'} />

            {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> : (
                <Fragment>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8 mt-5 order-details">

                            <h1 className="my-5">Order N° {order._id}</h1>

                            <h4 className="mb-4">Shipping Information</h4>
                            <p><b>name:</b> {user && user.nombre}</p>
                            <p><b>Phone N°:</b> {envioInfo && envioInfo.telefono}</p>
                            <p className="mb-4"><b>Address:</b>{detalleEnvio}</p>
                            <p><b>Total Amount</b> ${precioTotal}</p>

                            <hr />

                            <h4 className="my-4">Payment</h4>
                            <p className={esPago ? "greenColor" : "redColor"}><b>{esPago ? "Successful Payment" : "Pending"}</b></p>

                            <h4 className="my-4">Status Order:</h4>
                            <p className={order.estado && String(order.estado).includes('Delivered') ? "greenColor" : "redColor"} ><b>{estado}</b></p>

                            <h4 className="my-4">Purchased Products</h4>

                            <hr />
                            <div className="cart-item my-1">
                                {items && items.map(item => (
                                    <div key={item.product} className="row my-5">
                                        <div className="col-4 col-lg-2">
                                            <img src={item.imagen} alt={item.nombre} height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-5">
                                            <Link to={`/producto/${item.product}`}>{item.nombre}</Link>
                                        </div>

                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p>${item.precio}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p>{item.cantidad} Qyuantity</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="btn ml-4" id="login_btn" onClick={() => navigate(-1)}>Back</button>
                            <hr />
                        </div>
                    </div>
                </Fragment>
            )}

        </Fragment>
  )
}