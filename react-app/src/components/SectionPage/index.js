import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { getSectionsByCampaign, updateSection } from '../../store/sections';
import { getArticlesBySection } from '../../store/articles';
import CampaignSections from '../CampaignPage/CampaignSections';
import CampaignSearch from '../CampaignPage/CampaignSearch';
import DeleteArticleModal from './DeleteArticleModal';
import './SectionPage.css';

export default function SectionPage() {
	const { campaignId, sectionId } = useParams();
	const campaign = useSelector((state) => state.campaigns[campaignId]);
	const user = useSelector((state) => state.session.user);
	const [errors, setErrors] = useState({});
	const [edit, setEdit] = useState(false);
	const [title, setTitle] = useState('');
	const section = useSelector((state) => state.sections[sectionId]);
	const dispatch = useDispatch();
	const history = useHistory();
	const articles = useSelector((state) => Object.values(state.articles));

	useEffect(() => {
		dispatch(getSectionsByCampaign(campaignId)).then((res) => {
			let sectionExists = false;
			res.every((section) => {
				if (section.id === +sectionId) {
					sectionExists = true;
					return false;
				}
				return true;
			});
			if (!sectionExists) history.push(`/campaigns/${campaignId}`);
			setTitle(section?.title);
		});
		dispatch(getArticlesBySection(sectionId));
	}, [campaignId, dispatch, section?.title, history, sectionId]);

	const handleEdit = (e) => {
		if (e.key && e.key !== 'Enter') return;
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
			else setEdit(false);
		});
	};

	return (
		<div className='section-container'>
			<CampaignSearch />
			<Link id='back-to-campaign' to={`/campaigns/${campaignId}`} style={{ margin: '20px' }}>
				Back to campaign
			</Link>
			<CampaignSections campaignId={campaignId} />
			<div id='section-list'>
				<div id='section-title-container'>
					<div id='section-buttons-div'>
						{edit ? (
							<button id='edit-section-button' onClick={handleEdit}>
								Save
							</button>
						) : (
							<>
								<button id='edit-section-button' onClick={() => setEdit(!edit)}>
									Edit Title
								</button>
								<Link to={`/campaigns/${campaignId}/${sectionId}/new-article`}>
									<button id='add-article-button'>Add Article</button>
								</Link>
							</>
						)}
					</div>
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
								onKeyDown={(e) => handleEdit(e)}
							/>
						</>
					) : (
						<h2 id='section-title'>{section?.title}</h2>
					)}
				</div>
				{articles?.map((article, i) => (
					<div id='section-article-div' key={`article-${i}`}>
						<Link
							to={`/campaigns/${campaignId}/${sectionId}/${article.id}`}
							id='article-link'
							key={`article-${i}`}
							style={{ marginBottom: '10px' }}
						>
							{article.title}
						</Link>
						{campaign?.owner_id === user?.id && (
							<DeleteArticleModal article={article} ownerId={campaign.owner_id} />
						)}
					</div>
				))}
			</div>
		</div>
	);
}
