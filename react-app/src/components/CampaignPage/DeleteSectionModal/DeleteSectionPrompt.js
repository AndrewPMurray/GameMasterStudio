import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteSection } from '../../../store/sections';
import './DeleteSectionPrompt.css';

const DeleteSectionPrompt = ({ section, ownerId, setShowModal }) => {
	const dispatch = useDispatch();
	const [disabled, setDisabled] = useState(false);

	const handleDelete = () => {
		setDisabled(true);
		dispatch(deleteSection(section.id, ownerId))
			.then(() => setShowModal(false))
			.catch(() => setDisabled(false));
	};

	return (
		<div className='delete-section-container'>
			<div>
				<h2>
					Deleting Section:{' '}
					{section.title.length > 40 ? section.title.slice(0, 40) : section.title}
				</h2>
				<p>
					Are you sure you want to delete this section? This will also delete all articles
					associated with the section.
				</p>
			</div>
			<div id='delete-section-button'>
				<button onClick={handleDelete} disabled={disabled}>
					Delete
				</button>
			</div>
		</div>
	);
};

export default DeleteSectionPrompt;
