// Style imports
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useMemo } from 'react'






// Module imports
import styles from './Button.module.scss'





// Constants
const VARIANTS = {
	hidden: {
		opacity: 0,
		x: 20,
	},
	visible: {
		opacity: 1,
		x: 0,
	},
}





/**
 * Renders a button.
 *
 * @param {object} props All props.
 * @param {import('react').ReactNode} [props.children] The contents of the component.
 * @param {string} [props.className] Additional classes to be applied to the component.
 * @param {boolean} [props.isAuxiliary=false] Whether or not this link is used for an auxiliary action.
 * @param {boolean} [props.isDisabled=false] Whether or not this component should be disabled.
 * @param {boolean} [props.isLink=false] Whether or not this component should look like a link.
 * @param {boolean} [props.isLoading=false] Whether or not this component is in a loading state.
 * @param {boolean} [props.isPrimary=false] Whether or not this button is used for a primary action.
 * @param {boolean} [props.isSubmit=false] Whether or not this should be a submit button.
 * @param {Function} [props.onClick] The function to be executed when this button is clicked.
 */
export function Button(props) {
	const {
		children,
		className,
		isAuxiliary,
		isDisabled,
		isLink,
		isLoading,
		isPrimary,
		isSubmit,
		onClick,
	} = props

	const compiledClassName = useMemo(() => {
		return classnames(styles['button'], className, {
			[styles['is-auxiliary']]: isAuxiliary,
			[styles['is-disabled']]: isDisabled,
			[styles['is-link']]: isLink,
			[styles['is-loading']]: isLoading,
			[styles['is-primary']]: isPrimary,
		})
	}, [
		className,
		isAuxiliary,
		isDisabled,
		isLink,
		isLoading,
		isPrimary,
	])

	return (
		// eslint-disable-next-line react/forbid-elements
		<button
			className={compiledClassName}
			disabled={isDisabled}
			onClick={onClick}
			type={isSubmit ? 'submit' : 'button'}>
			<motion.span
				animate={isLoading ? 'hidden' : 'visible'}
				className={styles['children']}
				initial={'visible'}
				variants={VARIANTS}>
				{children}
			</motion.span>

			<motion.span
				animate={isLoading ? 'visible' : 'hidden'}
				className={styles['loader']}
				initial={'hidden'}
				variants={VARIANTS}>
				<FontAwesomeIcon
					fixedWidth
					icon={faSpinner}
					spinPulse />
			</motion.span>
		</button>
	)
}

Button.defaultProps = {
	children: null,
	className: '',
	isAuxiliary: false,
	isDisabled: false,
	isLink: false,
	isLoading: false,
	isPrimary: false,
	isSubmit: false,
	onClick: null,
}

Button.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	isAuxiliary: PropTypes.bool,
	isDisabled: PropTypes.bool,
	isLink: PropTypes.bool,
	isLoading: PropTypes.bool,
	isPrimary: PropTypes.bool,
	isSubmit: PropTypes.bool,
	onClick: PropTypes.func,
}
