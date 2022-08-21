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
export function Toolbar(props) {
	const {
		children,
		className,
	} = props

	const compiledClassName = useMemo(() => {
		return classnames(styles.toolbar, className)
	}, [className])

	return (
		<menu
			className={compiledClassName}
			type={'toolbar'}>
			{children}
		</menu>
	)
}

Toolbar.defaultProps = {
	children: null,
	className: '',
}

Toolbar.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}
