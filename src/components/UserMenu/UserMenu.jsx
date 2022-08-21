// Style imports
import styles from './UserMenu.module.scss'





// Module imports
import {
	useCallback,
	useState,
} from 'react'





// Local imports
import { Button } from '../Button/Button.jsx'
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
	} = useAuth()

	const [userMenuIsOpen, setUserMenuIsOpen] = useState(false)

	const toggleUserMenuClick = useCallback(() => {
		setUserMenuIsOpen(previousState => !previousState)
	}, [setUserMenuIsOpen])

	if (!isLoggedIn && !isLoggingIn && !isLoggingOut) {
		return null
	}

	return (
		<div className={styles['user-menu']}>
			{isLoggingIn && 'Logging in...'}
			{isLoggingOut && 'Logging out...'}

			{isLoggedIn && (
				<Button onClick={toggleUserMenuClick}>
					{'Logged in'}
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
