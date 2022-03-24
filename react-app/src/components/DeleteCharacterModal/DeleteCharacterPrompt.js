import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCharacter } from '../../store/characters';

import './DeleteCharacterPrompt.css';

const DeleteCharacterPrompt = ({ setShowModal, characterId, characterName }) => {
	const dispatch = useDispatch();
	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setDisabled(false), 2000);

		return () => clearTimeout(timer);
	}, []);

	const handleDelete = () => {
		setDisabled(true);
		document.querySelector('#modal-content').style.opacity = 0;
		dispatch(deleteCharacter(characterId)).catch(() => setDisabled(false));
		setShowModal(false);
	};

	return (
		<div className='delete-character-container'>
			<div>
				<h2>Delete Character {characterName}</h2>
				<p>Are you sure you want to delete this character? This action cannot be undone!</p>
			</div>
			<div id='delete-character-button'>
				<button onClick={handleDelete} disabled={disabled}>
					Delete
				</button>
			</div>
		</div>
	);
};

export default DeleteCharacterPrompt;
