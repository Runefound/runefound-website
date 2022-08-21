// Style imports
import styles from './Toolbar.module.scss'





// Module imports
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





/**
 * A container for the auxiliary controls of a toolbar.
 *
 * @param {object} props All props.
 * @param {import('react').ReactNode} [props.children] The contents of the component.
 * @param {string} [props.className] Additional classes to be applied to the component.
 */
export function ToolbarAuxiliary(props) {
	const {
		children,
		className,
	} = props

	const compiledClassName = useMemo(() => {
		return classnames(styles['toolbar-auxiliary'], className)
	}, [className])

	return (
		<div className={compiledClassName}>
			{children}
		</div>
	)
}

ToolbarAuxiliary.defaultProps = {
	children: null,
	className: '',
}

ToolbarAuxiliary.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}
