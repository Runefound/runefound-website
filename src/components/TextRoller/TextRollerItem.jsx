// Module imports
import {
	motion,
	useSpring,
	useTransform,
} from 'framer-motion'
import {
	useCallback,
	useEffect,
	useId as useID,
} from 'react'
import PropTypes from 'prop-types'
import useDimensions from 'react-cool-dimensions'





// Local imports// Local imports
import styles from './TextRoller.module.scss'

import { useTextRollerContext } from './useTextRollerContext.js'





function calculateTop(primaryIndex, indexOffset) {
	return `${((primaryIndex - indexOffset) * -1) * 100}%`
}

/** @component */
export function TextRollerItem(props) {
	const {
		children,
		indexOffset,
	} = props

	const id = useID()
	const {
		primaryIndex,
		updateSizes,
	} = useTextRollerContext()

	const { observe } = useDimensions({
		onResize: ({ height, width }) => {
			updateSizes({
				id,
				height,
				width,
			})
		},
	})

	const calculateOpacity = useCallback(value => {
		if (Math.abs(primaryIndex - indexOffset) > 2) {
			return 0
		}

		return parseFloat((1 - (Math.abs(parseInt(value) / 100) * 0.4)).toFixed(2))
	})

	const top = useSpring(calculateTop(primaryIndex, indexOffset))

	const opacity = useTransform(top, calculateOpacity)

	useEffect(() => {
		const newTop = calculateTop(primaryIndex, indexOffset)

		if (top.get() !== newTop) {
			top.set(newTop)
		}
	}, [
		indexOffset,
		primaryIndex,
	])

	return (
		<motion.span
			ref={observe}
			className={styles['text-roller-item']}
			style={{
				opacity,
				top,
			}}>
			{children}
		</motion.span>
	)
}

TextRollerItem.defaultProps = {
	children: null,
}

TextRollerItem.propTypes = {
	/** The contents of the component. */
	children: PropTypes.node,

	/** This item's index offset. */
	indexOffset: PropTypes.number.isRequired,
}
