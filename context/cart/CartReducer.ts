import { ICartProduct } from "../../interfaces";
import {CartState} from ".";
import { ShippingAddress } from "./CartProvider";

type CartActionType = 
| {type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[]}
| {type: '[Cart] - Update Products in Cart', payload: ICartProduct[]}
| {type: '[Cart] - Change Cart Quantity', payload: ICartProduct}
| {type: '[Cart] - Remove Products from Cart', payload: ICartProduct}
| {type: '[Cart] - LoadAddress from cookies', payload: ShippingAddress}
| {type: '[Cart] - Update shipping address', payload: ShippingAddress}
| {
    type: '[Cart] - Update order summary',
    payload: {
        numberOfItems: number,
        subTotal: number,
        tax: number,
        total: number
    }
}

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
    switch (action.type) {
        case '[Cart] - LoadCart from cookies | storage':
            return {
                ...state,
                isLoaded: true,
                cart: [...action.payload]
            }

        case '[Cart] - Update Products in Cart':
            return {
                ...state,
                cart: [...action.payload]
            }

            case '[Cart] - Change Cart Quantity':
            return {
                ...state,
                cart: state.cart.map( product => {
                    if (product._id !== action.payload._id) return product
                    if (product.size !== action.payload.size) return product

                    product.quantity = action.payload.quantity;
                    return action.payload
                })
           }

           case '[Cart] - Remove Products from Cart':
            return {
                ...state,
                // si es el mismo producto y size, filtralo y devolveme el resto del state.
                cart: state.cart.filter( product => !(product._id === action.payload._id && product.size === action.payload.size))
            }

            case '[Cart] - Update order summary':
            return {
                ...state,
                ...action.payload
            }

            case '[Cart] - LoadAddress from cookies':
            case '[Cart] - Update shipping address':
            return {
                ...state,
                shippingAddress: action.payload
            }

            default:
                return state
    }
}