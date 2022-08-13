/* eslint-env node */
// Local imports
import { getAuth } from '../../../helpers/firebase.server.js'





// Local imports
import { createEndpoint } from '../../../helpers/createEndpoint.js'
import httpStatus from '../../../helpers/httpStatus.js'





// eslint-disable-next-line jsdoc/require-param
/**
 * Verifies that an email address is valid and not already in use.
 */
export const handler = async(request, response) => {
	const { email } = request.query

	try {
		await getAuth().getUserByEmail(email)
		return response.status(httpStatus.FOUND.code).end()
	} catch (error) {
		if (error.errorInfo.code === 'auth/user-not-found') {
			return response.status(httpStatus.NO_CONTENT.code).end()
		}

		console.log(error)
		return response.status(httpStatus.INTERNAL_SERVER_ERROR.code).end()
	}
}





export default createEndpoint({
	allowedMethods: ['get'],
	handler,
})
