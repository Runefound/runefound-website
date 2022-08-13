// Local imports
import { createInitialState } from './createInitialState.js'
import { defaultState } from './defaultState.js'





/**
 * Reducer function for form state changes.
 *
 * @param {object} state The current form state.
 * @param {object} action The action used to transform the form state.
 * @returns {object} The new form state.
 */
export function reducer(state, action) {
	const {
		payload,
		type,
	} = action
	const newState = {
		...defaultState,
		...state,
	}

	switch (type) {
		case 'validity changed':
			newState.validity = {
				...newState.validity,
				[payload.fieldName]: !payload.errors?.length,
			}
			newState.errors = {
				...newState.errors,
				[payload.fieldName]: payload.errors,
			}
			newState.isValid = !Object
				.values(newState.validity)
				.some(isValid => !isValid)
			break

		case 'value changed':
			newState.values = {
				...newState.values,
				[payload.fieldName]: payload.value,
			}
			newState.touched = {
				...newState.touched,
				[payload.fieldName]: newState.initialValues[payload.fieldName] !== payload.value,
			}
			newState.isTouched = Object
				.values(newState.touched)
				.some(isTouched => isTouched)
			break

		case 'reset state':
			return createInitialState(payload)

		default:
			console.warn(`Unrecognized action dispatched: ${type}`, payload)
			return state
	}

	return newState
}
