import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCampaign } from '../../store/campaigns';

import './CampaignForm.css';

const CampaignForm = ({ setShowModal }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [errors, setErrors] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		return dispatch(
			addCampaign({
				title,
				description,
				owner_id: user.id,
			})
		)
			.then(() => {
				setShowModal(false);
			})
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					setErrors(data.errors);
				}
			});
	};

	return (
		<div className='create-campaign-container'>
			<div>
				<h2>Create new campaign</h2>
				<p>
					Create a campaign to organize all of your sessions, npcs, and characters.
					Campaigns are private. To share your campaign you can invite other users.
				</p>
			</div>
			<form className='create-campaign-form' onSubmit={handleSubmit}>
				<div className='form-field'>
					<label htmlFor='title'>Title</label>
					<input
						id='campaign-title-input'
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder='Campaign Title'
					/>
					{errors?.title && (
						<p style={{ paddingTop: '5px' }} id='errors'>
							{errors.title}
						</p>
					)}
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
