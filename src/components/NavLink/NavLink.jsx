// Style imports
import styles from './NavLink.module.scss'





// Module imports
import {
	AnimatePresence,
	motion,
} from 'framer-motion'
import {
	useCallback,
	useMemo,
	useState,
} from 'react'
import classnames from 'classnames'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router.js'





// Local imports
import { Button } from '../Button/Button.jsx'
import { Link } from '../Link/Link.jsx'
import { mapLink } from '../../helpers/mapLink.jsx'





// Constants
const SUBNAV_WRAPPER_VARIANTS = {
	open: {
		height: 'auto',
	},
	collapsed: {
		height: 0,
		transition: {
			duration: 0.3,
    },
	},
}





/**
 * @typedef Link
 * @property {string} children The contents of the link.
 * @property {Link[]} [links] The path to which this link should lead.
 * @property {string} path The path to which this link should lead.
 */
/**
 * Renders a link, as well as it's sub links if there are any.
 *
 * @param {Link} props All props.
 */
export function NavLink(props) {
	const {
		children,
		links,
		path,
	} = props

	const Router = useRouter()

	const [isOpen, setIsOpen] = useState(false)

	const handleSubnavToggle = useCallback(event => {
		event.preventDefault()
		setIsOpen(previousState => !previousState)
	}, [setIsOpen])

	const compiledClassName = useMemo(() => {
		return classnames(styles['nav-link'], {
			[styles['is-active']]: Router.asPath === path,
			[styles['subnav-controls']]: links,
		})
	}, [
		links,
		path,
		Router.asPath,
	])

	const renderedLink = (
		<Link
			className={compiledClassName}
			href={path}>
			{children}

			{(Boolean(links)) && (
				<Button onClick={handleSubnavToggle}>
					<FontAwesomeIcon
						fixedWidth
						icon={faCaretDown}/>
				</Button>
			)}
		</Link>
	)

	if (links) {
		return (
			<div
				className={styles['subnav']}
				data-is-open={isOpen}>
				{renderedLink}

				<motion.div
					key={'subnav-content'}
					animate={isOpen ? 'open' : 'collapsed'}
					className={styles['subnav-content']}
					exit={'collapsed'}
					initial={'collapsed'}
					variants={SUBNAV_WRAPPER_VARIANTS}>
					<AnimatePresence exitBeforeEnter>
						{isOpen && links.map((link, index) => {
							return (
								<motion.div
									key={index}
									// eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
									exit={{ opacity: 1 }}>
									{mapLink(link, index)}
								</motion.div>
							)
						})}
					</AnimatePresence>
				</motion.div>
			</div>
		)
	}

	return renderedLink
}

NavLink.defaultProps = {
	links: null,
}

NavLink.propTypes = {
	children: PropTypes.node.isRequired,
	links: PropTypes.arrayOf(PropTypes.shape({
		children: PropTypes.node.isRequired,
		path: PropTypes.string.isRequired,
		links: PropTypes.array,
	})),
	path: PropTypes.string.isRequired,
}
