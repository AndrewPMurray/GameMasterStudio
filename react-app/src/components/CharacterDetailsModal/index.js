import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CharacterDetails from './CharacterDetails';

const CharacterDetailsModal = ({ character, user }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div id='character-details-modal' onClick={() => setShowModal(true)}>
				{character.user.username} ({character.name})
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<CharacterDetails
						setShowModal={setShowModal}
						character={character}
						user={user}
					/>
				</Modal>
			)}
		</>
	);
};

export default CharacterDetailsModal;
