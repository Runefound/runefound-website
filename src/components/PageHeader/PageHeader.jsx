// Style imports
import styles from './PageHeader.module.scss'





// Module imports
import PropTypes from 'prop-types'





// Local imports
import { useAuth } from '../../contexts/Auth/useAuth.js'





/**
 * The layout for all pages. Includes page header and nav bar.
 *
 * @param {object} props All props.
 * @param {import('react').ReactNode} props.children All props.
 */
export function PageHeader(props) {
	const { children } = props

	const {
		isLoggedIn,
		isLoggingIn,
		isLoggingOut,
	} = useAuth()

	return (
		<header className={styles['page-header']}>
			<h2>{children}</h2>

			<div className={styles['user-menu']}>
				{isLoggedIn && 'Logged in'}
				{isLoggingIn && 'Logging in...'}
				{isLoggingOut && 'Logging out...'}
			</div>
		</header>
	)
}

PageHeader.defaultProps = {
	children: 'NO TITLE',
}

PageHeader.propTypes = {
	children: PropTypes.node,
}
