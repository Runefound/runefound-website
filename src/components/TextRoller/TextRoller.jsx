// Module imports
import PropTypes from 'prop-types'





// Local imports
import { TextRollerContainer } from './TextRollerContainer.jsx'
import { TextRollerContextProvider } from './TextRollerContextProvider.jsx'





/** @component */
export function TextRoller(props) {
	const {
		items,
		rollDelay,
		startingIndex,
	} = props

	return (
		<TextRollerContextProvider
			items={items}
			rollDelay={rollDelay}
			startingIndex={startingIndex}>
			<TextRollerContainer {...props} />
		</TextRollerContextProvider>
	)
}

TextRoller.defaultProps = {
	rollDelay: 5000,
	startingIndex: 0,
}

TextRoller.propTypes = {
	/** The items to be rolled. */
	items: PropTypes.arrayOf(PropTypes.node).isRequired,

	/** The length of time time (in seconds) to wait between rolls. */
	rollDelay: PropTypes.number,

	/** The index of the item which should be the first primary item. */
	startingIndex: PropTypes.number,
}
