// Style imports
import styles from './FormInput.module.scss'





// Module imports
import {
	useCallback,
	useLayoutEffect,
	useMemo,
} from 'react'
import classnames from 'classnames'
// import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import TextareaAutosize from 'react-textarea-autosize'





// Local imports
import { useForm } from '../Form/useForm.js'
import { useFormFieldContext } from '../FormField/useFormFieldContext.js'





/**
 * Renders a text input.
 *
 * @component
 */
export function FormInput(props) {
	const {
		addonStart,
		addonEnd,
		alignment,
		autocomplete,
		className,
		id,
		initialValue,
		isDisabled,
		isMultiline,
		isRequired,
		maxLength,
		minLength,
		name,
		onChange,
		placeholder,
		type,
		validateWithErrors,
		value,
	} = props
	const {
		errors: formErrors,
		setInitialValue,
		setName,
		updateValidity,
		updateValue,
		values,
	} = useForm()
	const {
		id: internalID,
	} = useFormFieldContext()

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

		updateValidity(internalID, errors)
	}, [
		internalID,
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

		updateValue(internalID, localValue)
		validate(localValue, props)
	}, [
		internalID,
		props,
		type,
		updateValue,
		validate,
	])

	const hasErrors = useMemo(() => {
		return formErrors[internalID]?.length
	}, [
		formErrors,
		internalID,
	])

	const wrapperCompiledClassName = useMemo(() => {
		return classnames(styles['form-input'], className, {
			'has-icons-left': addonStart,
			'has-icons-right': hasErrors,
		})
	}, [
		addonStart,
		className,
		hasErrors,
	])

	const sharedProps = useMemo(() => {
		return {
			autoComplete: autocomplete,
			className: classnames({
				'has-text-centered': alignment === 'center',
				'has-text-left': alignment === 'left',
				'has-text-right': alignment === 'right',
				input: !isMultiline,
				'is-danger': hasErrors,
				textarea: isMultiline,
			}),
			disabled: isDisabled,
			id: id,
			maxLength: maxLength,
			minLength: minLength,
			name: name,
			onChange: onChange ?? handleChange,
			placeholder: placeholder,
			required: isRequired,
			value: values[internalID] ?? value,
		}
	}, [
		alignment,
		autocomplete,
		handleChange,
		hasErrors,
		isMultiline,
		id,
		internalID,
		isDisabled,
		isRequired,
		maxLength,
		minLength,
		name,
		onChange,
		placeholder,
		values,
		value,
	])

	useLayoutEffect(() => {
		if (initialValue) {
			setInitialValue(internalID, initialValue)
		}

		if (name || id) {
			setName(internalID, name || id)
		}
	}, [
		id,
		initialValue,
		internalID,
		name,
		setInitialValue,
		setName,
	])

	useLayoutEffect(() => {
		// Mark empty, non-required fields as valid
		if (!isRequired && !values[internalID]) {
			updateValidity(internalID, [])

		// Run a validity check against a field's initial state if it's non-empty
		} else if (isRequired && (values[internalID] !== '')) {
			validate(values[internalID], props)
		}
	}, [
		internalID,
		isRequired,
		props,
		updateValidity,
		validate,
		values,
	])

	return (
		<div className={wrapperCompiledClassName}>
			{isMultiline && (
				<TextareaAutosize {...sharedProps} />
			)}

			{!isMultiline && (
				<input
					{...sharedProps}
					type={type} />
			)}

			{Boolean(addonStart) && (
				<span className={styles['addon-start']}>
					{addonStart}
				</span>
			)}

			{Boolean(addonEnd) && (
				// <span className={'icon is-small is-left'}>
				// 	<FontAwesomeIcon
				// 		fixedWidth
				// 		icon={addonEnd} />
				// </span>
				<span className={styles['addon-end']}>
					{addonEnd}
				</span>
			)}

			{/* {Boolean(hasErrors) && (
				<span className={'icon is-small is-right'}>
					<FontAwesomeIcon
						fixedWidth
						icon={faExclamationTriangle} />
				</span>
			)} */}
		</div>
	)
}

FormInput.defaultProps = {
	addonEnd: null,
	addonStart: null,
	alignment: 'left',
	autocomplete: null,
	className: null,
	id: null,
	initialValue: '',
	isDisabled: false,
	isMultiline: false,
	isRequired: false,
	maxLength: null,
	minLength: null,
	name: '',
	onChange: null,
	placeholder: '',
	type: 'text',
	validateWithErrors: false,
	value: '',
}

FormInput.propTypes = {
	/** Component(s) to be displayed after the input. */
	addonEnd: PropTypes.node,

	/** Component(s) to be displayed before the input. */
	addonStart: PropTypes.node,

	/** Determines the alignment of the input's contents. */
	alignment: PropTypes.oneOf([
		'center',
		'left',
		'right',
	]),

	/** Informs the user agent what type of autocomplete this input supports, if any. */
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

	/** Additional classes to be applied to the component. */
	className: PropTypes.string,

	/** The ID of this input in the form state. */
	id: PropTypes.string,

	/** The initial value of this input. */
	initialValue: PropTypes.string,

	/** Whether or not this input is disabled. */
	isDisabled: PropTypes.bool,

	/** Whether or not this input supports multiple lines of text. */
	isMultiline: PropTypes.bool,

	/** Whether or not this input must be non-empty for the form to be valid. */
	isRequired: PropTypes.bool,

	/** The maximum number of characters supported by this input. */
	maxLength: PropTypes.number,

	/** The minimum number of characters supported by this input. */
	minLength: PropTypes.number,

	/** The name to be used for this input. */
	name: PropTypes.string,

	/** A function to be executed when the contents of this input change. */
	onChange: PropTypes.func,

	/** Placeholder text to be displayed inside the input. */
	placeholder: PropTypes.string,

	/** The type of this input. */
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

	/** If true, allows the field to be reported as valid even if it has errors. */
	validateWithErrors: PropTypes.bool,

	/** The current value of the input. */
	value: PropTypes.string,
}
