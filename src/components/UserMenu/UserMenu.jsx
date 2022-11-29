// Style imports
import styles from './UserMenu.module.scss'





// Module imports
import {
	useCallback,
	useState,
} from 'react'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'





// Local imports
import { Button } from '../Button/Button.jsx'
import { Link } from '../Link/Link.jsx'
import { useAuth } from '../../contexts/Auth/useAuth.js'





/**
 * The menu containing controls for the currently logged in user.
 */
export function UserMenu() {
	const {
		isLoggedIn,
		isLoggingIn,
		isLoggingOut,
		logout,
		user,
	} = useAuth()

	const [userMenuIsOpen, setUserMenuIsOpen] = useState(false)

	const toggleUserMenuClick = useCallback(() => {
		setUserMenuIsOpen(previousState => !previousState)
	}, [setUserMenuIsOpen])

	return (
		<div className={styles['user-menu']}>
			{isLoggingIn && 'Logging in...'}
			{isLoggingOut && 'Logging out...'}

			{!isLoggedIn && (
				<Link
					href={'/login'}
					isAuxiliary
					isButton>
					<>
						<FontAwesomeIcon
							fixedWidth
							icon={faRightToBracket} />

						{'Login'}
					</>
				</Link>
			)}

			{isLoggedIn && (
				<Button onClick={toggleUserMenuClick}>
					{`Logged in as ${user.displayName}`}
				</Button>
			)}

			{userMenuIsOpen && (
				<menu type={'toolbar'}>
					<Button onClick={logout}>
						{'Logout'}
					</Button>
				</menu>
			)}
		</div>
	)
}
