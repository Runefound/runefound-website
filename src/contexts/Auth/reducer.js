// Local imports
import { initialState } from './initialState.js'





/**
 * Reducer function for handling application authentication state changes.
 *
 * @param {object} state The current authentication state.
 * @param {object} action The action used to transform the authentication state.
 * @returns {object} The new authentication state.
 */
export function reducer(state, action) {
	const {
		payload,
		type,
	} = action
	const newState = {
		...initialState,
		...state,
	}

	switch (type) {
		case 'attempt change password':
			newState.isChangingPassword = true
			break

		case 'attempt login':
			newState.isLoggedIn = false
			newState.isLoggingIn = true
			break

		case 'attempt reauthentication':
			newState.isReauthenticating = true
			break

		case 'attempt registration':
			newState.isRegistering = true
			break

		case 'attempt logout':
			newState.isLoggingOut = true
			break

		case 'auth state changed':
			if (payload) {
				newState.isLoggedIn = true
				newState.user = payload
			} else {
				newState.isLoggedIn = false
				newState.profile = null
				newState.settings = null
				newState.user = null
			}

			newState.isLoaded = true
			newState.isLoggingIn = false
			newState.isLoggingOut = false
			newState.isRegistering = false
			break

		case 'change password failure':
			if (payload.reauthenticationRequired) {
				newState.isReauthenticationRequired = true
			} else {
				newState.isChangingPassword = false
			}
			break

		case 'change password success':
			newState.isChangingPassword = false
			break

		case 'login failure':
			newState.isLoggedIn = false
			newState.isLoggingIn = false
			break

		case 'login success':
			newState.isLoggedIn = true
			newState.isLoggingIn = false
			break

		case 'logout failure':
			newState.isLoggedIn = true
			newState.isLoggingOut = false
			break

		case 'logout success':
			newState.isLoggedIn = false
			newState.isLoggingOut = false
			break

		case 'profile loaded':
			newState.profile = payload
			break

		case 'settings loaded':
			newState.settings = payload
			break

		case 'reauthentication failure':
			newState.isReauthenticating = false
			break

		case 'reauthentication success':
			newState.isReauthenticating = false
			newState.isReauthenticationRequired = false
			break

		case 'registration failure':
			newState.isRegistering = false
			break

		case 'registration success':
			newState.isRegistered = true
			newState.isRegistering = false
			break

		default:
			console.warn(`Unrecognized action dispatched: ${type}`, payload)
			return state
	}

	return newState
}
