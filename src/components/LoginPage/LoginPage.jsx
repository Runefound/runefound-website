// Module imports
import {
	faLock,
	faUser,
} from '@fortawesome/free-solid-svg-icons'
import {
	useCallback,
	useEffect,
} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router.js'




// Local imports
import { Content } from '../Content/Content.jsx'
import { Form } from '../Form/Form.jsx'
import { FormButton } from '../FormButton/FormButton.jsx'
import { FormField } from '../FormField/FormField.jsx'
import { FormInput } from '../FormInput/FormInput.jsx'
import { Link } from '../Link/Link.jsx'
import { PageContent } from '../PageContent/PageContent.jsx'
import { Toolbar } from '../Toolbar/Toolbar.jsx'
import { ToolbarAuxiliary } from '../Toolbar/ToolbarAuxiliary.jsx'
import { ToolbarPrimary } from '../Toolbar/ToolbarPrimary.jsx'
import { useAuth } from '../../contexts/Auth/useAuth.js'





/**
 * The home page.
 */
export function LoginPage() {
	const {
		isLoggedIn,
		login,
	} = useAuth()
	const Router = useRouter()

	const handleSubmit = useCallback(formProps => {
		const { values } = formProps

		login(values.email, values.password)
	}, [login])

	useEffect(() => {
		if (isLoggedIn) {
			Router.push('/')
		}
	}, [
		isLoggedIn,
		Router,
	])

	return (
		<PageContent>
			<Content>
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
			</Content>
		</PageContent>
	)
}

LoginPage.title = 'Login'
