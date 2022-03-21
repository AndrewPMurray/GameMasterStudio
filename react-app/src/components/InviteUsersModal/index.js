import { Modal } from '../../context/Modal';
import InviteUsersForm from './InviteUsersForm';

const InviteUsersModal = ({ campaignUsers, campaignId, showModal, setShowModal }) => {
	return (
		<>
			<button id='add-section-user-button' onClick={() => setShowModal(true)}>
				Invite Users
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
