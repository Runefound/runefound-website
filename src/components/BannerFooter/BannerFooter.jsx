// Style imports
import styles from './BannerFooter.module.scss'





// Local imports
import {
	faCheckDouble,
	faCookie,
	faFileContract,
	faHeart,
	faUserSecret,
} from '@fortawesome/free-solid-svg-icons'
import {
	faFacebook,
	faInstagram,
	faKickstarter,
	faTwitter,
	faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from '../Link/Link.jsx'





/**
 * Renders the main site banner.
 */
export function BannerFooter() {
	return (
		<footer className={styles['banner-footer']}>
			<nav className={styles.legal}>
				<Link href={'/code-of-conduct'}>
					<>
						<FontAwesomeIcon
							fixedWidth
							icon={faHeart} />
						{'Code of Conduct'}
					</>
				</Link>

				<Link href={'/terms-of-service'}>
					<>
						<FontAwesomeIcon
							fixedWidth
							icon={faFileContract} />
						{'Terms of Service'}
					</>
				</Link>

				<Link href={'/privacy-policy'}>
					<>
						<FontAwesomeIcon
							fixedWidth
							icon={faUserSecret} />
						{'Privacy Policy'}
					</>
				</Link>

				<Link href={'/cookie-policy'}>
					<>
						<FontAwesomeIcon
							fixedWidth
							icon={faCookie} />
						{'Cookie Policy'}
					</>
				</Link>

				<Link href={'/acceptable-use-policy'}>
					<>
						<FontAwesomeIcon
							fixedWidth
							icon={faCheckDouble} />
						{'Acceptable Use Policy'}
					</>
				</Link>
			</nav>

			<nav className={styles.social}>
				<Link href={'/twitter'}>
					<FontAwesomeIcon
						fixedWidth
						icon={faTwitter} />
				</Link>

				<Link href={'/instagram'}>
					<FontAwesomeIcon
						fixedWidth
						icon={faInstagram} />
				</Link>

				<Link href={'/facebook'}>
					<FontAwesomeIcon
						fixedWidth
						icon={faFacebook} />
				</Link>

				<Link href={'/kickstarter'}>
					<FontAwesomeIcon
						fixedWidth
						icon={faKickstarter} />
				</Link>

				<Link href={'/youtube'}>
					<FontAwesomeIcon
						fixedWidth
						icon={faYoutube} />
				</Link>
			</nav>
		</footer>
	)
}
