import axios from "axios"

import { ORDER_CREATE_REQUEST,ORDER_CREATE_SUCCESS,ORDER_CREATE_FAIL,CLEAR_ERRORS } from "../constants/orderConstants"


export const createOrder=(order)=>async (dispatch)=>{
    try{
        dispatch({type:ORDER_CREATE_REQUEST})
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }

        const {data}= await axios.post("/api/v1/order/new",order,config)
        
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload:data
        })    
    }catch(error){
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload:error.response.data.message
        })
    }
}

//Clear Errors 

export const clearErrors=()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}