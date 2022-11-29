// Module imports
import { useEffect } from 'react'
import { useRouter } from 'next/router.js'




// Local imports
import { Content } from '../Content/Content.jsx'
import { LoginForm } from './LoginForm.jsx'
import { PageContent } from '../PageContent/PageContent.jsx'
import { useAuth } from '../../contexts/Auth/useAuth.js'





/**
 * The home page.
 */
export function LoginPage() {
	const {
		isLoggedIn,
	} = useAuth()
	const Router = useRouter()

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
				<LoginForm />
			</Content>

			<Content>
				<p>{'Welcome back!'}</p>
			</Content>
		</PageContent>
	)
}

LoginPage.title = 'Login'
