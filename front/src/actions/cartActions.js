import axios from "axios";
import {ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`)

    dispatch({
        type: ADD_TO_CART,
        payload: {
            productById: data.productById._id,
            nombre: data.productById.nombre,
            imagen: data.productById.imagen[0].url,
            precio: data.productById.precio,
            stock: data.productById.stock,
            quantity
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_FROM_CART,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}