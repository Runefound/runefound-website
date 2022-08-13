/* eslint-env node */
// Local imports
import { getAuth } from '../../../helpers/firebase.server.js'





// Local imports
import { createEndpoint } from '../../../helpers/createEndpoint.js'
import httpStatus from '../../../helpers/httpStatus.js'





// eslint-disable-next-line jsdoc/require-param
/**
 * Updates the password for the currently logged in user.
 */
export const handler = async(request, response) => {
	const { firebaseAuthToken } = request.cookies
	const { password } = request.body

	const auth = getAuth()

	try {
		const user = await auth.verifyIdToken(firebaseAuthToken, true)

		await auth.updateUser(user.uid, { password })

		return response.status(httpStatus.OK.code).end()
	} catch (error) {
		console.log(error)
		return response.status(httpStatus.INTERNAL_SERVER_ERROR.code).end()
	}
}





export default createEndpoint({
	allowedMethods: ['post'],
	handler,
})
