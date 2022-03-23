import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getSectionsByCampaign, updateSection } from '../../store/sections';
import CampaignSections from '../CampaignPage/CampaignSections';
import './SectionPage.css';

export default function SectionPage() {
	const { campaignId, sectionId } = useParams();
	const [errors, setErrors] = useState({});
	const [edit, setEdit] = useState(false);
	const [title, setTitle] = useState('');
	const section = useSelector((state) => state.sections[sectionId]);
	const dispatch = useDispatch();
	const articles = section?.articles;

	useEffect(() => {
		dispatch(getSectionsByCampaign(campaignId)).then(setTitle(section?.title));
	}, [campaignId, dispatch, section?.title]);

	const handleEdit = () => {
		dispatch(
			updateSection(
				{
					title,
					campaign_id: campaignId,
				},
				sectionId
			)
		).then((res) => {
			if (res.errors) setErrors(res.errors);
			else setEdit(!edit);
		});
	};

	return (
		<div className='section-container'>
			<Link id='back-to-campaign' to={`/campaigns/${campaignId}`} style={{ margin: '20px' }}>
				Back to campaign
			</Link>
			<CampaignSections campaignId={campaignId} />
			<div id='section-list'>
				{edit ? (
					<>
						{errors.title && (
							<p id='error' style={{ marginBottom: '10px' }}>
								{errors.title}
							</p>
						)}
						<input
							id='section-title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</>
				) : (
					<h2 id='section-title'>{section?.title}</h2>
				)}
				{edit ? (
					<button id='edit-section-button' onClick={handleEdit}>
						Save
					</button>
				) : (
					<button id='edit-section-button' onClick={() => setEdit(!edit)}>
						Edit Title
					</button>
				)}
				{articles?.map((article, i) => (
					<Link
						to={`/campaigns/${campaignId}/${sectionId}/${article.id}`}
						id='article-link'
						key={`article-${i}`}
					>
						{article.title}
					</Link>
				))}
			</div>
		</div>
	);
}
