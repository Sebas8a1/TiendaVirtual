import axios from 'axios';

import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL
} from '../constants/productConstants';

// Get all products
export const getProducts = (currentPage = 1, keyword = '', precio) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST });

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&precio[gte]=${precio[0]}&precio[lte]=${precio[1]}`

        const { data } = await axios.get(link);


        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data// payload: { products: data.products, productsCount: data.productsCount }
        });

    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message // Path: back\controllers\productsController.js
        });
    }
}

//Get All products Admin

export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCTS_REQUEST })

        const { data } = await axios.get('/api/v1/admin/products')

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products

        })
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })

    }
}

//New product Admin

export const newProduct=(productData)=>async(dispatch)=>{
    try{
        dispatch({type:NEW_PRODUCT_REQUEST})

        const config={
            header:{'Content-Type':'application/json'}//Me trae la información como un json
        }
          
        const {data}=await axios.post('/api/v1/product/new',productData,config)//Ruta del back donde va a post

        dispatch({
            type:NEW_PRODUCT_SUCCESS,//Si todo sale bien, hace esto
            payload:data
        })
        
    }catch(error){
        dispatch({
            type:NEW_PRODUCT_FAIL,
            payload:error.response.data.message
        })
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