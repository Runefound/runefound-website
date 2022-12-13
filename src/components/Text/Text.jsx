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
		isDanger,
	} = props

	const compiledClassName = useMemo(() => {
		return classnames(className, {
			[styles['danger']]: isDanger,
		})
	}, [isDanger])

	return (
		<span className={compiledClassName}>
			{children}
		</span>
	)
}

Text.defaultProps = {
	children: null,
	className: '',
	isDanger: false,
}

Text.propTypes = {
	/** The contents of the component. */
	children: PropTypes.node,

	/** Additional classes to be applied. */
	className: PropTypes.string,

	/** Whether or not the component should be styled to indicate danger (i.e. an error). */
	isDanger: PropTypes.bool,
}
