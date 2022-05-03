import {FC, useReducer} from 'react';
import {ICartProduct} from '../../interfaces';
import {CartContext, cartReducer} from './';

interface Props {
    children?: React.ReactNode | undefined
}

export interface CartState {
    cart: ICartProduct[]
}

const CART_INITIAL_STATE: CartState = {
    cart: []
}

export const CartProvider: FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    const addProductToCart = (product: ICartProduct) => {
        const productInCart = state.cart.some(cartProduct => cartProduct._id === product._id);
        if (!productInCart) {
            return dispatch({
                type: '[Cart] - Update Products in Cart',
                payload: [...state.cart, product]
            })
        }

        const productInCartButDifferentSize = state.cart.some(cartProduct => cartProduct._id === product._id && cartProduct.size === product.size);
        if (! productInCartButDifferentSize) {
            return dispatch({
                type: '[Cart] - Update Products in Cart',
                payload: [...state.cart, product]
            })
        }

        // acumular
        const updatedProducts = state.cart.map (p => {
            if (p._id !== product._id) return p;
            if (p.size !== product.size) return p;

            p.quantity += product.quantity;
            return p
        })

        dispatch({ type: '[Cart] - Update Products in Cart', payload: updatedProducts })
    }

    return (
        <CartContext.Provider value={{
            ...state,

            // methods 
            addProductToCart
        }}>
            {children}
        </CartContext.Provider>
    )
}