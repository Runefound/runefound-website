// Module imports
import classnames from 'classnames'
import PropTypes from 'prop-types'





// Local imports
import styles from './OrderedList.module.scss'





/**
 * @component
 */
export function OrderedList(props) {
	const {
		children,
		className,
		isBulleted,
		isNumbered,
	} = props

	const compiledClassName = classnames(
		styles['list'],
		{
			[styles['is-bulleted']]: isBulleted,
			[styles['is-numbered']]: isNumbered,
		},
		className,
	)

	return (
		<ol className={compiledClassName}>
			{children}
		</ol>
	)
}

OrderedList.defaultProps = {
	children: null,
	className: '',
	isBulleted: false,
	isNumbered: false,
}

OrderedList.propTypes = {
	/** The contents of the component. */
	children: PropTypes.node,

	/** The contents of the component. */
	className: PropTypes.string,

	/** Whether the list should have bullets for each list item. */
	isBulleted: PropTypes.bool,

	/** Whether the list should have numbers for each list item. */
	isNumbered: PropTypes.bool,
}
