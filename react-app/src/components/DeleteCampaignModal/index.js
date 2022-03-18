import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteCampaignPrompt from './DeleteCampaignPrompt';

const DeleteCampaignModal = ({ campaignId, campaignTitle }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<i className='fas fa-trash' onClick={() => setShowModal(true)}></i>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<DeleteCampaignPrompt
						setShowModal={setShowModal}
						campaignId={campaignId}
						campaignTitle={campaignTitle}
					/>
				</Modal>
			)}
		</>
	);
};

export default DeleteCampaignModal;
