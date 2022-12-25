// Module imports
import classnames from 'classnames'
import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'





// Local imports
import styles from './Dialog.module.scss'





/**
 * @component
 */
export const Dialog = forwardRef((props, ref) => {
	const {
		children,
		className,
		isOpen,
	} = props

	const compiledClassName = classnames(styles['dialog-contents'], className)

	return (
		<motion.dialog
			ref={ref}
			className={styles['dialog']}
			open={isOpen}>
			<div className={compiledClassName}>
				{children}
			</div>
		</motion.dialog>
	)
})

Dialog.defaultProps = {
	children: null,
	className: '',
	isOpen: undefined,
}

Dialog.propTypes = {
	/** The contents of the component. */
	children: PropTypes.node,

	/** Additional classes to be applied to the component. */
	className: PropTypes.string,

	/** Whether or not this dialog is currently open. */
	isOpen: PropTypes.bool,
}
