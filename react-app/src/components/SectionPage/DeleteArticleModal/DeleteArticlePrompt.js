import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteArticle } from '../../../store/articles';
import './DeleteArticlePrompt.css';

const DeleteArticlePrompt = ({ setShowModal, article, ownerId }) => {
	const dispatch = useDispatch();
	const [disabled, setDisabled] = useState(false);

	const handleDelete = () => {
		setDisabled(true);
		dispatch(deleteArticle(article.id, ownerId))
			.then(() => setShowModal(false))
			.catch(() => setDisabled(false));
	};

	return (
		<div className='delete-article-container'>
			<div>
				<h2>Deleting Article: {article.title}</h2>
				<p>Are you sure you want to delete this article?</p>
			</div>
			<div id='delete-article-button'>
				<button onClick={handleDelete} disabled={disabled}>
					Delete
				</button>
			</div>
		</div>
	);
};

export default DeleteArticlePrompt;
