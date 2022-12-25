/**
 * Creates a new version of the function with a delay. If the function is called before the delay timer is finished, the timer will be reset.
 *
 * @param {Function} fn The function to be debounced.
 * @param {number} delay How long to debounce the function.
 * @returns {Function} A debounced version of the callback.
 */
export function debounce(fn, delay) {
	let timeoutID = null

	return (...args) => {
		if (timeoutID) {
			clearTimeout(timeoutID)
		}

		return new Promise(resolve => {
			timeoutID = setTimeout(() => {
				resolve(fn(...args))
			}, delay)
		})
	}
}
