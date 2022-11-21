import { createContext, useReducer } from 'react'

export const SkillsContext = createContext()

export const skillsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SKILLS':
            return { 
                skills: action.payload 
            }
        case 'CREATE_SKILL':
            return { 
                skills: [action.payload, ...state.skills] 
            }
        case 'EDIT_SKILL':
            return { 
                skills: state.skills.map(s => {
                    if (s._id === action.payload._id) {
                        return action.payload
                    } else {
                        return s
                    }
                }) 
            }
        case 'DELETE_SKILL':
            return { 
                skills: state.skills.filter(s => s._id !== action.payload._id) 
            }
        default:
            return state
    }
}

export const SkillsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(skillsReducer, { 
    skills: null
  })
  
  return (
    <SkillsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </SkillsContext.Provider>
  )
}