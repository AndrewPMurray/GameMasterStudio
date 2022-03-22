import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SectionForm from './SectionForm';

const SectionFormModal = ({ campaignId }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button id='add-section-user-button' onClick={() => setShowModal(true)}>
				<i className='fa-solid fa-scroll' style={{ paddingRight: '10px' }}></i>
				Add Section
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<SectionForm setShowModal={setShowModal} campaignId={campaignId} />
				</Modal>
			)}
		</>
	);
};

export default SectionFormModal;
