// Module imports
import { useContext } from 'react'





// Local imports
import { FormContext } from './FormContext.js'





/**
 * @returns {object} The context of the nearest parent form.
 */
export const useForm = () => useContext(FormContext)
