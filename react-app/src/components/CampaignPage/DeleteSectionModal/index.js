import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import DeleteSectionPrompt from './DeleteSectionPrompt';

const DeleteSectionModal = ({ section, ownerId }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<p id='delete-section' onClick={() => setShowModal(true)}>
				Delete
			</p>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<DeleteSectionPrompt
						setShowModal={setShowModal}
						section={section}
						ownerId={ownerId}
					/>
				</Modal>
			)}
		</>
	);
};

export default DeleteSectionModal;
