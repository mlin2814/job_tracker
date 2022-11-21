/*
CODE CITATION
Title: MERN Auth tutorial source code
Author: The Net Ninja
Date: 2022
Type: Adapted from
Source: https://github.com/iamshaunjp/MERN-Auth-Tutorial
*/

import { ContactsContext } from "../context/ContactContext"
import { useContext } from "react"

export const useContactsContext = () => {
  const context = useContext(ContactsContext)

  if (!context) {
    throw Error('useContactsContext must be used inside a ContextsContextProvider')
  }

  return context
}