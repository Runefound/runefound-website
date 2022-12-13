// Style imports
import styles from './FormField.module.scss'





// Module imports
import {
	Children,
	cloneElement,
	useId,
	useMemo,
} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'





// Local imports
import { FormFieldContext } from './FormFieldContext.js'
import { FormInput } from '../FormInput/FormInput.jsx'
import { Text } from '../Text/Text.jsx'
import { useForm } from '../Form/useForm.js'





/**
 * Renders helper text, errors, and labels for form fields.
 *
 * @component
 */
export function FormField(props) {
	const {
		children,
		className,
		helperText,
		isRequired,
		label,
	} = props
	const { errors: formErrors } = useForm()
	const id = useId()

	const compiledClassName = useMemo(() => {
		return classnames(styles['form-field'], className)
	}, [className])

	const renderedChildren = useMemo(() => {
		const parsedChildren = Children.map(children, child => {
			const childProps = { ...child.props }

			if (child.type === FormInput) {
				childProps.isRounded = false
			}

			return cloneElement(child, childProps)
		})

		if (Children.count(parsedChildren) > 1) {
			return (
				<div className={styles['has-addons']}>
					{parsedChildren}
				</div>
			)
		}

		return parsedChildren
	}, [children])

	const renderedHelpers = useMemo(() => {
		if (!formErrors[id]?.length && helperText) {
			return (
				<p className={styles['help-text']}>
					{helperText}
				</p>
			)
		}

		if (formErrors[id]?.length) {
			return (
				<ul>
					{formErrors[id].map(error => (
						<li
							key={error}
							className={styles['help-text']}>
							<Text isDanger>
								{error}
							</Text>
						</li>
					))}
				</ul>
			)
		}

		return null
	}, [])

	const renderedLabel = useMemo(() => {
		if (label) {
			return (
				<label
					className={styles['label']}
					htmlFor={id}>
					{label}
					{isRequired && (
						<Text isDanger>
							{'*'}
						</Text>
					)}
				</label>
			)
		}

		return null
	}, [
		isRequired,
		label,
	])

	const providerValue = useMemo(() => {
		return { id }
	}, [id])

	return (
		<FormFieldContext.Provider value={providerValue}>
			<div className={compiledClassName}>
				{renderedLabel}
				{renderedChildren}
				{renderedHelpers}
			</div>
		</FormFieldContext.Provider>
	)
}

FormField.defaultProps = {
	children: null,
	className: '',
	helperText: '',
	isRequired: false,
	label: '',
}

FormField.propTypes = {
	/** The contents of the component. */
	children: PropTypes.node,

	/** Additional classes to be applied to the component. */
	className: PropTypes.string,

	/** A message to clarify the purpose or usage of the field. */
	helperText: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.string,
	]),

	/** Whether or not this field must be non-empty for the form to be valid. */
	isRequired: PropTypes.bool,

	/** A label to indicate the usage of this field. */
	label: PropTypes.string,
}
