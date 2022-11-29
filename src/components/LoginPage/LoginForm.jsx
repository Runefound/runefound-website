// Module imports
import {
	faLock,
	faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback } from 'react'




// Local imports
import { Form } from '../Form/Form.jsx'
import { FormButton } from '../FormButton/FormButton.jsx'
import { FormField } from '../FormField/FormField.jsx'
import { FormInput } from '../FormInput/FormInput.jsx'
import { Link } from '../Link/Link.jsx'
import { Toolbar } from '../Toolbar/Toolbar.jsx'
import { ToolbarAuxiliary } from '../Toolbar/ToolbarAuxiliary.jsx'
import { ToolbarPrimary } from '../Toolbar/ToolbarPrimary.jsx'
import { useAuth } from '../../contexts/Auth/useAuth.js'





/**
 * The home page.
 */
export function LoginForm() {
	const {
		isLoggedIn,
		login,
	} = useAuth()

	const handleSubmit = useCallback(formProps => {
		const { values } = formProps

		login(values.email, values.password)
	}, [login])

	return (
		<Form onSubmit={handleSubmit}>
			<FormField>
				<FormInput
					addonStart={(
						<FontAwesomeIcon
							fixedWidth
							icon={faUser} />
					)}
					name={'email'}
					placeholder={'Email'}
					type={'email'} />
			</FormField>

			<FormField>
				<FormInput
					addonStart={(
						<FontAwesomeIcon
							fixedWidth
							icon={faLock} />
					)}
					name={'password'}
					placeholder={'Password'}
					type={'password'} />
			</FormField>

			<Toolbar>
				<ToolbarPrimary>
					<Link
						href={'/forgot-password'}
						isButton
						isLink>
						{'Forgot Password?'}
					</Link>

					<FormButton
						isDisabled={isLoggedIn}
						isPrimary
						isSubmit>
						{'Login'}
					</FormButton>
				</ToolbarPrimary>

				<ToolbarAuxiliary>
					<Link
						href={'/create-account'}
						isAuxiliary
						isButton>
						{'Create Account'}
					</Link>
				</ToolbarAuxiliary>
			</Toolbar>
		</Form>
	)
}
