// Module imports
import {
	faLock,
	faUser,
} from '@fortawesome/free-solid-svg-icons'
import {
	useCallback,
	useMemo,
} from 'react'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'





// Local imports
import { Form } from '../Form/Form.jsx'
import { FormButton } from '../FormButton/FormButton.jsx'
import { FormField } from '../FormField/FormField.jsx'
import { FormInput } from '../FormInput/FormInput.jsx'
import { handleError } from './handleError.js'
import { Link } from '../Link/Link.jsx'
import { Toolbar } from '../Toolbar/Toolbar.jsx'
import { ToolbarAuxiliary } from '../Toolbar/ToolbarAuxiliary.jsx'
import { ToolbarPrimary } from '../Toolbar/ToolbarPrimary.jsx'
import { useAuth } from '../../contexts/Auth/useAuth.js'





/**
 * The home page.
 */
export function CreateAccountForm() {
	const {
		isLoggedIn,
		isLoggingIn,
		isRegistered,
		isRegistering,
		register,
	} = useAuth()

	const handleSubmit = useCallback(async formProps => {
		const {
			values,
			updateValidity,
		} = formProps

		try {
			await register(values)
		} catch (error) {
			if (error.errors) {
				error.errors.forEach(errorCode => {
					handleError({ code: errorCode }, updateValidity)
				})
			} else {
				handleError(error, updateValidity)
			}
		}
	}, [register])

	const buttonCompiledClassName = useMemo(() => {
		return classnames({
			'is-loading': isRegistering || isRegistered,
		})
	}, [
		isRegistered,
		isRegistering,
	])

	return (
		<Form onSubmit={handleSubmit}>
			<FormField>
				<FormInput
					addonStart={(
						<FontAwesomeIcon
							fixedWidth
							icon={faUser} />
					)}
					name={'username'}
					placeholder={'Username'} />
			</FormField>

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

			{/* <FormField
				isRequired
				label={'Username'}>
				<FormInput
					isDisabled={isRegistering || isRegistered}
					name={'username'} />
			</FormField> */}

			{/* <FormField
				isRequired
				label={'Email'}>
				<FormInput
					isDisabled={isRegistering || isRegistered}
					name={'email'}
					type={'email'} />
			</FormField>

			<FormField
				isRequired
				label={'Password'}>
				<FormInput
					isDisabled={isRegistering || isRegistered}
					minLength={6}
					name={'password'}
					type={'password'} />
			</FormField> */}

			<Toolbar>
				<ToolbarPrimary>
					<Link
						className={'button is-ghost mr-2'}
						disabled={isRegistering || isRegistered}
						href={'/login'}
						isButton
						isLink>
						{'Already have an account?'}
					</Link>

					<FormButton
						className={buttonCompiledClassName}
						isDisabled={isRegistering || isRegistered}
						isPrimary
						isSubmit>
						{'Create Account'}
					</FormButton>
				</ToolbarPrimary>

				<ToolbarAuxiliary>
					{isRegistering && 'Creating account...'}
					{isLoggingIn && 'Logging in...'}
					{isLoggedIn && 'Redirecting...'}
				</ToolbarAuxiliary>
			</Toolbar>
		</Form>
	)
}
