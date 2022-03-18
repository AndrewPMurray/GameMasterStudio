import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteCharacterPrompt from './DeleteCharacterPrompt';

const DeleteCharacterModal = ({ characterId, characterName }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<i className='fas fa-trash' onClick={() => setShowModal(true)}></i>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<DeleteCharacterPrompt
						setShowModal={setShowModal}
						characterId={characterId}
						characterTitle={characterName}
					/>
				</Modal>
			)}
		</>
	);
};

export default DeleteCharacterModal;
