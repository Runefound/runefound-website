// Style imports
import styles from './Form.module.scss'





// Module imports
import {
	forwardRef,
	useCallback,
	useMemo,
	useReducer,
} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'





// Local imports
import { createInitialState } from './createInitialState.js'
import { FormContext } from './FormContext.js'
import { reducer } from './reducer.js'





export const Form = forwardRef(function FormWithForwardedRef(props, ref) {
	const {
		children,
		className,
		initialValues,
		isDisabled,
		onSubmit,
	} = props
	const [state, dispatch] = useReducer(reducer, createInitialState({ initialValues }))

	const setInitialValue = useCallback((fieldID, value) => {
		dispatch({
			payload: {
				fieldID,
				value,
			},
			type: 'initial value changed',
		})
	}, [])

	const setName = useCallback((fieldID, name) => {
		dispatch({
			payload: {
				fieldID,
				value: name,
			},
			type: 'name changed',
		})
	}, [])

	const updateValidity = useCallback((fieldID, errors) => {
		dispatch({
			payload: {
				errors,
				fieldID,
			},
			type: 'validity changed',
		})
	}, [dispatch])

	const updateValue = useCallback((fieldID, value) => {
		dispatch({
			payload: {
				fieldID,
				value,
			},
			type: 'value changed',
		})
	}, [
		dispatch,
	])

	const reset = useCallback(options => {
		dispatch({
			payload: options,
			type: 'reset state',
		})
	}, [dispatch])

	const handleSubmit = useCallback(event => {
		event.preventDefault()
		onSubmit({
			values: Object
				.entries(state.values)
				.reduce((accumulator, [key, value]) => {
					accumulator[state.names[key] ?? key] = value
					return accumulator
				}, {}),
			state,
			updateValidity,
		})
	}, [
		onSubmit,
		state,
		updateValidity,
	])

	const compiledClassName = useMemo(() => {
		return classnames(styles.form, className)
	}, [className])

	const providerValue = useMemo(() => {
		return {
			...state,
			reset,
			setInitialValue,
			setName,
			updateValidity,
			updateValue,
		}
	}, [
		reset,
		setInitialValue,
		setName,
		state,
		updateValidity,
		updateValue,
	])

	return (
		<FormContext.Provider value={providerValue}>
			<form
				ref={ref}
				className={compiledClassName}
				onSubmit={handleSubmit}>
				<fieldset disabled={isDisabled}>
					{children}
				</fieldset>
			</form>
		</FormContext.Provider>
	)
})

Form.defaultProps = {
	children: null,
	className: null,
	initialValues: {},
	isDisabled: false,
	// eslint-disable-next-line jsdoc/require-jsdoc
	onSubmit: () => {},
}

Form.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	initialValues: PropTypes.object,
	isDisabled: PropTypes.bool,
	onSubmit: PropTypes.func,
}
