import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import DeleteArticlePrompt from './DeleteArticlePrompt';

const DeleteArticleModal = ({ article, ownerId }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div id='delete-article' onClick={() => setShowModal(true)}>
				delete
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<DeleteArticlePrompt
						setShowModal={setShowModal}
						article={article}
						ownerId={ownerId}
					/>
				</Modal>
			)}
		</>
	);
};

export default DeleteArticleModal;
