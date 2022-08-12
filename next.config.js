/* eslint-env node */

/**
 * @typedef RedirectConfig
 * @property {string} source The route to be redirected
 * @property {string} destination The destination to which the request should be redirected
 * @property {boolean} permanent Whether this redirect should be a 307 (temp) or 308 (permanent)
 */

module.exports = {
	/**
	 * @returns {RedirectConfig[]} An array of redirect configs.
	 */
	redirects() {
		return [
			{
				source: '/twitter',
				destination: 'https://twitter.com/RollForGuild',
				permanent: false,
			},
			{
				source: '/instagram',
				destination: 'https://instagram.com/RollForGuild',
				permanent: false,
			},
			{
				source: '/facebook',
				destination: 'https://facebook.com/RollForGuild',
				permanent: false,
			},
			{
				source: '/kickstarter',
				destination: 'https://kickstarter.com/projects/589540064/roll-for-guild',
				permanent: false,
			},
			{
				source: '/youtube',
				destination: 'https://www.youtube.com/channel/UCW9fAESWXx9z5nqspxS_DXw',
				permanent: false,
			},
		]
	},
}
