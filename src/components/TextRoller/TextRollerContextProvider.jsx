// Module imports
import {
	useCallback,
	useMemo,
	useReducer,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import { initialState } from './initialState.js'
import { reducer } from './reducer.js'
import { TextRollerContext } from './TextRollerContext.jsx'





/**
 * Allows commmunication between a TextRoller and its child TextRollerItems.
 *
 * @component
 */
export function TextRollerContextProvider(props) {
	const {
		children,
		items,
		rollDelay,
		startingIndex,
	} = props
	const [state, dispatch] = useReducer(reducer, {
		...initialState,
		items,
		rollDelay,
		primaryIndex: startingIndex,
	})

	const rollToNextItem = useCallback(() => {
		dispatch({ type: 'roll to next item' })
	}, [dispatch])

	const updateSizes = useCallback(options => {
		const {
			id,
			height,
			width,
		} = options

		return dispatch({
			payload: {
				id,
				height,
				width,
			},
			type: 'update sizes',
		})
	}, [dispatch])

	const providerValue = useMemo(() => {
		return {
			...state,
			rollToNextItem,
			updateSizes,
		}
	}, [
		state,
		rollToNextItem,
		updateSizes,
	])

	return (
		<TextRollerContext.Provider value={providerValue}>
			{children}
		</TextRollerContext.Provider>
	)
}

TextRollerContextProvider.propTypes = {
	children: null,
	items: [],
	rollDelay: 5000,
	startingIndex: 0,
}

TextRollerContextProvider.propTypes = {
	/** The contents of the component. */
	children: PropTypes.node,

	/** The items to be rolled. */
	items: PropTypes.arrayOf(PropTypes.node),

	/** The length of time time (in seconds) to wait between rolls. */
	rollDelay: PropTypes.number,

	/** The index of the item which should be the first primary item. */
	startingIndex: PropTypes.number,
}
