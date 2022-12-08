// Module imports
import { useEffect } from 'react'
import { useRouter } from 'next/router.js'





// Local imports
import { Content } from '../Content/Content.jsx'
import { CreateAccountForm } from './CreateAccountForm.jsx'
import { PageContent } from '../PageContent/PageContent.jsx'
import { useAuth } from '../../contexts/Auth/useAuth.js'





/**
 * The home page.
 */
export function CreateAccountPage() {
	const {
		isLoggedIn,
		isRegistered,
	} = useAuth()
	const Router = useRouter()

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
				<CreateAccountForm />
			</Content>

			<Content>
				<p>{'Join hundreds of other users that are looking to play together!'}</p>
			</Content>
		</PageContent>
	)
}

CreateAccountPage.title = 'Create an Account'
