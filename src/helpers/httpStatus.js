/* eslint-disable no-magic-numbers */
const HttpStatus = {
	// Informational
	CONTINUE: {
		code: 100,
		message: 'Continue',
	},
	SWITCHING_PROTOCOLS: {
		code: 101,
		message: 'Switching protocols',
	},
	PROCESSING: {
		code: 102,
		message: 'Processing',
	},

	// Success
	OK: {
		code: 200,
		message: 'OK',
	},
	CREATED: {
		code: 201,
		message: 'Created',
	},
	ACCEPTED: {
		code: 202,
		message: 'Accepted',
	},
	NON_AUTHORITATIVE_INFORMATION: {
		code: 203,
		message: 'Non-authoritative information',
	},
	NO_CONTENT: {
		code: 204,
		message: 'No content',
	},
	RESET_CONTENT: {
		code: 205,
		message: 'Reset content',
	},
	PARTIAL_CONTENT: {
		code: 206,
		message: 'Partial ccontent',
	},
	MULTI_STATUS: {
		code: 207,
		message: 'Multi-status',
	},
	ALREADY_REPORTED: {
		code: 208,
		message: 'Already reported',
	},
	IM_USED: {
		code: 226,
		message: 'IM Used',
	},

	// Redirection
	MULTIPLE_CHOICES: {
		code: 300,
		message: 'Multiple choices',
	},
	MOVED_PERMANENTLY: {
		code: 301,
		message: 'Moved permanently',
	},
	FOUND: {
		code: 302,
		message: 'Found',
	},
	SEE_OTHER: {
		code: 303,
		message: 'See other',
	},
	NOT_MODIFIED: {
		code: 304,
		message: 'Not modified',
	},
	USE_PROXY: {
		code: 305,
		message: 'Use proxy',
	},
	TEMPORARY_REDIRECT: {
		code: 307,
		message: 'Temporary redirect',
	},
	PERMANENT_REDIRECT: {
		code: 308,
		message: 'Permanent redirect',
	},

	// Client Error
	BAD_REQUEST: {
		code: 400,
		message: 'Bad request',
	},
	UNAUTHORIZED: {
		code: 401,
		message: 'Unauthorized',
	},
	PAYMENT_REQUIRED: {
		code: 402,
		message: 'Payment required',
	},
	FORBIDDEN: {
		code: 403,
		message: 'Forbidden',
	},
	NOT_FOUND: {
		code: 404,
		message: 'Not found',
		description: 'Whatever you were looking for... well, it seems to be quite lost. Perhaps you left it back at camp?',
	},
	METHOD_NOT_ALLOWED: {
		code: 405,
		message: 'Method not allowed',
	},
	NOT_ACCEPTABLE: {
		code: 406,
		message: 'Not acceptable',
	},
	PROXY_AUTHENTICATION_REQUIRED: {
		code: 407,
		message: 'Proxy authentication required',
	},
	REQUEST_TIMEOUT: {
		code: 408,
		message: 'Request timeout',
	},
	CONFLICT: {
		code: 409,
		message: 'Conflict',
	},
	GONE: {
		code: 410,
		message: 'Gone',
	},
	LENGTH_REQUIRED: {
		code: 411,
		message: 'Length required',
	},
	PRECONDITION_FAILED: {
		code: 412,
		message: 'Precondition failed',
	},
	PAYLOAD_TOO_LARGE: {
		code: 413,
		message: 'Payload too large',
	},
	URI_TOO_LONG: {
		code: 414,
		message: 'URI too long',
	},
	UNSUPPORTED_MEDIA_TYPE: {
		code: 415,
		message: 'Unsupported media type',
	},
	RANGE_NOT_SATISFIABLE: {
		code: 416,
		message: 'Range not satisfiable',
	},
	EXPECTATION_FAILED: {
		code: 417,
		message: 'Expectation failed',
	},
	IM_A_TEAPOT: {
		code: 418,
		message: 'I\'m a teapot! 🫖',
	},
	MISDIRECTED_REQUEST: {
		code: 421,
		message: 'Misdirected request',
	},
	UNPROCESSABLE_ENTITY: {
		code: 422,
		message: 'Unprocessable entity',
	},
	LOCKED: {
		code: 423,
		message: 'Locked',
	},
	FAILED_DEPENDENCY: {
		code: 424,
		message: 'Failed dependency',
	},
	UPGRADE_REQUIRED: {
		code: 426,
		message: 'Upgrade required',
	},
	PRECONDITION_REQUIRED: {
		code: 428,
		message: 'Precondition required',
	},
	TOO_MANY_REQUESTS: {
		code: 429,
		message: 'Too many requests',
	},
	HEADER_FIELDS_TOO_LARGE: {
		code: 431,
		message: 'Header fields too large',
	},
	CLOSED_WITHOUT_RESPONSE: {
		code: 444,
		message: 'Closed without resposne',
	},
	UNAVAILABLE_FOR_LEGAL_REASONS: {
		code: 451,
		message: 'Unavailable for legal reasons',
	},
	CLIENT_CLOSED_REQUEST: {
		code: 499,
		message: 'Client closed request',
	},

	// Server Error
	INTERNAL_SERVER_ERROR: {
		code: 500,
		message: 'Internal server error',
		description: 'Something\'s gone terribly wrong with the incantation. Unfortunately, your spell was just too powerful for us.',
	},
	NOT_IMPLEMENTED: {
		code: 501,
		message: 'Not implemented',
	},
	BAD_GATEWAY: {
		code: 502,
		message: 'Bad gateway',
	},
	SERVICE_UNAVAILABLE: {
		code: 503,
		message: 'Service unavailable',
	},
	GATEWAY_TIMEOUT: {
		code: 504,
		message: 'Gateway timeout',
	},
	HTTP_VERSION_NOT_SUPPORTED: {
		code: 505,
		message: 'HTTP version not supported',
	},
	VARIANT_ALSO_NEGOTIATES: {
		code: 506,
		message: 'Variant also negotiates',
	},
	INSUFFICIENT_STORAGE: {
		code: 507,
		message: 'Insufficient storage',
	},
	LOOP_DETECTED: {
		code: 508,
		message: 'Loop detected',
	},
	NOT_EXTENDED: {
		code: 510,
		message: 'Not extended',
	},
	NETWORK_AUTHENTICATION_REQUIRED: {
		code: 511,
		message: 'Network authentication required',
	},
	NETWORK_CONNECTION_TIMEOUT_ERROR: {
		code: 599,
		message: 'Network connection timeout error',
	},

	// Helper Functions
	/* eslint-disable jsdoc/require-jsdoc */
	isInformational: code => code >= 100 && code < 200,
	isSuccess: code => code >= 200 && code < 300,
	isRedirection: code => code >= 300 && code < 400,
	isError: code => code >= 400 && code < 600,
	isClientError: code => code >= 400 && code < 500,
	isServerError: code => code >= 500 && code < 600,
	/* eslint-enable jsdoc/require-jsdoc*/
}





Object.freeze(HttpStatus)





export default HttpStatus
