import Cookies from 'js-cookie';
import {FC, useEffect, useReducer} from 'react';
import { tesloAPI } from '../../api';
import {IUser} from '../../interfaces';
import { AuthContext, authReducer } from './';
import axios from 'axios'

interface Props {
    children?: React.ReactNode | undefined
}

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
};

export const AuthProvider: FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

    useEffect(() => {
        checkToken()
    }, []);
    
    const checkToken = async () => {
        try {
            const {data} = await tesloAPI.get('/user/validate-token')
            const {token, user} = data;
            Cookies.set('token', token);
            dispatch({type: '[Auth] Login', payload: user});
            return true
        } catch (error) {
            Cookies.remove('token');
            return false
        }
    }

    const loginUser = async(email: string, password: string):Promise<boolean> => {
        try {
            const {data} = await tesloAPI.post('/user/login', {email, password})
            const {token, user} = data;
            Cookies.set('token', token);
            dispatch({type: '[Auth] Login', payload: user});
            return true
        } catch (error) {
            return false
        }
    }

    const registerUser = async(email: string, password: string, name: string):  Promise<{hasError: boolean, message?: string}> => {
        try {
            const {data} = await tesloAPI.post('/user/register', {name, email, password})
            const {token, user} = data;
            Cookies.set('token', token);
            dispatch({type: '[Auth] Login', payload: user});
            return {
                hasError: false,
                message: 'Todo ok'
            }
        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: error.message,
                }
            }

            return {
                hasError: true,
                message: 'Ocurrió un error inesperado'
            }

        }

    }


    return (
        <AuthContext.Provider value={{
            ...state,

            // methods
            loginUser,
            registerUser
        }}>

        {children}
    </AuthContext.Provider>
    ); 
}