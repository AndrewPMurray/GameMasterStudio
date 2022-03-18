import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './CampaignPage.css';
import { getCampaigns, updateCampaign } from '../../store/campaigns';

const CampaignPage = () => {
	const { campaignId } = useParams();
	const [errors, setErrors] = useState({});
	const campaign = useSelector((state) => state.campaigns[campaignId]);
	const user = useSelector((state) => state.session.user);
	const [edit, setEdit] = useState(false);
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
		if (!campaign) {
			dispatch(getCampaigns(user.id));
		}
	}, [campaign, title, description, dispatch, user.id]);

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

	return (
		<div className='campaign-container'>
			<div id='campaign-sections-container'>
				<p>Campaign Sections</p>
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
				<p>Campaign Characters</p>
			</div>
		</div>
	);
};

export default CampaignPage;
