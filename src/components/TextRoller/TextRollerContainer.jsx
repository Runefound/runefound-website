// Module imports
import {
	useEffect,
	useMemo,
} from 'react'
import classnames from 'classnames'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { TextRollerItem } from './TextRollerItem.jsx'





// Local imports
import styles from './TextRoller.module.scss'

import { useTextRollerContext } from './useTextRollerContext.js'





/**
 *
 * @component
 */
export function TextRollerContainer(props) {
	const { className } = props

	const {
		height,
		items,
		primaryIndex,
		rollDelay,
		rollToNextItem,
		width,
	} = useTextRollerContext()

	const compiledClassName = useMemo(() => {
		return classnames(styles['text-roller'], className)
	}, [className])

	const mappedItems2 = useMemo(() => {
		const firstItemIndex = primaryIndex - 3

		return Array(7)
			.fill(null)
			.map((_, index) => {
				const indexOffset = firstItemIndex + index
				const itemIndex = indexOffset % 7
				const item = items.at(itemIndex)
				const originalItemIndex = items.indexOf(item)

				return (
					<TextRollerItem
						key={originalItemIndex}
						indexOffset={indexOffset}>
						{item}
					</TextRollerItem>
				)
			})
	}, [
		items,
		primaryIndex,
	])

	const containerStyles = useMemo(() => {
		return {
			minHeight: height,
			height,
			minWidth: width,
			width,
		}
	}, [
		height,
		width,
	])

	useEffect(() => {
		const intervalID = setInterval(() => {
			rollToNextItem()
		}, rollDelay)

		return () => {
			clearInterval(intervalID)
		}
	}, [
		items,
		rollToNextItem,
	])

	return (
		<motion.span
			className={compiledClassName}
			style={containerStyles}>
			{mappedItems2}
		</motion.span>
	)
}

TextRollerContainer.defaultProps = {
	className: '',
}

TextRollerContainer.propTypes = {
	/** Additional classes to be applied to the component. */
	className: PropTypes.string,
}
