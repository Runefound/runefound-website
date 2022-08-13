// Module imports
import { createContext } from 'react'





// Local imports
import { initialState } from './initialState.js'





export const AuthContext = createContext({
	...initialState,
	// eslint-disable-next-line jsdoc/require-jsdoc
	changePassword: () => {},
	// eslint-disable-next-line jsdoc/require-jsdoc
	login: () => {},
	// eslint-disable-next-line jsdoc/require-jsdoc
	logout: () => {},
	// eslint-disable-next-line jsdoc/require-jsdoc
	reauthenticate: () => {},
	// eslint-disable-next-line jsdoc/require-jsdoc
	register: () => {},
	// eslint-disable-next-line jsdoc/require-jsdoc
	validateEmail: () => {},
	// eslint-disable-next-line jsdoc/require-jsdoc
	validateUsername: () => {},
})
