/**
 * Updates form errors with useful messages based on API responses.
 *
 * @param {object} error The error object from the API.
 * @param {string} error.code The code of the error.
 * @param {Function} updateValidity A function for updating the form validity.
 */
export function handleError(error, updateValidity) {
	switch (error?.code) {
		case 'auth/email-already-exists':
			updateValidity('email', ['An account already exists with this email address.'])
			break

		case 'auth/invalid-password':
			updateValidity('password', ['Invalid password. Passwords must be at least 6 characters long.'])
			break

		case 'auth/username-already-exists':
			updateValidity('username', ['An account already exists with this username.'])
			break

		default:
			console.log(error)
	}
}
