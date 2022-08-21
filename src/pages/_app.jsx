/* eslint-env node */
// Style imports
import '../scss/reset.scss'
import '../scss/lib.scss'
import '../scss/app.scss'





// Module imports
import { AnimatePresence } from 'framer-motion'
import { ColorModeContextProvider } from 'react-color-mode'
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core'
import NextHead from 'next/head.js'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'





// Local imports
import { AuthContextProvider } from '../contexts/Auth/AuthContextProvider.jsx'
import { PageLayout } from '../components/PageLayout/PageLayout.jsx'





fontAwesomeConfig.autoAddCss = false

/**
 * Scrolls to the top of the page if possible.
 */
function handleExitComplete() {
	if (typeof window !== 'undefined') {
		window.scrollTo({ top: 0 })
	}
}

// eslint-disable-next-line jsdoc/require-jsdoc
export default function App(props) {
	const {
		Component,
		pageProps,
	} = props
	const router = useRouter()

	return (
		<>
			<NextHead>
				<meta charSet={'utf-8'} />
				<meta
					content={'width=device-width, initial-scale=1, maximum-scale=1'}
					name={'viewport'} />
			</NextHead>

			<ColorModeContextProvider>
				<AuthContextProvider>
					<AnimatePresence
						exitBeforeEnter
						onExitComplete={handleExitComplete}>
						<PageLayout
							showTitle={Component.showTitle}
							title={Component.title}>
							<Component
								key={router.route}
								{...pageProps} />
						</PageLayout>
					</AnimatePresence>
				</AuthContextProvider>
			</ColorModeContextProvider>
		</>
	)
}

App.defaultProps = {
	pageProps: {},
}

App.propTypes = {
	Component: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.node,
	]).isRequired,
	pageProps: PropTypes.object,
}
