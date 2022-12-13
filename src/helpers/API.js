/* eslint-env node */

import { POST } from './httpMethods.js'





/**
 * @typedef FetchOptions
 * @property {*} [body] An object representing additional headers to be sent with the request.
 * @property {object} [headers] An object representing additional headers to be sent with the request.
 * @property {string} [method = 'get'] The request method to be used.
 * @property {object} [query] An object representing query parameters to be attached to the request URL.
 * @property {AbortSignal} [abortSignal] The signal from an AbortController, allowing the request to be cancelled.
 */

/******************************************************************************\
 * Core functions
\******************************************************************************/

/**
 * Makes a request against the API.
 *
 * @param {string} path The path of the request.
 * @param {FetchOptions} options Options passed directly to fetch.
 * @returns {*} The response.
 */
export function apiFetch(path, options = {}) {
	const parsedOptions = { ...options }

	delete parsedOptions.abortSignal
	delete parsedOptions.headers
	delete parsedOptions.query

	const url = new URL(path.replace(/^\/+/u, ''), process.env.NEXT_PUBLIC_API_URL)

	const headers = {
		...(options.headers || {}),
	}

	let {
		abortSignal,
		body,
		query,
	} = options

	if (body) {
		if (typeof body !== 'string') {
			body = JSON.stringify(body)
		}

		if (!headers['Content-Type']) {
			headers['Content-Type'] = 'application/json'
		}
	}

	if (query) {
		Object.entries(query).forEach(([key, value]) => {
			url.searchParams.append(key, value)
		})
	}

	return fetch(url, {
		...parsedOptions,
		body,
		headers,
		signal: abortSignal,
	})
}

/**
 * Wraps `apiFetch`, but returns the response's body as JSON.
 *
 * @param  {...any} args Arguments are forwarded directly to `apiFetch`.
 * @returns {object} The response body as a JSON object.
 */
export function apiFetchJSON(...args) {
	return apiFetch(...args)
		.then(response => response.json())
}





/******************************************************************************\
 * Helpers
\******************************************************************************/

/**
 * Attempts to create a new user account.
 *
 * @param {object} user The user object.
 * @param {string} user.email The email of the new account.
 * @param {string} user.password The password of the new account.
 * @param {string} user.username The username of the new account.
 */
export async function createAccount(user, options) {
	const response = await apiFetch('/v1/auth/create-account', {
		...options,
		body: user,
		method: POST,
	})

	if (!response.ok) {
		throw await response.json()
	}
}

/**
 * Checks an email to see if it is valid for use in creating a new user account.
 *
 * @param {string} query The query to search.
 * @param {string} options The query to search.
 * @returns {Promise} The API response.
 */
export function searchGroups(query, options) {
	return apiFetchJSON('/v1/search/groups', {
		...options,
		query: { query },
	})
}

/**
 * Checks an email to see if it is valid for use in creating a new user account.
 *
 * @param {string} email The email to be validated.
 * @returns {Promise} The API response.
 */
export function validateEmail(email, options) {
	return apiFetch('/v1/auth/validate-email', {
		...options,
		query: { email },
	})
}

/**
 * Checks an username to see if it is valid for use in creating a new user account.
 *
 * @param {string} username The username to be validated.
 * @returns {Promise} The API response.
 */
export function validateUsername(username, options) {
	return apiFetch('/v1/auth/validate-username', {
		...options,
		query: { username },
	})
}
