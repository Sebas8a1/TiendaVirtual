// import cart constants
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
} from '../constants/cartConstants';

// create cart reducer
export const cartReducer = (state = { cartItems: []}, action) => {
    switch (action.type) {

        case ADD_TO_CART:
            const item = action.payload;

            const isItemExist = state.cartItems.find(i => i.productById === item.productById)

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.productById === isItemExist.productById ? item : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.productById !== action.payload)
            }

        default:
            return state
    }
}

