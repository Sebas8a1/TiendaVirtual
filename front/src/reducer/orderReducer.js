import { CLEAR_ERRORS } from '../constants/orderConstants'
import {ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL
} from '../constants/orderConstants'



export const newOrderReducer=(state={},action)=>{
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return{
                ...state,
                loading:true
            }
        case ORDER_CREATE_SUCCESS:
            return{
                loading:false,
                success:action.payload.success,
                order:action.payload
            }
        case ORDER_CREATE_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state
        
    }
}