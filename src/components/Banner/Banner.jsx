// Style imports
import styles from './Banner.module.scss'





// Module imports
import {
	faComments,
	faMagnifyingGlass,
	faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image.js'





// Local imports
import { BannerFooter } from '../BannerFooter/BannerFooter.jsx'
import { Link } from '../Link/Link.jsx'
import { mapLink } from '../../helpers/mapLink.jsx'





// Constants
const LINKS = [
	{
		children: (
			<>
				<FontAwesomeIcon
					fixedWidth
					icon={faUsers} />
				{'Groups'}
			</>
		),
		path: '/groups',
		links: [
			{
				children: (
					<>
						<FontAwesomeIcon
							fixedWidth
							icon={faMagnifyingGlass} />
						{'Search'}
					</>
				),
				path: '/groups/search',
			},
		],
	},
	{
		children: (
			<>
				<FontAwesomeIcon
					fixedWidth
					icon={faComments} />
				{'Forums'}
			</>
		),
		path: '/forums',
	},
	{
		children: (
			<>
				<FontAwesomeIcon
					fixedWidth
					icon={faMagnifyingGlass} />
				{'About'}
			</>
		),
		path: '/about',
	},
]




/**
 * Renders the main site banner.
 */
export function Banner() {
	return (
		<header
			className={styles.banner}
			role={'banner'}>
			<h1 className={styles.brand}>
				<Link href={'/'}>
					<Image
						alt={'Roll For Guild Logo'}
						layout={'fill'}
						objectFit={'contain'}
						objectPosition={'center'}
						src={'/images/brands/roll-for-guild/logomark.white.short.svg'} />
				</Link>
			</h1>

			<nav>
				{LINKS.map(mapLink)}
			</nav>

			<BannerFooter />
		</header>
	)
}
