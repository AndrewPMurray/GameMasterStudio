import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getCampaigns } from '../../store/campaigns';
import { getCharacters } from '../../store/characters';
import CampaignFormModal from '../CampaignFormModal';

export default function UserHome() {
	const campaigns = useSelector((state) => state.campaigns);
	const characters = useSelector((state) => state.characters);
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const charactersArr = Object.values(characters);

	useEffect(() => {
		dispatch(getCampaigns(user?.id));
		dispatch(getCharacters(user?.id));
	}, [dispatch, user]);

	return (
		<>
			<h1>Welcome home, warrior</h1>
			<CampaignFormModal />
			<p>All Characters</p>
			<ul id='characters-list'>
				{charactersArr?.map((character) => (
					<li>
						<Link to={`/characters/${character.id}`}>{character.name}</Link>
					</li>
				))}
			</ul>
			<Link to='/characters'>Create New Character</Link>
		</>
	);
}
