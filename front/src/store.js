import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productsReducer, productDetailsReducer} from './reducer/productReducer';
import { authReducer } from './reducer/userReducer';

const reducers = combineReducers({
    // reducers
    products: productsReducer,
    productDetails: productDetailsReducer,
    authUser:authReducer
})

let initialState = {}

const middleware = [thunk];

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
