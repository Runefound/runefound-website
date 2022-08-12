// Style imports
import styles from './ErrorPage.module.scss'





// Module imports
import PropTypes from 'prop-types'





// Local imports
import HttpStatus from '../../helpers/httpStatus.js'
import { PageContent } from '../PageContent/PageContent.jsx'





/**
 * Error handling page.
 *
 * @param {object} props All props.
 * @param {string} props.errorID The HTTP status code for the error.
 */
export function ErrorPage(props) {
	const { errorID } = props

	return (
		<PageContent className={styles['error-page']}>
			<div className={styles['error-code']}>
				{HttpStatus[errorID].code}
			</div>

			<div className={styles['error-message']}>
				<h3>{HttpStatus[errorID].message}</h3>

				<p>{HttpStatus[errorID].description}</p>
			</div>
		</PageContent>
	)
}

ErrorPage.propTypes = {
	errorID: PropTypes.oneOf(Object.keys(HttpStatus)).isRequired,
}
