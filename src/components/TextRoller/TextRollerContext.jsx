// Module imports
import { createContext } from 'react'





// Local imports
import { initialState } from './initialState.js'





export const TextRollerContext = createContext({
	...initialState,

	// eslint-disable-next-line jsdoc/require-jsdoc
	addWidth: () => {},
	// eslint-disable-next-line jsdoc/require-jsdoc
	updatePrimaryIndex: () => {},
})
