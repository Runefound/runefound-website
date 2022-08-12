// Style imports
import styles from './PageContent.module.scss'





// Module imports
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useMemo } from 'react'





/**
 * Wraps page content in a `main` element and abstracts SEO functionality.
 * @param {object} props All props.
 * @param {import('react').ReactNode} [props.children] The contents of the component.
 * @param {string} [props.className] Additional classes to be applied to the component.
 */
export function PageContent(props) {
	const {
		children,
		className,
	} = props

	const compiledClassName = useMemo(() => {
		return classnames(styles['page-content'], className)
	}, [className])

	return (
		<main className={compiledClassName}>
			{children}
		</main>
	)
}

PageContent.defaultProps = {
	children: null,
	className: '',
}

PageContent.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}
