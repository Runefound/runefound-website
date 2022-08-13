// Module imports
import {
	forwardRef,
	useCallback,
	useMemo,
	useReducer,
} from 'react'
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

	const updateValidity = useCallback((fieldName, errors) => {
		dispatch({
			payload: {
				errors,
				fieldName,
			},
			type: 'validity changed',
		})
	}, [dispatch])

	const updateValue = useCallback((fieldName, value) => {
		dispatch({
			payload: {
				fieldName,
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
		onSubmit(state, { updateValidity })
	}, [
		onSubmit,
		state,
		updateValidity,
	])

	const providerValue = useMemo(() => {
		return {
			...state,
			reset,
			updateValidity,
			updateValue,
		}
	}, [
		reset,
		state,
		updateValidity,
		updateValue,
	])

	return (
		<FormContext.Provider value={providerValue}>
			<form
				ref={ref}
				className={className}
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
