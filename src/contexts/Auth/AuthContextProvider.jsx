// Module imports
import {
	useCallback,
	useEffect,
	useMemo,
	useReducer,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import {
	EmailAuthProvider,
	getAuth,
	onAuthStateChanged,
	onIdTokenChanged,
	reauthenticateWithCredential,
	signInWithEmailAndPassword,
	signOut,
	updatePassword,
} from '../../helpers/firebase.js'
import { AuthContext } from './AuthContext.js'
import { initialState } from './initialState.js'
import { reducer } from './reducer.js'
import * as API from '../../helpers/API.js'
import * as Cookies from '../../helpers/Cookies.js'





/**
 * Provides authentication context for the entire app.
 *
 * @param {object} props All props.
 * @param {import('react').ReactNode} [props.children] The contents of the component.
 */
export function AuthContextProvider(props) {
	const { children } = props
	const [state, dispatch] = useReducer(reducer, { ...initialState })

	const changePassword = useCallback(async password => {
		dispatch({ type: 'attempt change password' })

		try {
			await updatePassword(state.user, password)
			dispatch({ type: 'change password success' })
		} catch (error) {
			if (error.code === 'auth/requires-recent-login') {
				return dispatch({
					payload: {
						reauthenticationRequired: true,
					},
					type: 'change password failure',
				})
			}

			dispatch({ type: 'change password failure' })
		}
	}, [
		dispatch,
		state.user,
	])

	const validateEmail = useCallback(async email => {
		let response = null

		try {
			response = await API.validateEmail(email)
		} catch (error) {
			console.log(error)
		}

		if (response.status === 204) {
			return true
		}

		return false
	}, [])

	const validateUsername = useCallback(async username => {
		let response = null

		try {
			response = await API.validateUsername(username)
		} catch (error) {
			console.log(error)
		}

		if (response.status === 204) {
			return true
		}

		return false
	}, [])

	const handleAuthStateChanged = useCallback(user => {
		dispatch({
			payload: user,
			type: 'auth state changed',
		})
	}, [dispatch])

	const handleIDTokenChange = useCallback(async user => {
		if (user) {
			const idToken = await user.getIdToken()

			Cookies.set('firebaseAuthToken', idToken, {
				maxAge: 60 * 60 * 24 * 30,
				path: '/',
			})
		} else {
			Cookies.remove('firebaseAuthToken')
		}
	}, [])

	const login = useCallback(async(email, password) => {
		dispatch({ type: 'attempt login' })

		try {
			await signInWithEmailAndPassword(getAuth(), email, password)
			return dispatch({ type: 'login success' })
		} catch (error) {
			dispatch({ type: 'login failure' })
			throw error
		}
	}, [dispatch])

	const logout = useCallback(async() => {
		dispatch({ type: 'attempt logout' })

		try {
			await signOut(getAuth())
			return dispatch({ type: 'logout success' })
		} catch (error) {
			return dispatch({ type: 'logout failure' })
		}
	}, [dispatch])

	const reauthenticate = useCallback(async password => {
		try {
			dispatch({ type: 'attempt reauthentication' })

			const credential = EmailAuthProvider.credential(
				state.user.email,
				password,
			)
			await reauthenticateWithCredential(state.user, credential)

			dispatch({ type: 'reauthentication success' })
		} catch (error) {
			console.log({ error })
			dispatch({ type: 'reauthentication failure' })
		}
	}, [
		dispatch,
		state.user,
	])

	const register = useCallback(async user => {
		dispatch({ type: 'attempt registration' })

		try {
			await API.createAccount(user)

			dispatch({ type: 'registration success' })
			await login(user.email, user.password)
		} catch (error) {
			dispatch({ type: 'registration failure' })
			throw error
		}
	}, [
		dispatch,
		login,
	])

	useEffect(() => {
		onAuthStateChanged(getAuth(), handleAuthStateChanged)
	}, [handleAuthStateChanged])

	useEffect(() => {
		onIdTokenChanged(getAuth(), handleIDTokenChange)
	}, [handleIDTokenChange])

	const providerValue = useMemo(() => {
		return {
			...state,
			changePassword,
			login,
			logout,
			reauthenticate,
			register,
			validateEmail,
			validateUsername,
		}
	}, [
		changePassword,
		login,
		logout,
		reauthenticate,
		register,
		state,
		validateEmail,
		validateUsername,
	])

	return (
		<AuthContext.Provider value={providerValue}>
			{children}
		</AuthContext.Provider>
	)
}

AuthContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
}
