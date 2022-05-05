import {FC, useReducer, useEffect} from 'react';
import Cookie from 'js-cookie';
import {ICartProduct} from '../../interfaces';
import {CartContext, cartReducer} from './';

interface Props {
    children?: React.ReactNode | undefined
}

export interface CartState {
    cart: ICartProduct[]
}

const CART_INITIAL_STATE: CartState = {
    cart: Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
}

export const CartProvider: FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    
    useEffect(() => {

        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')! ) : []
            dispatch({type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts})
            
        } catch (error) {
            dispatch({type: '[Cart] - LoadCart from cookies | storage', payload: []})
        }

    }, [])

    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart))
    }, [state.cart])



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

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({type: '[Cart] - Change Cart Quantity', payload: product})
    }

    const removeProductFromCart = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - Remove Products from Cart', payload: product})
    }

    return (
        <CartContext.Provider value={{
            ...state,

            // methods 
            addProductToCart,
            updateCartQuantity,
            removeProductFromCart
        }}>
            {children}
        </CartContext.Provider>
    )
}