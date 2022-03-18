import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCampaign } from '../../store/campaigns';

import './CampaignForm.css';

const CampaignForm = ({ setShowModal, userId }) => {
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [errors, setErrors] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		return dispatch(
			addCampaign({
				title,
				description,
				owner_id: userId,
			})
		).then((res) => {
			if (res.errors) setErrors(res.errors);
			else setShowModal(false);
		});
	};

	return (
		<div className='create-campaign-container'>
			<div>
				<h2>Create new campaign</h2>
				<p>
					Create a campaign to organize all of your sessions, npcs, and characters.
					Campaigns are private. To share your campaign you will be able to invite other
					users in the campaign page.
				</p>
			</div>
			<form className='create-campaign-form' onSubmit={handleSubmit}>
				<div className='form-field'>
					<label htmlFor='title'>Title</label>
					{errors.title && (
						<p style={{ marginTop: '5px' }} id='error'>
							{errors.title}
						</p>
					)}
					<input
						id='campaign-title-input'
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder='Campaign Title'
					/>
				</div>
				<div className='form-field'>
					<label htmlFor='title'>Description</label>
					<textarea
						id='campaign-title-input'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder='Describe your campaign'
					/>
				</div>
				<div id='create-campaign-button'>
					<button type='submit' disabled={title.length === 0}>
						Create
					</button>
				</div>
			</form>
		</div>
	);
};

export default CampaignForm;
