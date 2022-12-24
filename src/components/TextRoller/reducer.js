// Local imports
import { initialState } from './initialState.js'





/**
 * Reducer function for handling updates to the TextRoller's contents.
 *
 * @param {object} state The current context state.
 * @param {object} action The action used to transform the context state.
 * @returns {object} The new context state.
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
		case 'roll to next item':
			newState.primaryIndex += 1

			if (newState.primaryIndex >= newState.items.length) {
				newState.primaryIndex = 0
			}
			break

		case 'update sizes':
			newState.itemHeights = {
				...newState.itemHeights,
				[payload.id]: payload.height,
			}
			newState.itemWidths = {
				...newState.itemWidths,
				[payload.id]: payload.width,
			}
			newState.height = Math.max(...Object.values(newState.itemHeights))
			newState.width = Math.max(...Object.values(newState.itemWidths))
			break

		default:
			console.warn(`Unrecognized action dispatched: ${type}`, payload)
			return state
	}

	return newState
}
