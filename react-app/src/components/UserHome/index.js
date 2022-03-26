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
				<div
					id='campaign-image'
					style={{
						backgroundImage:
							'url(https://gamemasterstudio.s3.us-east-2.amazonaws.com/campaignbackground.jpg)',
						backgroundRepeat: 'no-repeat',
						backgroundSize: '1900px 200%',
						opacity: 0.11,
					}}
				></div>
				<div id='campaigns-list' style={{ zIndex: 20 }}>
					<p>Campaigns</p>
					<div id='campaigns'>
						{campaignsArr?.map((campaign) => (
							<div id='campaign' key={`campaign-${campaign.id}`}>
								{user.id === campaign.owner_id ? (
									<DeleteCampaignModal
										campaignId={campaign.id}
										campaignTitle={campaign.title}
									/>
								) : (
									<div style={{ marginRight: '10px', width: '15px' }}></div>
								)}
								<Link to={`/campaigns/${campaign.id}`}>
									{campaign.title.length > 20
										? `${campaign.title.slice(0, 20)}...`
										: campaign.title}
								</Link>
							</div>
						))}
					</div>
				</div>
				<CampaignFormModal userId={user.id} />
			</div>
			<div id='characters-container'>
				<div
					id='character-image'
					style={{
						background:
							'linear-gradient(to bottom, transparent 0%, rgba(30, 30, 30, 0.3) 50%, #222222 100%), url(https://gamemasterstudio.s3.us-east-2.amazonaws.com/characterbackground.jpg) no-repeat',
						backgroundSize: '1900px',
						opacity: 0.17,
					}}
				></div>
				<div id='characters-list' style={{ zIndex: 20 }}>
					<p>Characters</p>
					<div id='characters'>
						{charactersArr?.map((character) => (
							<div id='character' key={`character-${character.id}`}>
								<DeleteCharacterModal
									characterId={character.id}
									characterName={character.name}
								/>
								<Link to={`/characters/${character.id}`}>
									{character.name.length > 20
										? `${character.name.slice(0, 20)}...`
										: character.name}
								</Link>
							</div>
						))}
					</div>
				</div>
				<Link id='user-home-button' to='/characters' style={{ zIndex: 20 }}>
					<button id='add-character-button'>
						<i className='fas fa-hat-wizard' style={{ paddingRight: '10px' }}></i>New
						Character
					</button>
				</Link>
			</div>
		</div>
	);
}
