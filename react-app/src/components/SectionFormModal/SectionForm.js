import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSection } from '../../store/sections';
import './SectionForm.css';

const SectionForm = ({ setShowModal, campaignId }) => {
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [errors, setErrors] = useState({});
	const [disabled, setDisabled] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setDisabled(true);
		dispatch(
			addSection({
				title,
				campaign_id: campaignId,
			})
		).then((res) => {
			if (res.errors) {
				setErrors(res.errors);
				setDisabled(false);
				return;
			}
			setShowModal(false);
		});
	};

	return (
		<div className='create-section-container'>
			<div>
				<h2>Create new section</h2>
				<p>
					This is where you can create a section to house articles related to your
					campaign. Please enter a title below.
				</p>
			</div>
			<form className='create-section-form' onSubmit={handleSubmit}>
				<div className='form-field'>
					<label htmlFor='title'>Title*</label>
					{errors.title && (
						<p style={{ marginTop: '5px' }} id='error'>
							{errors.title}
						</p>
					)}
					<input
						id='section-title-input'
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder='Section Title'
					/>
				</div>
				<div id='create-section-button'>
					<button type='submit' disabled={disabled}>
						Create
					</button>
				</div>
			</form>
		</div>
	);
};

export default SectionForm;
