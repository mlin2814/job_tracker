import { createContext, useReducer } from 'react'

export const JobsContext = createContext()

export const jobsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_JOBS':
            return { 
                jobs: action.payload 
          }
        case 'CREATE_JOB':
            return { 
                jobs: [action.payload, ...state.jobs] 
            }
        case 'EDIT_JOB':
            return { 
                jobs: state.jobs.map(j => {
                    if (j._id === action.payload._id) {
                        return action.payload
                    } else {
                        return j
                    }
                }) 
            }
        case 'DELETE_JOB':
            return { 
                jobs: state.jobs.filter(j => j._id !== action.payload._id) 
            }
        default:
            return state
    }
}

export const JobsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobsReducer, { 
    jobs: null
  })
  
  return (
    <JobsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </JobsContext.Provider>
  )
}