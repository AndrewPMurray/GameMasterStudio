import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import './CampaignPage.css';
import { getCampaigns, updateCampaign } from '../../store/campaigns';

const CampaignPage = () => {
	const { campaignId } = useParams();
	const [errors, setErrors] = useState({});
	const campaign = useSelector((state) => state.campaigns[campaignId]);
	const user = useSelector((state) => state.session.user);
	const gameMaster = campaign?.game_master;
	const [edit, setEdit] = useState(false);
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [userCharacter, setUserCharacter] = useState([]);
	const [changeCharacter, setChangeCharacter] = useState(-1);

	console.log(userCharacter);

	useEffect(() => {
		if (!campaign) {
			dispatch(getCampaigns(user.id));
		}
	}, [campaign, title, description, dispatch, user.id]);

	useEffect(() => {
		setTitle(campaign?.title);
		setDescription(campaign?.description);
		setUserCharacter(
			campaign?.characters?.filter((character) => character?.user?.id === user?.id)
		);
	}, [campaign?.title, campaign?.description, campaign?.characters, user?.id]);

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

	const handleRemoveCharacter = (characterId) => {};

	return (
		<div className='campaign-container'>
			<div id='campaign-sections-container'>
				<h3>Campaign Sections</h3>
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
				<h3>Campaign Characters</h3>
				<div id='campaign-characters-list'>
					{campaign?.game_master && (
						<p id='campaign-character'>Game Master: {gameMaster?.username}</p>
					)}
					{campaign?.characters?.map((character, i) =>
						changeCharacter === i ? (
							<p>change character!</p>
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
					{userCharacter?.length === 0 && <p>no character!</p>}
				</div>
			</div>
		</div>
	);
};

export default CampaignPage;
