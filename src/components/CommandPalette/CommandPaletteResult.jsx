// Module imports
import classnames from 'classnames'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'





// Local imports
import styles from './CommandPalette.module.scss'

import { Button } from '../Button/Button.jsx'





/**
 * @component
 */
export function CommandPaletteResult(props) {
	const {
		activeResultIndex,
		index,
		onMouseOver,
		onMouseOut,
		result,
	} = props

	const compiledClassName = classnames(styles['result-item'], {
		[styles['is-active']]: activeResultIndex === index,
	})

	return (
		<li className={compiledClassName}>
			<Button
				onMouseOver={onMouseOver}
				onMouseOut={onMouseOut}>
				<FontAwesomeIcon icon={faSearch} />
				{result.item.displayName}
			</Button>
		</li>
	)
}
