// Module imports
import { createContext } from 'react'





// Local imports
import { defaultState } from './defaultState.js'





export const FormContext = createContext({
	...defaultState,
	// eslint-disable-next-line jsdoc/require-jsdoc
	reset: () => {},
	// eslint-disable-next-line jsdoc/require-jsdoc
	updateValidity: () => {},
	// eslint-disable-next-line jsdoc/require-jsdoc
	updateValue: () => {},
})
