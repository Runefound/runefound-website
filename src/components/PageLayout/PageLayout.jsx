// Style imports
import styles from './PageLayout.module.scss'





// Module imports
import { Banner } from '../Banner/Banner.jsx'
import { PageHeader } from '../PageHeader/PageHeader.jsx'
import PropTypes from 'prop-types'





/**
 * The layout for all pages. Includes page header and nav bar.
 *
 * @param {object} props All props.
 * @param {import('react').ReactNode} props.children All props.
 * @param {boolean} [props.showTitle=true] Whether or not to render the page title.
 */
export function PageLayout(props) {
	const {
		children,
		showTitle,
		title,
	} = props

	return (
		<div className={styles['page-layout']}>
			<Banner />

			{showTitle && (
				<PageHeader>
					{title}
				</PageHeader>
			)}

			{children}
		</div>
	)
}

PageLayout.defaultProps = {
	children: null,
	showTitle: true,
	title: 'NO TITLE',
}

PageLayout.propTypes = {
	children: PropTypes.node,
	showTitle: PropTypes.bool,
	title: PropTypes.string,
}
