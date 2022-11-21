/*
CODE CITATION
Title: MERN Auth tutorial source code
Author: The Net Ninja
Date: 2022
Type: Adapted from
Source: https://github.com/iamshaunjp/MERN-Auth-Tutorial
*/

import { JobsContext } from "../context/JobContext"
import { useContext } from "react"

export const useJobsContext = () => {
  const context = useContext(JobsContext)

  if (!context) {
    throw Error('useJobsContext must be used inside a JobsContextProvider')
  }

  return context
}