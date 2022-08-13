/* eslint-env node */
// Local imports
import { getAuth } from '../../../helpers/firebase.server.js'





// Local imports
import { createEndpoint } from '../../../helpers/createEndpoint.js'
import httpStatus from '../../../helpers/httpStatus.js'





// eslint-disable-next-line jsdoc/require-param
/**
 * Creates a new user account.
 */
export const handler = async(request, response) => {
	const {
		email,
		password,
		username,
	} = request.body

	try {
		await getAuth().createUser({
			email,
			emailVerified: false,
			password,
			displayName: username,
			disabled: false,
		})
	} catch (error) {
		console.log(error.errorInfo.code)

		switch (error.errorInfo.code) {
			case 'auth/email-already-exists':
				response.status(httpStatus.FORBIDDEN.code)
				response.json({
					errors: [error.errorInfo.code],
				})
				break

			case 'auth/username-already-exists':
				response.status(httpStatus.FORBIDDEN.code)
				response.json({
					errors: [error.errorInfo.code],
				})
				break

			case 'auth/invalid-password':
				response.status(httpStatus.UNPROCESSABLE_ENTITY.code)
				response.json({
					errors: [error.errorInfo.code],
				})
				break

			default:
				response.status(httpStatus.INTERNAL_SERVER_ERROR.code)
				response.json({
					errors: [error.errorInfo.code],
				})
		}
	}

	response.status(httpStatus.NO_CONTENT.code)
	response.end()
}





export default createEndpoint({
	allowedMethods: ['post'],
	handler,
})
