import axios from 'axios';

import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants';

// Get all products
export const getProducts = ( keyword='', currentPage = 1 ) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST });

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}`;
        const { data } = await axios.get(link); // Path: back\src\routes\productRoutes.js

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data // payload: { products: data.products, productsCount: data.productsCount }
        });

    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message // Path: back\controllers\productsController.js
        });
    }
} 

// Get product details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        
        const { data } = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data // payload: { productById: data.productById }
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL, 
            payload: error.response.data.message // error.response.data.message is the error message from the backend
        });
    }
}


// Clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}