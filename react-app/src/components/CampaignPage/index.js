import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import './CampaignPage.css';
import { addGameMaster, getCampaigns, updateCampaign } from '../../store/campaigns';
import {
	addCharacterToCampaign,
	getCharacters,
	removeCharacterFromCampaign,
} from '../../store/characters';

const CampaignPage = () => {
	const { campaignId } = useParams();
	const [errors, setErrors] = useState({});
	const campaign = useSelector((state) => state.campaigns[campaignId]);
	const characters = useSelector((state) => state.campaigns[campaignId]?.characters);
	const user = useSelector((state) => state.session.user);
	const gameMaster = campaign?.game_master;
	const [edit, setEdit] = useState(false);
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [userCharacter, setUserCharacter] = useState({});
	const [changeCharacter, setChangeCharacter] = useState(-1);
	const [selectedCharacter, setSelectedCharacter] = useState('');

	const handleChangeCharacter = useCallback(() => {
		if (selectedCharacter === '') return;

		if (selectedCharacter === 'remove' && userCharacter) {
			dispatch(removeCharacterFromCampaign(userCharacter?.id));
			setChangeCharacter(() => -1);
			setSelectedCharacter(() => '');
			setUserCharacter({});
			return;
		}

		if (selectedCharacter === 'game_master') {
			if (userCharacter && Object.values(userCharacter).length > 1) {
				dispatch(removeCharacterFromCampaign(userCharacter.id));
			}
			dispatch(
				addGameMaster({
					user_id: user.id,
					campaign_id: campaign?.id,
				})
			);
			setChangeCharacter(() => -1);
			setSelectedCharacter(() => '');
			setUserCharacter({ gameMaster: user.id });
		} else if (selectedCharacter !== 'remove') {
			dispatch(
				addCharacterToCampaign({
					character_id: selectedCharacter,
					campaign_id: campaign?.id,
				})
			);
			setChangeCharacter(() => -1);
			setSelectedCharacter(() => '');
			setUserCharacter(characters[selectedCharacter]);
		}
	}, [selectedCharacter, userCharacter, campaign?.id, user.id, dispatch, characters]);

	useEffect(() => {
		if (selectedCharacter !== '') handleChangeCharacter();
	}, [handleChangeCharacter, selectedCharacter]);

	useEffect(() => {
		dispatch(getCampaigns(user.id));
		dispatch(getCharacters(user.id));
	}, [dispatch, user.id, selectedCharacter]);

	useEffect(() => {
		if (campaign?.game_master?.id === user.id) {
			setUserCharacter({ gameMaster: user.id });
			return;
		}
		if (characters?.length === 0) {
			setUserCharacter({});
			return;
		}
		characters?.forEach((character, i) => {
			if (character.user.id === user.id) setUserCharacter(character);
			if (character.user.id !== user.id && i === characters.length - 1) setUserCharacter({});
		});
	}, [characters, user.id, selectedCharacter, campaign?.game_master?.id]);

	useEffect(() => {
		setTitle(campaign?.title);
		setDescription(campaign?.description);
	}, [campaign?.title, campaign?.description]);

	const handleEdit = async () => {
		const editedForm = await dispatch(
			updateCampaign({
				campaign_id: campaignId,
				title,
				description,
				owner_id: campaign.owner_id,
			})
		);

		if (editedForm?.errors) setErrors(editedForm.errors);
		else setEdit(false);
	};

	console.log(userCharacter);

	return (
		<div className='campaign-container'>
			<div id='campaign-sections-container'>
				<h3>Sections</h3>
			</div>
			<div id='campaign-info'>
				<div id='campaign-title-and-edit'>
					{edit ? (
						<input
							id='campaign-title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					) : (
						<h2 id='campaign-title'>{campaign?.title}</h2>
					)}
					{user?.id === campaign?.owner_id &&
						(edit ? (
							<button onClick={handleEdit} id='edit-campaign-button'>
								Save
							</button>
						) : (
							<button onClick={() => setEdit(!edit)} id='edit-campaign-button'>
								Edit Campaign
							</button>
						))}
				</div>
				{edit ? (
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				) : (
					<pre id='campaign-description'>{campaign?.description}</pre>
				)}
			</div>
			<div id='campaign-characters-container'>
				<h3>Starring:</h3>
				<div id='campaign-characters-list'>
					{campaign?.game_master &&
						(changeCharacter === -2 ? (
							<select
								value={selectedCharacter}
								onChange={(e) => setSelectedCharacter(() => e.target.value)}
							>
								<option value=''>Select a character</option>
								{!gameMaster && <option value='game_master'>Game Master</option>}
								{user?.characters.map((userCharacter) => (
									<option key={`${userCharacter.name}`} value={userCharacter.id}>
										{userCharacter.name}
									</option>
								))}
								<option value='remove'>Remove character</option>
							</select>
						) : (
							<div>
								<p id='campaign-character'>Game Master: {gameMaster?.username}</p>
								{campaign?.game_master?.id === user.id && (
									<p
										id='change-character'
										style={{ fontSize: '12px', color: '#AAAAAA' }}
										onClick={() => setChangeCharacter(-2)}
									>
										change
									</p>
								)}
							</div>
						))}
					{characters?.map((character, i) =>
						changeCharacter === i ? (
							<select
								key={`character-${character.id}`}
								value={selectedCharacter}
								onChange={(e) => setSelectedCharacter(() => e.target.value)}
							>
								<option value=''>Select a character</option>
								{!gameMaster && <option value='game_master'>Game Master</option>}
								{user?.characters.map((userCharacter) => (
									<option key={`${userCharacter.name}`} value={userCharacter.id}>
										{userCharacter.name}
									</option>
								))}
								<option value='remove'>Remove character</option>
							</select>
						) : (
							<div id='campaign-character' key={`character-${character.id}`}>
								<Link to={`/characters/${character.id}`}>
									{character.name} ({character.user.username})
								</Link>
								{character.user.id === user.id && (
									<p
										id='change-character'
										style={{ fontSize: '12px', color: '#AAAAAA' }}
										onClick={() => setChangeCharacter(i)}
									>
										change
									</p>
								)}
							</div>
						)
					)}
					{userCharacter && Object.values(userCharacter).length === 0 ? (
						<select
							value={selectedCharacter}
							onChange={(e) => setSelectedCharacter(e.target.value)}
						>
							<option value=''>Select a character</option>
							{!gameMaster && <option value='game_master'>Game Master</option>}
							{user?.characters.map((character) => (
								<option key={`${character.name}`} value={character.id}>
									{character.name}
								</option>
							))}
						</select>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default CampaignPage;
