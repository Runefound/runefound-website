// Style imports
import styles from './FormField.module.scss'





// Module imports
import {
	Children,
	useId,
	useMemo,
} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'





// Local imports
import { FormFieldContext } from './FormFieldContext.js'
import { useForm } from '../Form/useForm.js'





/**
 * Renders helper text, errors, and labels for form fields.
 *
 * @param {object} props All props.
 * @param {import('react').ReactNode} [props.children] The contents of the component.
 * @param {string} [props.className] Additional classes to be applied to the component.
 * @param {string} [props.helperText] A message to clarify the purpose or usage of the field.
 * @param {boolean} [props.isRequired] Whether or not this field must be non-empty for the form to be valid.
 * @param {string} [props.label] A label to indicate the usage of this field.
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

	let renderedHelpers = null
	let renderedLabel = null

	const compiledClassName = useMemo(() => {
		return classnames(styles['form-field'], className)
	}, [className])

	const providerValue = useMemo(() => {
		return { id }
	}, [id])

	if (!formErrors[id]?.length && helperText) {
		renderedHelpers = (
			<p className={'help'}>
				{helperText}
			</p>
		)
	} else if (formErrors[id]?.length) {
		renderedHelpers = (
			<ul>
				{formErrors[id].map(error => (
					<li
						key={error}
						className={'help is-danger'}>
						{error}
					</li>
				))}
			</ul>
		)
	}

	if (label) {
		renderedLabel = (
			<label
				className={'label'}
				htmlFor={id}>
				{label}
				{isRequired && (
					<span className={'has-text-danger'}>
						{'*'}
					</span>
				)}
			</label>
		)
	}

	if (Children.count(children) > 1) {
		return (
			<div className={classnames('field', className)}>
				{renderedLabel}

				<div className={'field has-addons'}>
					{children}
				</div>

				{renderedHelpers}
			</div>
		)
	}

	return (
		<FormFieldContext.Provider value={providerValue}>
			<div className={compiledClassName}>
				{renderedLabel}
				{children}
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
	children: PropTypes.node,
	className: PropTypes.string,
	helperText: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.string,
	]),
	isRequired: PropTypes.bool,
	label: PropTypes.string,
}
