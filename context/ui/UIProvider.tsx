import { FC, useReducer } from 'react'
import { UIContext, uiReducer } from './'

interface Props {
    children?: React.ReactNode | undefined
}

export interface UIState {
    isMenuOpen: boolean
}

const UI_INITIAL_STATE = {
    isMenuOpen: false
}

export const UIProvider:FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer( uiReducer, UI_INITIAL_STATE )

    const toggleSideMenu = () => {
        dispatch({ type: '[UI] Toggle Menu' })
    }

    return (
        <UIContext.Provider value={{ ...state, toggleSideMenu }}>
            {children}
        </UIContext.Provider>
    )
}   