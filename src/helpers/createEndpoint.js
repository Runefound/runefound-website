/* eslint-env node */
// Module imports
import cors from 'micro-cors'





// Local imports
import httpStatus from './httpStatus'





// Local constants
const DEFAULT_MIDDLEWARES = [cors({
	origin: (() => {
		if (process.env.VERCEL_ENV === 'production') {
			return 'https://trezy.com'
		}

		return '*'
	})(),
})]





/**
 * Returns a fully formed Next.js API endpoint, wrapped with default middleware.
 *
 * @param {object} options All options.
 * @param {string[]} options.allowedMethods A list of HTTP request methods that are valid for this endpoint.
 * @param {Function} options.handler The function for the endpoint.
 * @param {Function[]} options.middlewares A list of additional middlewares with which to wrap this endpoint.
 * @returns {Function} The final endpoint.
 */
export function createEndpoint(options) {
	const {
		allowedMethods,
		handler: initialHandler,
		middlewares = [],
	} = options

	const allMiddlewares = [
		...DEFAULT_MIDDLEWARES,
		...middlewares,
	]

	const wrappedHandler = allMiddlewares.reduce(
		(handler, middleware) => middleware(handler),
		initialHandler,
	)

	return (req, res) => {
		if (allowedMethods && !allowedMethods.includes(req.method.toLowerCase())) {
			return res.status(httpStatus.METHOD_NOT_ALLOWED).end()
		}

		return wrappedHandler(req, res)
	}
}
