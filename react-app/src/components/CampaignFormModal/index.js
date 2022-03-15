import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CampaignForm from './CampaignForm';

const CampaignFormModal = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button id='new-campaign-button' onClick={() => setShowModal(true)}>
				<i className='fas fa-plus-square' style={{ paddingRight: '10px' }}></i>
				New Campaign
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<CampaignForm setShowModal={setShowModal} />
				</Modal>
			)}
		</>
	);
};

export default CampaignFormModal;
