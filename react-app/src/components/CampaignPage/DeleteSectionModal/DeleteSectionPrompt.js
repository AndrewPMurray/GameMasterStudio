import { useDispatch } from 'react-redux';
import { deleteSection } from '../../../store/sections';
import './DeleteSectionPrompt.css';

const DeleteSectionPrompt = ({ section, ownerId }) => {
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(deleteSection(section.id, ownerId));
	};

	return (
		<div className='delete-section-container'>
			<div>
				<h2>Deleting Section: {section.title}</h2>
				<p>
					Are you sure you want to delete this section? This will also delete all articles
					associated with the section.
				</p>
			</div>
			<div id='delete-section-button'>
				<button onClick={handleDelete}>Delete</button>
			</div>
		</div>
	);
};

export default DeleteSectionPrompt;
