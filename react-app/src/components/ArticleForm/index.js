import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FileUploader } from 'react-drag-drop-files';
import { useQuill } from 'react-quilljs';
import { addArticle, updateArticle, getArticlesBySection } from '../../store/articles';
import CampaignSections from '../CampaignPage/CampaignSections';
import CampaignSearch from '../CampaignPage/CampaignSearch';
import './quill.snow.css';
import './ArticleForm.css';

export default function ArticleForm() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { campaignId, sectionId, articleId } = useParams();

	const article = useSelector((state) => state.articles[articleId]);

	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [image, setImage] = useState(null);

	const fileTypes = ['JPG', 'PNG', ' JPEG', 'jpg', 'jpeg'];
	const modules = {
		toolbar: [['bold', 'italic', 'underline', 'strike']],
	};
	const formats = ['bold', 'italic', 'underline', 'strike'];

	const { quill, quillRef } = useQuill({
		theme: 'snow',
		modules,
		formats,
		placeholder: 'Add your article content here',
	});

	useEffect(() => {
		dispatch(getArticlesBySection(sectionId));
	}, [dispatch, sectionId]);

	useEffect(() => {
		if (article) {
			setTitle(() => article?.title);
			setContent(() => article?.content);
			setImage(article?.photo_url ? { url: article.photo_url } : null);
		}
	}, [article?.content, article?.photo_url, article?.title, article, quill]);

	useEffect(() => {
		if (quill) {
			if (quill.getLength() === 1) quill.clipboard.dangerouslyPasteHTML(content);
			quill.on('text-change', () => {
				setContent(quill.root.innerHTML); // Get innerHTML using quillRef
			});
		}
	}, [quill, content]);

	const handleSubmit = async () => {
		setLoading(true);
		let url = null;
		if (image) {
			const formData = new FormData();
			formData.append('image', image);
			const res = await fetch('/api/articles/images', {
				method: 'POST',
				body: formData,
			});
			if (res.ok) {
				const uploadedImg = await res.json();
				url = uploadedImg.url;
			} else {
				const errors = await res.json();
				setErrors(() => errors);
				setLoading(false);
				return;
			}
		}
		dispatch(
			addArticle({
				title,
				content,
				photo_url: url,
				section_id: sectionId,
			})
		).then((res) => {
			if (res.errors) {
				setErrors(res.errors);
				fetch('/api/articles/images', {
					method: 'DELETE',
					body: JSON.stringify({ url }),
				});
				setLoading(false);
				return;
			} else {
				setLoading(false);
				history.push(`/campaigns/${campaignId}/${sectionId}/${res.id}`);
			}
		});
	};

	const handleEdit = async () => {
		setLoading(true);
		let url = image?.url || null;
		if (image && !image.url) {
			const formData = new FormData();
			formData.append('image', image);
			const res = await fetch('/api/articles/images', {
				method: 'POST',
				body: formData,
			});
			if (res.ok) {
				const uploadedImg = await res.json();
				url = uploadedImg.url;
			} else {
				const errors = await res.json();
				setErrors(() => errors);
				setLoading(false);
				return;
			}
		}
		dispatch(
			updateArticle(
				{
					title,
					content,
					photo_url: url,
					section_id: sectionId,
				},
				articleId
			)
		).then((res) => {
			if (res.errors) {
				setErrors(res.errors);
				fetch('/api/articles/images', {
					method: 'DELETE',
					body: JSON.stringify({ url }),
				});
				setLoading(false);
				return;
			} else {
				setLoading(false);
				history.push(`/campaigns/${campaignId}/${sectionId}/${res.id}`);
			}
		});
	};

	return (
		<div className='edit-article-page-container'>
			<CampaignSearch />
			<Link id='back-to-campaign' to={`/campaigns/${campaignId}`} style={{ margin: '20px' }}>
				Back to campaign
			</Link>
			<CampaignSections campaignId={campaignId} />
			<div id='article-editor-container'>
				<div id='edit-title'>
					<label style={{ marginBottom: '4px' }}>Title*</label>
					{errors?.title && <p id='error'>{errors.title}</p>}
					<input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
				</div>
				<div id='image-uploader-div'>
					{errors?.image && <p id='error'>{errors.image}</p>}
					<FileUploader
						id='file-uploader'
						name='image'
						types={fileTypes}
						handleChange={(file) => setImage(file)}
					>
						<div id='edit-article-image'>
							<i className='fas fa-camera'></i>
							<p>
								Click here or drag and drop to add a photo (One photo only at this
								time)
							</p>
						</div>
					</FileUploader>
					{image && (
						<div id='preview-div'>
							<img
								src={image?.url ? image.url : URL.createObjectURL(image)}
								alt='preview'
								id='preview'
							/>
							<p id='remove-image' onClick={() => setImage(null)}>
								Remove Image
							</p>
						</div>
					)}
				</div>
				<div ref={quillRef} id='edit-content' theme='snow'></div>
				<button id='save-article' onClick={article ? handleEdit : handleSubmit}>
					{article ? 'Save Edits' : 'Create Article'}
				</button>
				{loading && (
					<p>
						{article
							? `Saving edits, please wait...`
							: `Creating Article, please wait...`}
					</p>
				)}
			</div>
		</div>
	);
}
