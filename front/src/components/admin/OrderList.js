import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import Metadata from '../layout/Metadata'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allOrders, deleteOrder, clearErrors } from '../../actions/orderActions'
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'

const OrdersList = () => {
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector(state => state.allOrders);
    const { isDeleted } = useSelector(state => state.order)

    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Orden eliminada correctamente');
            navigate('/orderList');
            dispatch({ type: DELETE_ORDER_RESET })
        }

    }, [dispatch, alert, error, isDeleted])


    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Date',
                    field: 'fecha',
                    sort: 'asc'
                },
                {
                    label: 'Order N°',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: '# Items',
                    field: 'numItems',
                    sort: 'asc'
                },
                {
                    label: 'Total',
                    field: 'valorTotal',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'estado',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'acciones',
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            var fecha = new Date(order.fechaCreacion).toLocaleDateString()
            data.rows.push({
                fecha: fecha,
                id: order._id,
                numItems: order.items.length,
                valorTotal: `$${order.precioTotal}`,
                estado: order.estado && String(order.estado).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.estado}</p>
                    : <p style={{ color: 'red' }}>{order.estado}</p>,
                acciones: <Fragment>
                    <Link to={`/admin/order/${order._id}`} className="fa-sharp fa-solid fa-file-pen icon-border" ></Link>
                    <Link className="fa-sharp fa-solid fa-trash-can icon-border" onClick={() => deleteOrderHandler(order._id)}>

                    </Link>


                </Fragment>
            })
        })

        return data;
    }


    return (
        <Fragment>
            <Metadata title={'All Orders'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Orders</h1>

                        {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> : (
                            <MDBDataTable
                                data={setOrders()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default OrdersList