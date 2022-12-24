// Local imports
import styles from './HomePage.module.scss'

import { Content } from '../Content/Content.jsx'
import { PageContent } from '../PageContent/PageContent.jsx'
import { TextRoller } from '../TextRoller/TextRoller.jsx'





// Constants
const HEADING_LINES2 = [
	['brave knight', 'a dragon to slay'],
	['cunning rogue', 'like-minded thieves'],
	['powerful wizard', 'fellow spell slingers'],
	['noble paladin', 'holy quest'],
	['charming bard', 'a band of minstrels'],
	['fierce barbarian', 'a raiding tribe'],
	['wise druid', 'a forest to protect'],
	['stealthy ranger', 'fellow outdoorsmen'],
	['mysterious warlock', 'cabal of fiendish patrons'],
	['devout cleric', 'sacrosanct fellowship'],
]





/**
 * The home page.
 */
export function HomePage() {
	return (
		<PageContent>
			<Content>
				<h2 className={styles['heading']}>
					{'Are you a '}

					<TextRoller items={HEADING_LINES2.map(items => items[0])} />

					{' looking for '}

					<TextRoller items={HEADING_LINES2.map(items => items[1])} />

					{'?'}
				</h2>

				{/* <p>
					{'Are you looking to expand your tabletop group? Maybe you\'re a solo mercenary in need of a new party. Look no further! Our platform is designed specifically for TTRPG enthusiasts to connect and find new groups to play with. With our user-friendly interface and extensive community, you can easily find players near you with similar interests and schedules. Plus, our platform allows you to seamlessly plan and organize your gaming sessions, so you can focus on what\'s really important: the adventure! Join us today and start making lasting connections with fellow TTRPG players. Don\'t let the adventure end - join our platform and keep the dice rolling!'}
				</p> */}
			</Content>
		</PageContent>
	)
}

HomePage.title = 'Home'
