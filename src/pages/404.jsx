// Module imports
import { ErrorPage } from '../components/ErrorPage/ErrorPage.jsx'





/**
 * Handles 404 errors.
 */
export default function NotFoundPage() {
	return (
		<ErrorPage errorID={'NOT_FOUND'} />
	)
}

NotFoundPage.showTitle = false
