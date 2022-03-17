import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getCampaigns, deleteCampaign } from '../../store/campaigns';
import { getCharacters, deleteCharacter } from '../../store/characters';
import CampaignFormModal from '../CampaignFormModal';
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

	const handleCharacterDelete = async (id) => {
		await dispatch(deleteCharacter(id));
	};

	const handleCampaignDelete = async (id) => {
		await dispatch(deleteCampaign(id));
	};

	return (
		<div className='user-home-container'>
			<div id='campaigns-container'>
				<div id='campaigns-list'>
					<p>Campaigns</p>
					<div id='campaigns'>
						{campaignsArr?.map((campaign) => (
							<div id='campaign' key={`campaign-${campaign.id}`}>
								<div onClick={() => handleCampaignDelete(campaign.id)}>
									<i className='fas fa-trash'></i>
								</div>
								<Link to={`/campaigns/${campaign.id}`}>{campaign.title}</Link>
							</div>
						))}
					</div>
				</div>
				<div id='new-campaign-button'>
					<CampaignFormModal />
				</div>
			</div>
			<div id='characters-container'>
				<div id='characters-list'>
					<p>Characters</p>
					<div id='characters'>
						{charactersArr?.map((character) => (
							<div id='character' key={`character-${character.id}`}>
								<div onClick={() => handleCharacterDelete(character.id)}>
									<i className='fas fa-trash'></i>
								</div>
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
