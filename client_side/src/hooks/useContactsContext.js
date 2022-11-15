import { ContactsContext } from "../context/ContactContext"
import { useContext } from "react"

export const useContactsContext = () => {
  const context = useContext(ContactsContext)

  if(!context) {
    throw Error('useContactsContext must be used inside a ContextsContextProvider')
  }

  return context
}