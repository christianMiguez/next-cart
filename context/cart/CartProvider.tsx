import { FC, useReducer, useEffect } from 'react';
import Cookie from 'js-cookie';
import { ICartProduct, IOrder, ShippingAddress } from '../../interfaces';
import { CartContext, cartReducer } from './';
import tesloAPI from '../../api/tesloAPI';
import axios from 'axios';

interface Props {
    children?: React.ReactNode | undefined
}


export interface CartState {
    isLoaded: boolean
    cart: ICartProduct[],
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    shippingAddress?: ShippingAddress;
}


const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,

    shippingAddress: undefined

}

export const CartProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);


    useEffect(() => {

        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts })

        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] })
        }

    }, [])

    useEffect(() => {

        if (Cookie.get('firstName')) {
            const shippingAddress = {
                firstName: Cookie.get('firstName') || '',
                lastName: Cookie.get('lastName') || '',
                address: Cookie.get('address') || '',
                address2: Cookie.get('address2') || '',
                zip: Cookie.get('zip') || '',
                city: Cookie.get('city') || '',
                country: Cookie.get('country') || '',
                phone: Cookie.get('phone') || '',
            }
            dispatch({ type: '[Cart] - LoadAddress from cookies', payload: shippingAddress });
        }

    }, [])


    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart))
    }, [state.cart])

    useEffect(() => {

        const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0);
        const subTotal = state.cart.reduce((prev, current) => (current.price * current.quantity) + prev, 0);
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * (taxRate + 1)
        }

        dispatch({ type: '[Cart] - Update order summary', payload: orderSummary })

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
        if (!productInCartButDifferentSize) {
            return dispatch({
                type: '[Cart] - Update Products in Cart',
                payload: [...state.cart, product]
            })
        }

        // acumular
        const updatedProducts = state.cart.map(p => {
            if (p._id !== product._id) return p;
            if (p.size !== product.size) return p;

            p.quantity += product.quantity;
            return p
        })

        dispatch({ type: '[Cart] - Update Products in Cart', payload: updatedProducts })
    }

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - Change Cart Quantity', payload: product })
    }

    const removeProductFromCart = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - Remove Products from Cart', payload: product })
    }

    const updateAddress = (address: ShippingAddress) => {
        Cookie.set('firstName', address.firstName);
        Cookie.set('lastName', address.lastName);
        Cookie.set('address', address.address);
        Cookie.set('address2', address.address2 || '');
        Cookie.set('zip', address.zip);
        Cookie.set('city', address.city);
        Cookie.set('country', address.country);
        Cookie.set('phone', address.phone);
        dispatch({ type: '[Cart] - Update shipping address', payload: address })
    }

    const createOrder = async (): Promise<{ hasError: boolean; message: string }> => {

        if (!state.shippingAddress) {
            throw new Error('No shipping address')
        }

        const body: IOrder = {
            orderItems: state.cart.map(product => ({
                ...product,
                size: product.size!
            })),
            shippingAddress: state.shippingAddress,
            numberOfItems: state.numberOfItems,
            subTotal: state.subTotal,
            tax: state.tax,
            total: state.total,
            isPaid: false
        }

        try {
            const { data } = await tesloAPI.post<IOrder>('/orders', body);
            TODO: dispatch({ type: '[Cart] - Order Complete' })
            return {
                hasError: false,
                message: data._id!
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.message || 'Error al crear la orden'
                }
            }
            return {
                hasError: true,
                message: 'Unknown error'
            }
        }
    }

    return (
        <CartContext.Provider value={{
            ...state,

            // methods 
            addProductToCart,
            updateCartQuantity,
            removeProductFromCart,
            updateAddress,
            createOrder
        }}>
            {children}
        </CartContext.Provider>
    )
}