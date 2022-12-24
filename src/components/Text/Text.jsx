// Module imports
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





// Local imports
import styles from './Text.module.scss'





/**
 * Renders text with additional styling utilities.
 *
 * @component
 */
export function Text(props) {
	const {
		children,
		className,
		isBold,
		isDanger,
	} = props

	const compiledClassName = useMemo(() => {
		return classnames(className, {
			[styles['bold']]: isBold,
			[styles['danger']]: isDanger,
		})
	}, [
		isBold,
		isDanger,
	])

	return (
		<span className={compiledClassName}>
			{children}
		</span>
	)
}

Text.defaultProps = {
	children: null,
	className: '',
	isBold: false,
	isDanger: false,
}

Text.propTypes = {
	/** The contents of the component. */
	children: PropTypes.node,

	/** Additional classes to be applied. */
	className: PropTypes.string,

	/** Whether or not the component should be bold. */
	isBold: PropTypes.bool,

	/** Whether or not the component should be styled to indicate danger (i.e. an error). */
	isDanger: PropTypes.bool,
}
