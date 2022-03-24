import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCampaign } from '../../store/campaigns';

import './DeleteCampaignPrompt.css';

const DeleteCampaignPrompt = ({ setShowModal, campaignId, campaignTitle }) => {
	const dispatch = useDispatch();
	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setDisabled(false), 2000);

		return () => clearTimeout(timer);
	}, []);

	const handleDelete = () => {
		setDisabled(true);
		dispatch(deleteCampaign(campaignId));
		setShowModal(false);
	};

	return (
		<div className='delete-campaign-container'>
			<div>
				<h2>Deleting Campaign {campaignTitle}</h2>
				<p>
					Are you sure you want to delete this campaign? This will also delete all
					articles and sections associated with the campaign. This action cannot be
					undone!
				</p>
			</div>
			<div id='delete-campaign-button'>
				<button onClick={handleDelete} disabled={disabled}>
					Delete
				</button>
			</div>
		</div>
	);
};

export default DeleteCampaignPrompt;
