/******************************************************************************\
 * Core functions
\******************************************************************************/

/**
 * Makes a request against the API.
 *
 * @param {string} path The path of the request.
 * @param {object} options Options passed directly to fetch.
 * @returns {*} The response.
 */
export function apiFetch(path, options = {}) {
	const headers = {
		...(options.headers || {}),
	}

	let { body } = options

	if (body) {
		if (typeof body !== 'string') {
			body = JSON.stringify(body)
		}

		if (!headers['Content-Type']) {
			headers['Content-Type'] = 'application/json'
		}
	}

	return fetch(`/api/${path.replace(/^\/+/u, '')}`, {
		...options,
		body,
		headers,
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
export async function createAccount(user) {
	const response = await apiFetch('/auth/create-account', {
		body: user,
		method: 'post',
	})

	if (!response.ok) {
		throw await response.json()
	}
}

/**
 * Checks an email to see if it is valid for use in creating a new user account.
 *
 * @param {string} email The email to be validated.
 * @returns {Promise} The API response.
 */
export function validateEmail(email) {
	return apiFetch(`/auth/validate-email?email=${email}`)
}

/**
 * Checks an username to see if it is valid for use in creating a new user account.
 *
 * @param {string} username The username to be validated.
 * @returns {Promise} The API response.
 */
export function validateUsername(username) {
	return apiFetch(`/auth/validate-username?username=${username}`)
}
