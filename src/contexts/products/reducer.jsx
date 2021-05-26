import { CLEAR_PRODUCT, GET_PRODUCTS, SET_PRODUCT } from "./types";

export const ProductInitialState = {
    products: [],
    product: null
}

const ProductsReducer = (state, { type, payload }) => {
    switch (type) {
        case GET_PRODUCTS:
            return { ...state, products: payload }
        case SET_PRODUCT:
            return { ...state, product: payload }
        case CLEAR_PRODUCT:
            return { ...state, product: null }
        default:
            return state
    }
}
 
export default ProductsReducer;
