// Constants
const COOKIE_OPTION_BOOLEANS = ['samesite', 'secure']
const COOKIE_OPTION_STRINGS = ['domain', 'expires', 'max-age', 'path']
const RESERVED_COOKIE_NAMES = [
	...COOKIE_OPTION_BOOLEANS,
	...COOKIE_OPTION_STRINGS,
]
const REGEX_STRING = `.*?=(.*?)(?:;)((?:(?:(?:${COOKIE_OPTION_BOOLEANS.join('|')})|(?:(?:${COOKIE_OPTION_STRINGS.join('|')})=.*?))(?:;|$))*)`





// Variables
let cookieString = null
let cookieJar = null





/**
 * Updates the local cookie cache object.
 */
function updateCachedCookies() {
	cookieString = document.cookie

	// Trim spaces around semicolons and equals
	cookieString = cookieString
		.replace(/\s*;\s*/gu, ';')
		.replace(/\s*=\s*/gu, '=')

	const cookies = [...document.cookie.matchAll(new RegExp(REGEX_STRING, 'gu'))]

	cookieJar = cookies.reduce((accumulator, cookieArray) => {
		const [,
			name,
			value,
			optionsString = '',
		] = cookieArray

		const options = optionsString
			.replace(/;$/u, '')
			.split(';')
			.reduce((optionsAccumulator, optionString) => {
				const [key, optionValue] = optionString.split('=')

				optionsAccumulator[key] = optionValue ?? true

				return optionsAccumulator
			}, {})

		accumulator[name] = {
			options,
			value,
		}

		return accumulator
	}, {})
}

/**
 * Sets a cookie's value.
 *
 * @param {string} name The name of the cookie to be set.
 * @param {string | number} value The value of the cookie.
 * @param {object} options Options to be set for this cookie.
 */
function set(name, value, options = {}) {
	if (RESERVED_COOKIE_NAMES.includes(name)) {
		console.error(`COOKIE HAS NOT BEEN SET: ${name}. ${name} is reserved.`)
	}

	let cookieStringToSet = `${name}=${value}`

	Object.keys(options).forEach(key => {
		if (![...COOKIE_OPTION_STRINGS, 'maxAge'].includes(key)) {
			console.warn(`Unrecognized option set for cookie ${name}: ${key}`)
		}
	})

	if (options.maxAge) {
		cookieStringToSet += `;max-age=${options.maxAge}`
	}

	COOKIE_OPTION_STRINGS.forEach(key => {
		if (options[key]) {
			cookieStringToSet += `;${key}=${options[key]}`
		}
	})

	document.cookie = cookieStringToSet
}

/**
 * Removes a cookie.
 *
 * @param {string} name The name of the cookie to be removed.
 */
function remove(name) {
	set(name, ';max-age=0;')
}

// If a `name` is passed, returns the value of that cookie. Otherwise, return
// the entire cookie jar.
/**
 * Retrieves the value of a cookie.
 *
 * @param {string} name The name of the cookie to be retrieved.
 * @returns {string} The value of the cookie.
 */
function get(name) {
	if (document.cookie !== cookieString) {
		updateCachedCookies()
	}

	return cookieJar[name]
}

/**
 * Retrieves all cookies.
 *
 * @returns {object} An object containing all currently set cookies.
 */
function getAll() {
	if (document.cookie !== cookieString) {
		updateCachedCookies()
	}

	return cookieJar
}

export {
	get,
	getAll,
	remove,
	set,
}
