// Module imports
import { useContext } from 'react'





// Local imports
import { FormFieldContext } from './FormFieldContext.js'





/**
 * @returns {object} The context of the nearest parent form field.
 */
export function useFormFieldContext() {
	return useContext(FormFieldContext)
}
