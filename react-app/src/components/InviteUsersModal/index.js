import { Modal } from '../../context/Modal';
import InviteUsersForm from './InviteUsersForm';
import React, { useState } from 'react';

const InviteUsersModal = ({ campaignUsers, campaignId }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button id='add-section-user-button' onClick={() => setShowModal(true)}>
				<i className='fas fa-hat-wizard'></i>Invite Users
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<InviteUsersForm
						setShowModal={setShowModal}
						campaignUsers={campaignUsers}
						campaignId={campaignId}
					/>
				</Modal>
			)}
		</>
	);
};

export default InviteUsersModal;
