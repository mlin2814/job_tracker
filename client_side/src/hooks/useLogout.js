/*
CODE CITATION
Title: MERN Auth tutorial source code
Author: The Net Ninja
Date: 2022
Type: Adapted from
Source: https://github.com/iamshaunjp/MERN-Auth-Tutorial
*/

import { useAuthContext } from './useAuthContext'
import { useJobsContext } from "./useJobsContext";
import { useContactsContext } from "./useContactsContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: dispatchJobs } = useJobsContext()
    const { dispatch: dispatchContacts } = useContactsContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({ type: 'LOGOUT' })
        dispatchJobs({ type: 'SET_JOBS', payload: null })
        dispatchContacts({ type: 'SET_CONTACTS', payload: null })
    }

    return { logout }
}