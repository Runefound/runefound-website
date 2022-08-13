/* eslint-env node */
// Local imports
// import { getAuth } from '../../../helpers/firebase.server.js'





// Local imports
import { createEndpoint } from '../../../helpers/createEndpoint.js'
import httpStatus from '../../../helpers/httpStatus.js'





// eslint-disable-next-line jsdoc/require-param
/**
 * Verifies that a username is valid and not already in use.
 */
export const handler = (request, response) => {
	// const { username } = request.query

	try {
		return response.status(httpStatus.NO_CONTENT.code).end()
	} catch (error) {
		console.log(error)
		return response.status(httpStatus.INTERNAL_SERVER_ERROR.code).end()
	}
}





export default createEndpoint({
	allowedMethods: ['get'],
	handler,
})
