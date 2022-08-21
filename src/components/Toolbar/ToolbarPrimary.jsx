// Style imports
import styles from './Toolbar.module.scss'





// Module imports
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





/**
 * A container for controls.
 *
 * @param {object} props All props.
 * @param {import('react').ReactNode} [props.children] The contents of the component.
 * @param {string} [props.className] Additional classes to be applied to the component.
 */
export function ToolbarPrimary(props) {
	const {
		children,
		className,
	} = props

	const compiledClassName = useMemo(() => {
		return classnames(styles['toolbar-primary'], className)
	}, [className])

	return (
		<div className={compiledClassName}>
			{children}
		</div>
	)
}

ToolbarPrimary.defaultProps = {
	children: null,
	className: '',
}

ToolbarPrimary.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}
