// Module imports
import {
	useCallback,
	useEffect,
	useMemo,
} from 'react'
import classnames from 'classnames'
import { useRouter } from 'next/router.js'





// Local imports
import { Content } from '../Content/Content.jsx'
import { Form } from '../Form/Form.jsx'
import { FormButton } from '../FormButton/FormButton.jsx'
import { FormField } from '../FormField/FormField.jsx'
import { FormInput } from '../FormInput/FormInput.jsx'
import { handleError } from './handleError.js'
import { Link } from '../Link/Link.jsx'
import { PageContent } from '../PageContent/PageContent.jsx'
import { useAuth } from '../../contexts/Auth/useAuth.js'


import { Toolbar } from '../Toolbar/Toolbar.jsx'
import { ToolbarAuxiliary } from '../Toolbar/ToolbarAuxiliary.jsx'
import { ToolbarPrimary } from '../Toolbar/ToolbarPrimary.jsx'





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
	const Router = useRouter()

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

	useEffect(() => {
		if (isLoggedIn) {
			Router.push('/')
		}
	}, [
		isLoggedIn,
		isRegistered,
		Router,
	])

	return (
		<PageContent>
			<Content>
				<Form onSubmit={handleSubmit}>
					<FormField
						isRequired
						label={'Username'}>
						<FormInput
							isDisabled={isRegistering || isRegistered}
							name={'username'} />
					</FormField>

					<FormField
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
					</FormField>

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
			</Content>
		</PageContent>
	)
}

CreateAccountPage.title = 'Create an Account'
