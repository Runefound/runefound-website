// Local imports
import { defaultState } from './defaultState.js'





/**
 * Creates the initial state of a form.
 *
 * @param {object} options All options.
 * @returns {object} A fully formed state object.
 */
export function createInitialState(options) {
	const { initialValues } = options

	return {
		...defaultState,
		errors: Object
			.keys(initialValues)
			.reduce((accumulator, key) => {
				accumulator[key] = []
				return accumulator
			}, {}),
		initialValues,
		touched: Object
			.keys(initialValues)
			.reduce((accumulator, key) => {
				accumulator[key] = false
				return accumulator
			}, {}),
		validity: Object
			.keys(initialValues)
			.reduce((accumulator, key) => {
				accumulator[key] = false
				return accumulator
			}, {}),
		values: { ...initialValues },
	}
}
