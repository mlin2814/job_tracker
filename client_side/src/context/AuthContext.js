/*
CODE CITATION
Title: MERN Auth tutorial source code
Author: The Net Ninja
Date: 2022
Type: Adapted from
Source: https://github.com/iamshaunjp/MERN-Auth-Tutorial
*/

import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        }
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )

}