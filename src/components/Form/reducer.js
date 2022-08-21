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
		case 'initial value changed':
			if (typeof newState.values[payload.fieldID] === 'undefined') {
				newState.values = {
					...newState.values,
					[payload.fieldID]: payload.value,
				}
			}

			newState.initialValues = {
				...newState.initialValues,
				[payload.fieldID]: payload.value,
			}
			newState.touched = {
				...newState.touched,
				[payload.fieldID]: newState.initialValues[payload.fieldID] !== payload.value,
			}
			newState.isTouched = Object
				.values(newState.touched)
				.some(isTouched => isTouched)
			break

		case 'name changed':
			if (Object.values(newState.names).includes(payload.value)) {
				console.error(`Form control names must be unique; found multiple fields named ${payload.value}`)
			} else {
				newState.names = {
					...newState.names,
					[payload.fieldID]: payload.value,
				}
			}
			break

		case 'validity changed':
			newState.validity = {
				...newState.validity,
				[payload.fieldID]: !payload.errors?.length,
			}
			newState.errors = {
				...newState.errors,
				[payload.fieldID]: payload.errors,
			}
			newState.isValid = !Object
				.values(newState.validity)
				.some(isValid => !isValid)
			break

		case 'value changed':
			newState.values = {
				...newState.values,
				[payload.fieldID]: payload.value,
			}
			newState.touched = {
				...newState.touched,
				[payload.fieldID]: newState.initialValues[payload.fieldID] !== payload.value,
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
