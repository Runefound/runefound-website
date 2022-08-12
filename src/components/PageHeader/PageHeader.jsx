// Style imports
import styles from './PageHeader.module.scss'





// Module imports
import PropTypes from 'prop-types'





/**
 * The layout for all pages. Includes page header and nav bar.
 *
 * @param {object} props All props.
 * @param {import('react').ReactNode} props.children All props.
 */
export function PageHeader(props) {
	const { children } = props

	return (
		<header className={styles['page-header']}>
			<h2>{children}</h2>
		</header>
	)
}

PageHeader.defaultProps = {
	children: 'NO TITLE',
}

PageHeader.propTypes = {
	children: PropTypes.node,
}
