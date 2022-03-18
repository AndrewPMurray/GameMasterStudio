import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCampaigns } from '../../store/campaigns';
import { getCharacters } from '../../store/characters';
import CampaignFormModal from '../CampaignFormModal';
import DeleteCampaignModal from '../DeleteCampaignModal';
import DeleteCharacterModal from '../DeleteCharacterModal';
import './UserHome.css';

export default function UserHome() {
	const campaigns = useSelector((state) => state.campaigns);
	const characters = useSelector((state) => state.characters);
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const charactersArr = Object.values(characters);
	const campaignsArr = Object.values(campaigns);

	useEffect(() => {
		dispatch(getCampaigns(user?.id));
		dispatch(getCharacters(user?.id));
	}, [dispatch, user]);

	return (
		<div className='user-home-container'>
			<div id='campaigns-container'>
				<div id='campaigns-list'>
					<p>Campaigns</p>
					<div id='campaigns'>
						{campaignsArr?.map((campaign) => (
							<div id='campaign' key={`campaign-${campaign.id}`}>
								<DeleteCampaignModal
									campaignId={campaign.id}
									campaignTitle={campaign.title}
								/>
								<Link to={`/campaigns/${campaign.id}`}>{campaign.title}</Link>
							</div>
						))}
					</div>
				</div>
				<div id='new-campaign-button'>
					<CampaignFormModal userId={user.id} />
				</div>
			</div>
			<div id='characters-container'>
				<div id='characters-list'>
					<p>Characters</p>
					<div id='characters'>
						{charactersArr?.map((character) => (
							<div id='character' key={`character-${character.id}`}>
								<DeleteCharacterModal
									characterId={character.id}
									characterName={character.name}
								/>
								<Link to={`/characters/${character.id}`}>{character.name}</Link>
							</div>
						))}
					</div>
				</div>
				<Link id='user-home-button' to='/characters'>
					<button id='add-character-button'>
						<i className='fas fa-plus-square' style={{ paddingRight: '10px' }}></i>New
						Character
					</button>
				</Link>
			</div>
		</div>
	);
}
