// Module imports
import PropTypes from 'prop-types'





// Local imports
import { Button } from '../Button/Button.jsx'
import { useForm } from '../Form/useForm.js'





/**
 * A button that is automatically disabled based on the state of the nearest parent form.
 *
 * @param {object} props All props.
 * @param {import('react').ReactNode} [props.children] The contents of the component.
 * @param {string} [props.className] Additional classes to be applied to the component.
 * @param {boolean} [props.isDisabled=false] Whether or not this component should be disabled.
 */
export function FormButton(props) {
	const {
		children,
		className,
		isDisabled,
	} = props
	const {
		isTouched,
		isValid,
	} = useForm()

	return (
		<Button
			{...props}
			className={className}
			isDisabled={isDisabled || !isValid || !isTouched}>
			{children}
		</Button>
	)
}

FormButton.defaultProps = {
	children: null,
	className: '',
	isDisabled: false,
}

FormButton.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	isDisabled: PropTypes.bool,
}
