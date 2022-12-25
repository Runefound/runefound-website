// Module imports
import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Fuse from 'fuse.js'





// Local imports
import styles from './CommandPalette.module.scss'

import { CommandPaletteResult } from './CommandPaletteResult.jsx'
import { debounce } from '../../helpers/debounce.js'
import { Dialog } from '../Dialog/Dialog.jsx'
import { FormField } from '../FormField/FormField.jsx'
import { FormInput } from '../FormInput/FormInput.jsx'
import { OrderedList } from '../OrderedList/OrderedList.jsx'





// Constants
const COMMANDS = [
	'Search games',
	'Search groups',
	'Search marketplace',
	'Search users',
].reduce((accumulator, item) => {
	const key = item
		.trim()
		.replace(/\s+/gu, '_')
		.toUpperCase()

	accumulator[key] = {
		key,
		displayName: item,
	}

	return accumulator
}, {})
const COMMANDS_SEARCH = new Fuse(Object.values(COMMANDS), {
	keys: ['displayName'],
	useExtendedSearch: true,
})






// Variables
let isOpen = false





/**
 * @component
 */
export function CommandPalette() {
	const dialogRef = useRef(null)
	const inputRef = useRef(null)

	const [{
		activeResultIndex,
		command,
		query,
		results,
	}, setState] = useState({
		activeResultIndex: null,
		command: null,
		query: '',
		results: [],
	})

	const handleCommandClick = useCallback(key => () => {
		setState(previousState => {
			return {
				...previousState,
				command: key,
			}
		})
	}, [setState])

	const handleInputKeyDown = useCallback(event => {
		const key = event.key.toLowerCase()

		if (!['arrowdown', 'arrowup'].includes(key)) {
			return
		}

		event.preventDefault()

		if (key === 'arrowdown') {
			setState(previousState => {
				const { results } = previousState
				let { activeResultIndex } = previousState

				if (activeResultIndex === null) {
					activeResultIndex = 0
				} else if (activeResultIndex !== (results.length - 1)) {
					activeResultIndex += 1
				}

				return {
					...previousState,
					activeResultIndex,
				}
			})
		} else if (key === 'arrowup') {
			setState(previousState => {
				const { results } = previousState
				let { activeResultIndex } = previousState

				if (activeResultIndex === null) {
					activeResultIndex = results.length - 1
				} else if (activeResultIndex !== 0) {
					activeResultIndex -= 1
				}

				return {
					...previousState,
					activeResultIndex,
				}
			})
		}
	}, [setState])

	const handleResultMouseOut = useCallback(() => {
		setState(previousState => {
			return {
				...previousState,
				activeResultIndex: null,
			}
		})
	}, [setState])

	const handleResultMouseOver = useCallback(itemIndex => () => {
		setState(previousState => {
			return {
				...previousState,
				activeResultIndex: itemIndex
			}
		})
	}, [setState])

	const handleKeyDown = useCallback(event => {
		const {
			key,
			metaKey,
		} = event

		if (metaKey && (key  === 'k')) {
			const dialogElement = dialogRef.current

			isOpen = !isOpen

			if (isOpen) {
				dialogElement.showModal()
			} else {
				dialogElement.close()
			}
		}
	}, [dialogRef])

	const handleSearchChange = useCallback(event => {
		const { value } = event.target

		setState(previousState => {
			return {
				...previousState,
				activeResultIndex: 0,
				query: value,
				results: COMMANDS_SEARCH.search(value),
			}
		})
	}, [setState])

	useEffect(() => {
		if (typeof window !== 'undefined') {
			inputRef.current.addEventListener('keydown', handleInputKeyDown)
			window.addEventListener('keydown', handleKeyDown)

			return () => {
				inputRef.current.removeEventListener('keydown', handleInputKeyDown)
				window.removeEventListener('keydown', handleKeyDown)
			}
		}
	}, [handleKeyDown])

	return (
		<Dialog
			ref={dialogRef}
			className={styles['command-palette']}>
			<FormField>
				<FormInput
					ref={inputRef}
					addonStart={(
						<FontAwesomeIcon
							fixedWidth
							icon={faSearch} />
					)}
					name={'command-palette'}
					onChange={handleSearchChange}
					placeholder={'Command Palette'}
					type={'search'}
					value={query} />
			</FormField>

			<OrderedList className={styles['results']}>
				{results.map((result, itemIndex) => {
					return (
						<CommandPaletteResult
							key={result.item.key}
							activeResultIndex={activeResultIndex}
							index={itemIndex}
							onClick={handleCommandClick(result.item.key)}
							onMouseOver={handleResultMouseOver(itemIndex)}
							onMouseOut={handleResultMouseOut}
							result={result} />
					)
				})}
			</OrderedList>
		</Dialog>
	)
}
