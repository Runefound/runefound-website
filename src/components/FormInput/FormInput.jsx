// Module imports
import {
	useCallback,
	useEffect,
} from 'react'
import classnames from 'classnames'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import TextareaAutosize from 'react-textarea-autosize'





// Local imports
import { useForm } from '../Form/useForm.js'





/**
 * Renders a text input.
 *
 * @param {object} props All props.
 * @param {'center' | 'left' | 'right'} [props.alignment='left'] Alters the has-text-* value.
 * @param {string} [props.autocomplete] Informs the user agent what type of autocomplete this input supports, if any.
 * @param {string} [props.className] Additional classes to be applied to the component.
 * @param {import('react').ReactNode} [props.iconLeft] An icon to be displayed to the left of the input.
 * @param {string} props.id The ID of this input in the form state.
 * @param {boolean} [props.isDisabled] Whether or not this input is disabled.
 * @param {boolean} [props.isRequired] Whether or not this input must be non-empty for the form to be valid.
 * @param {boolean} [props.isMultiline] Whether or not this input supports multiple lines of text.
 * @param {number} [props.maxLength] The maximum number of characters supported by this input.
 * @param {number} [props.minLength] The minimum number of characters supported by this input.
 * @param {Function} [props.onChange] A function to be executed when the contents of this input change.
 * @param {string} [props.placeholder] Placeholder text to be displayed inside the input.
 * @param {string} [props.type='text'] The type of this input.
 * @param {object} [props.validateWithErrors=false] ?
 * @param {object} [props.value] The current value of the input.
 */
export function FormInput(props) {
	const {
		alignment,
		autocomplete,
		className,
		iconLeft,
		id,
		isDisabled,
		isMultiline,
		isRequired,
		maxLength,
		minLength,
		onChange,
		placeholder,
		type,
		validateWithErrors,
		value,
	} = props
	const {
		errors: formErrors,
		updateValidity,
		updateValue,
		values,
	} = useForm()

	const validate = useCallback(async(state, initialProps) => {
		const errors = []

		if (initialProps.maxLength && (state.length > initialProps.maxLength)) {
			errors.push('Too long')
		}

		if (initialProps.minLength && (state.length < initialProps.minLength)) {
			errors.push('Too short')
		}

		if (initialProps.isRequired && !state) {
			errors.push('Field is required')
		}

		if ((type === 'email') && state.length && !/.+@.+\..+/u.test(state)) {
			errors.push('Invalid email')
		}

		if ((typeof initialProps.validate === 'function') && (validateWithErrors || !errors.length)) {
			const customError = await initialProps.validate(state, values)
			if (customError) {
				errors.push(customError)
			}
		}

		updateValidity(id, errors)
	}, [
		id,
		type,
		updateValidity,
		validateWithErrors,
		values,
	])

	const handleChange = useCallback(event => {
		let { value: localValue } = event.target

		if (type === 'number') {
			// If the value contains a decimal, parse as a float. Otherwise, parse as
			// an integer.
			if (localValue.indexOf('.') !== -1) {
				localValue = parseFloat(localValue)
			} else {
				localValue = parseInt(localValue, 10)
			}
		}

		updateValue(id, localValue)
		validate(localValue, props)
	}, [
		id,
		props,
		type,
		updateValue,
		validate,
	])

	useEffect(() => {
		// Mark empty, non-required fields as valid
		if (!isRequired && !values[id]) {
			updateValidity(id, [])

		// Run a validity check against a field's initial state if it's non-empty
		} else if (isRequired && (values[id] !== '')) {
			validate(values[id], props)
		}
	}, [
		id,
		isRequired,
		props,
		updateValidity,
		validate,
		values,
	])

	return (
		<div
			className={classnames(className, {
				control: true,
				'has-icons-left': iconLeft,
				'has-icons-right': formErrors[id]?.length,
			})}>

			{isMultiline && (
				<TextareaAutosize
					autoComplete={autocomplete}
					className={classnames({
						'has-text-centered': alignment === 'center',
						'has-text-left': alignment === 'left',
						'has-text-right': alignment === 'right',
						textarea: true,
						'is-danger': formErrors[id]?.length,
					})}
					disabled={isDisabled}
					id={id}
					maxLength={maxLength}
					minLength={minLength}
					onChange={onChange ?? handleChange}
					placeholder={placeholder}
					required={isRequired}
					value={value ?? values[id]} />
			)}

			{!isMultiline && (
				<input
					autoComplete={autocomplete}
					className={classnames({
						'has-text-centered': alignment === 'center',
						'has-text-left': alignment === 'left',
						'has-text-right': alignment === 'right',
						input: true,
						'is-danger': formErrors[id]?.length,
					})}
					disabled={isDisabled}
					id={id}
					maxLength={maxLength}
					minLength={minLength}
					onChange={onChange ?? handleChange}
					placeholder={placeholder}
					required={isRequired}
					type={type}
					value={value ?? values[id]} />
			)}

			{Boolean(iconLeft) && (
				<span className={'icon is-small is-left'}>
					<FontAwesomeIcon
						fixedWidth
						icon={iconLeft} />
				</span>
			)}

			{Boolean(formErrors[id]?.length) && (
				<span className={'icon is-small is-right'}>
					<FontAwesomeIcon
						fixedWidth
						icon={faExclamationTriangle} />
				</span>
			)}
		</div>
	)
}

FormInput.defaultProps = {
	alignment: 'left',
	autocomplete: null,
	className: null,
	iconLeft: null,
	isDisabled: false,
	isMultiline: false,
	isRequired: false,
	maxLength: null,
	minLength: null,
	onChange: null,
	placeholder: '',
	type: 'text',
	validateWithErrors: false,
	value: null,
}

FormInput.propTypes = {
	alignment: PropTypes.oneOf([
		'center',
		'left',
		'right',
	]),
	autocomplete: PropTypes.oneOf([
		'address-level-1',
		'address-level-2',
		'address-level-3',
		'address-level-4',
		'address-line-1',
		'address-line-2',
		'address-line-3',
		'bday',
		'bday-day',
		'bday-month',
		'bday-year',
		'cc-additional-name',
		'cc-csc',
		'cc-exp',
		'cc-exp-month',
		'cc-exp-year',
		'cc-family-name',
		'cc-given-name',
		'cc-name',
		'cc-number',
		'cc-type',
		'country',
		'country-name',
		'current-password',
		'email',
		'impp',
		'language',
		'new-password',
		'off',
		'on',
		'one-time-code',
		'organization',
		'organization-title',
		'photo',
		'postal-code',
		'sex',
		'street-address',
		'tel',
		'tel-area-code',
		'tel-country-code',
		'tel-extension',
		'tel-local',
		'tel-national',
		'transaction-currency',
		'transaction-amount',
		'url',
		'username',
	]),
	className: PropTypes.string,
	iconLeft: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.string,
	]),
	id: PropTypes.string.isRequired,
	isDisabled: PropTypes.bool,
	isMultiline: PropTypes.bool,
	isRequired: PropTypes.bool,
	maxLength: PropTypes.number,
	minLength: PropTypes.number,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	type: PropTypes.oneOf([
		'date',
		'datetime-local',
		'email',
		'month',
		'number',
		'password',
		'tel',
		'text',
		'time',
		'url',
		'week',
		// Unsupported types:
		// 'button',
		// 'checkbox',
		// 'color',
		// 'file',
		// 'hidden',
		// 'image',
		// 'radio',
		// 'range',
		// 'reset',
		// 'search',
		// 'submit',
	]),
	validateWithErrors: PropTypes.bool,
	value: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
}
