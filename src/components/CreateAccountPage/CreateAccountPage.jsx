// Module imports
import classnames from 'classnames'
import { useCallback } from 'react'





// Local imports
import { Form } from '../Form/Form.jsx'
import { FormButton } from '../FormButton/FormButton.jsx'
import { FormField } from '../FormField/FormField.jsx'
import { FormInput } from '../FormInput/FormInput.jsx'
import { handleError } from './handleError.js'
import { Link } from '../Link/Link.jsx'
import { PageContent } from '../PageContent/PageContent.jsx'
import { useAuth } from '../../contexts/Auth/useAuth.js'





// Constants
const INITIAL_VALUES = {
	username: '',
	email: '',
	password: '',
}





/**
 * The home page.
 */
export function CreateAccountPage() {
	const {
		isLoggedIn,
		isLoggingIn,
		isRegistered,
		isRegistering,
		register,
	} = useAuth()

	const handleSubmit = useCallback(async(formData, actions) => {
		const { values } = formData
		const { updateValidity } = actions

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

	return (
		<PageContent>
			<Form
				className={'box column is-half is-offset-one-quarter section'}
				initialValues={INITIAL_VALUES}
				onSubmit={handleSubmit}>
				<h2 className={'title'}>
					{'Create an Account'}
				</h2>

				<FormField
					id={'username'}
					isRequired
					label={'Username'}>
					<FormInput
						id={'username'}
						isDisabled={isRegistering || isRegistered} />
				</FormField>

				<FormField
					id={'email'}
					isRequired
					label={'Email'}>
					<FormInput
						id={'email'}
						isDisabled={isRegistering || isRegistered}
						type={'email'} />
				</FormField>

				<FormField
					id={'password'}
					isRequired
					label={'Password'}>
					<FormInput
						id={'password'}
						isDisabled={isRegistering || isRegistered}
						minLength={6}
						type={'password'} />
				</FormField>

				<div className={'columns'}>
					<div className={'column has-text-left'}>
						{isRegistering && 'Creating account...'}
						{isLoggingIn && 'Logging in...'}
						{isLoggedIn && 'Redirecting...'}
					</div>

					<div className={'column has-text-right'}>
						<div className={'field is-grouped'}>
							<Link
								className={'button is-ghost mr-2'}
								disabled={isRegistering || isRegistered}
								href={'/login'}>
								{'Already have an account?'}
							</Link>

							<FormButton
								className={classnames({
									'is-primary': true,
									'is-loading': isRegistering || isRegistered,
								})}
								isDisabled={isRegistering || isRegistered}
								isSubmit>
								{'Create Account'}
							</FormButton>
						</div>
					</div>
				</div>
			</Form>
		</PageContent>
	)
}

CreateAccountPage.title = 'Create an Account'
