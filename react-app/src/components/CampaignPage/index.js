import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import InviteUsersModal from '../InviteUsersModal';
import './CampaignPage.css';
import {
	addGameMaster,
	getCampaigns,
	removeGameMaster,
	updateCampaign,
} from '../../store/campaigns';
import {
	addCharacterToCampaign,
	getCharacters,
	removeCharacterFromCampaign,
} from '../../store/characters';
import CampaignSections from './CampaignSections';
import CharacterDetailsModal from '../CharacterDetailsModal';

const CampaignPage = () => {
	const { campaignId } = useParams();
	const [errors, setErrors] = useState({});
	const campaign = useSelector((state) => state.campaigns[campaignId]);
	const characters = campaign?.characters;
	const userCharactersList = useSelector((state) => Object.values(state.characters));
	const user = useSelector((state) => state.session.user);
	const gameMaster = campaign?.game_master;
	const [edit, setEdit] = useState(false);
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [userCharacter, setUserCharacter] = useState({});
	const [changeCharacter, setChangeCharacter] = useState(-1);
	const [selectedCharacter, setSelectedCharacter] = useState('');
	const history = useHistory();

	const handleChangeCharacter = useCallback(() => {
		if (selectedCharacter === '') return;

		// removing character or game master
		if (selectedCharacter === 'remove') {
			if (userCharacter?.id) {
				dispatch(removeCharacterFromCampaign(userCharacter?.id)).then(() => {
					setUserCharacter({});
					setChangeCharacter(-1);
					setSelectedCharacter('');
				});
			} else if (userCharacter?.gameMaster) {
				dispatch(removeGameMaster(campaignId)).then(() => {
					setUserCharacter({});
					setChangeCharacter(-1);
					setSelectedCharacter('');
				});
			}
			return;
		}

		// setting game master
		if (selectedCharacter === 'game_master') {
			if (userCharacter && Object.values(userCharacter).length > 1) {
				dispatch(removeCharacterFromCampaign(userCharacter.id));
			}
			dispatch(
				addGameMaster({
					user_id: user.id,
					campaign_id: campaign?.id,
				})
			).then(() => {
				setUserCharacter({ gameMaster: user.id });
				setChangeCharacter(-1);
				setSelectedCharacter('');
			});
			return;
		}

		// setting character in campaign
		else {
			if (userCharacter?.gameMaster) dispatch(removeGameMaster(campaignId));
			if (userCharacter?.id) dispatch(removeCharacterFromCampaign(userCharacter.id));

			dispatch(
				addCharacterToCampaign({
					character_id: selectedCharacter,
					campaign_id: campaign?.id,
				})
			).then(() => {
				setUserCharacter(characters[selectedCharacter]);
				setChangeCharacter(-1);
				setSelectedCharacter('');
			});
		}
	}, [selectedCharacter, userCharacter, campaign?.id, user.id, dispatch, characters, campaignId]);

	useEffect(() => {
		if (selectedCharacter !== '') handleChangeCharacter();
	}, [handleChangeCharacter, selectedCharacter]);

	useEffect(() => {
		dispatch(getCampaigns(user.id)).then((res) => {
			let campaignExists = false;
			res.every((campaign) => {
				if (campaign.id === +campaignId) {
					campaignExists = true;
					return false;
				}
				return true;
			});
			if (!campaignExists) history.push('/not-found');
		});
		dispatch(getCharacters(user.id));
	}, [dispatch, user.id, selectedCharacter, campaignId, history]);

	useEffect(() => {
		if (campaign?.game_master?.id === user.id) {
			setUserCharacter({ gameMaster: user.id });
			return;
		}
		if (characters?.length === 0) {
			setUserCharacter({});
			return;
		}
		characters?.every((character, i) => {
			if (character.user.id === user.id) {
				setUserCharacter(() => character);
				return false;
			} else {
				setUserCharacter({});
				return true;
			}
		});
	}, [characters, user.id, selectedCharacter, campaign?.game_master?.id]);

	useEffect(() => {
		setTitle(campaign?.title);
		setDescription(campaign?.description);
	}, [campaign?.title, campaign?.description]);

	// filter out users who have not selected a character yet, for display in character list prior to char selection
	const noCharUsers = campaign?.users?.filter((campaignUser) => {
		if (campaignUser.id === gameMaster?.id) return false;
		let hasCharacter = false;
		characters?.forEach((character) => {
			if (campaignUser.id === character.user.id) hasCharacter = true;
		});
		return !hasCharacter;
	});

	// Edit campaign title and description
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

	return (
		<div className='campaign-container'>
			<CampaignSections campaignId={campaignId} />
			<div id='campaign-info'>
				<div id='campaign-title-and-edit'>
					{edit ? (
						<div>
							{errors.title && <p id='error'>{errors.title}</p>}
							<input
								id='campaign-title'
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								autoComplete='off'
							/>
						</div>
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
					<pre id='campaign-description'>
						{campaign?.description.length > 0
							? campaign.description
							: 'This campaign does not have a description. Ask the owner of the campaign to add one!'}
					</pre>
				)}
			</div>
			<div id='campaign-characters-container'>
				<div id='characters-header'>
					<h3>Starring:</h3>
					{user?.id === campaign?.owner_id ? (
						<InviteUsersModal campaignUsers={campaign?.users} campaignId={campaignId} />
					) : (
						<div id='no-invite-users-div'></div>
					)}
				</div>
				<div id='campaign-characters-list'>
					{campaign?.game_master &&
						(changeCharacter === -2 ? (
							<select
								value={selectedCharacter}
								onChange={(e) => setSelectedCharacter(() => e.target.value)}
							>
								<option value=''>Select a character</option>
								{!gameMaster && <option value='game_master'>Game Master</option>}
								{userCharactersList?.map((userCharacter) => (
									<option key={`${userCharacter.name}`} value={userCharacter.id}>
										{userCharacter.name}
									</option>
								))}
								<option value='remove' onClick={() => setUserCharacter(() => {})}>
									Remove character
								</option>
							</select>
						) : (
							<div id='campaign-character'>
								<img
									src={
										gameMaster?.profile_pic_url
											? gameMaster.profile_pic_url
											: 'https://gamemasterstudio.s3.us-east-2.amazonaws.com/blank-profile-picture.png'
									}
									alt='user-profile'
									id='profile-pic'
									style={{ height: '30px', borderWidth: '1px' }}
								/>
								<p>Game Master: {gameMaster?.username}</p>
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
								{userCharactersList?.map((userCharacter) => (
									<option key={`${userCharacter.name}`} value={userCharacter.id}>
										{userCharacter.name}
									</option>
								))}
								<option value='remove' onClick={() => setUserCharacter(() => {})}>
									Remove character
								</option>
							</select>
						) : (
							<div id='campaign-character' key={`character-${character.id}`}>
								<img
									src={
										character.user.profile_pic_url
											? character.user.profile_pic_url
											: 'https://gamemasterstudio.s3.us-east-2.amazonaws.com/blank-profile-picture.png'
									}
									alt='user-profile'
									id='profile-pic'
									style={{ height: '30px', borderWidth: '1px' }}
								/>
								<CharacterDetailsModal character={character} user={user} />
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
					{noCharUsers?.map((noCharUser) => (
						<div id='campaign-character' key={`no-char-${noCharUser.id}`}>
							<img
								src={
									noCharUser.profile_pic_url
										? noCharUser.profile_pic_url
										: 'https://gamemasterstudio.s3.us-east-2.amazonaws.com/blank-profile-picture.png'
								}
								alt='user-profile'
								id='profile-pic'
								style={{ height: '30px', borderWidth: '1px' }}
							/>
							<p>{noCharUser.username} (No character selected)</p>
						</div>
					))}
					{userCharacter && Object.values(userCharacter).length === 0 && (
						<select
							value={selectedCharacter}
							onChange={(e) => setSelectedCharacter(e.target.value)}
						>
							<option value=''>Select a character</option>
							{!gameMaster && <option value='game_master'>Game Master</option>}
							{userCharactersList?.map((character) => (
								<option key={`${character.name}`} value={character.id}>
									{character.name}
								</option>
							))}
						</select>
					)}
				</div>
			</div>
		</div>
	);
};

export default CampaignPage;
