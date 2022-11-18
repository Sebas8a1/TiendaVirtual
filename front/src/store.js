import {createStore, combineReducers, applyMiddleware} from 'redux';   
import thunk from 'redux-thunk'; 
import {composeWithDevTools} from 'redux-devtools-extension'; 
import {productsReducer, productDetailsReducer, newProductReducer, productReducer} from './reducer/productReducer'; 
import { authReducer, userReducer, forgotPasswordReducer} from './reducer/userReducer';  
import { cartReducer } from './reducer/cartReducer'; 

const reducers = combineReducers({
    // reducers
    // create a reducer for products
    products: productsReducer,  // products is the name of the state in the store and productsReducer is the reducer function that will be called when the action is dispatched to the store 
    // create a reducer for product details
    productDetails: productDetailsReducer, // productDetails is the name of the state in the store and productDetailsReducer is the reducer function that will be called when the action is dispatched to the store
    // create a reducer for auth
    auth:authReducer, // auth is the name of the state in the store and authReducer is the reducer function that will be called when the action is dispatched to the store
    // create a reducer for user
    user:userReducer, // user is the name of the state in the store and userReducer is the reducer function that will be called when the action is dispatched to the store
    // create a reducer for forgot password
    forgotPassword: forgotPasswordReducer, // forgotPassword is the name of the state in the store and forgotPasswordReducer is the reducer function that will be called when the action is dispatched to the store
    // create a reducer for cart
    cart: cartReducer, // cart is the name of the state in the store and cartReducer is the reducer function that will be called when the action is dispatched to the store
    //create a reducer for new product
    newProduct:newProductReducer, // newProduct is the name of the state in the store and newProductReducer is the reducer function that will be called when the action is dispatched to the store
    //create a reducer for product update and delete
    product: productReducer
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : []
    }
}

const middleware = [thunk];

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;