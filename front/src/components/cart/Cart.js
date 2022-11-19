import React, { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Metadata } from '../layout/Metadata'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions'


const Cart = () => {
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)
    const {user}=useSelector(state=>state.auth)

    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1;

        if (newQty > stock) return;

        console.log(newQty)

        dispatch(addItemToCart(id, newQty))
    }

    const decreaseQty = (id, quantity) => {
        const newQty = quantity - 1;

        if (newQty <= 0) return;

        dispatch(addItemToCart(id, newQty))
    }

    const checkOutHandler=()=>{
        if(user){
            navigate("/shipping")

        }else{
            navigate("/login")
        }

    }

    const removeFromCart = (id) => {
        dispatch(removeItemFromCart(id))
    }

    return (
        
        <Fragment>
            <Metadata title={'Your Cart'} />


            {cartItems.length === 0 ? <h2 className="mt-5">Your cart is empty</h2> : (
                <Fragment>

                    <h2 className="mt-5">Cart: <b>{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} items</b></h2>

                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">

                            {cartItems && cartItems.map(item => (
                                <Fragment>
                                    <hr />

                                    <div className="cart-item" key={item.nombre}>
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={item.imagen} alt={item.nombre} height="90" width="115" />
                                            </div>

                                            <div className="col-5 col-lg-3">
                                                <Link to={`/product/${item.productById}`}>{item.nombre}</Link>
                                            </div>


                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">${item.precio}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span className="btn btn-danger minus" onClick={() => decreaseQty(item.productById, item.quantity)} >-</span>
                                                    <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />
                                                    <span className="btn btn-primary plus" onClick={() => increaseQty(item.productById, item.quantity, item.stock)} >+</span>
                                                </div>
                                            </div>

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeFromCart(item.productById)}></i>
                                            </div>

                                        </div>
                                    </div>
                                    <hr />
                                </Fragment>

                            ))}
                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Total Amount</h4>
                                <hr />
                                <p>Products: <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0).toFixed(2)}</span></p>
                                <p>Subtotal: <span className="order-summary-values">${cartItems.reduce((acc, item) => (acc + Number(item.quantity * item.precio)), 0).toFixed(2)}</span></p>

                                <hr />
                                <button id="login_button" type="submit" className="button py-2" onClick={checkOutHandler}>Purchase!</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Cart