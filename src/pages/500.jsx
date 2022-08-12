// Module imports
import { ErrorPage } from '../components/ErrorPage/ErrorPage.jsx'





/**
 * Handles 500 errors.
 */
export default function InternalServerErrorPage() {
	return (
		<ErrorPage errorID={'INTERNAL_SERVER_ERROR'} />
	)
}

InternalServerErrorPage.showTitle = false
