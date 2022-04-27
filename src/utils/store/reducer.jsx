export const initialState = {
    productArray : [],
    currentProduct: {},
    updatedProduct : {}
}

export function productsReducer(state = initialState, action) {
    switch(action.type) {
        case "get_products": 
        return {
            ...state,
            productArray: action.payload
        }

        case "current_product":
            return {
                ...state,
                currentProduct: action.payload
            }

        case "updated_product":
            return {
                ...state,
                updatedProduct: action.payload
            }

        default:
            return state
    }
}