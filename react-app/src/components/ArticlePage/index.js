import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getArticlesBySection } from '../../store/articles';
import CampaignSections from '../CampaignPage/CampaignSections';
import './ArticlePage.css';

export default function ArticlePage() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { campaignId, sectionId, articleId } = useParams();
	const article = useSelector((state) => state.articles[articleId]);

	useEffect(() => {
		dispatch(getArticlesBySection(sectionId)).then((res) => {
			let articleExists = false;
			res.every((article) => {
				if (article.id === +articleId) {
					articleExists = true;
					return false;
				}
				return true;
			});
			if (!articleExists) history.push(`/campaigns/${campaignId}/${sectionId}`);
		});
	}, [dispatch, sectionId, articleId, campaignId, history]);

	return (
		<div className='article-container'>
			<Link id='back-to-campaign' to={`/campaigns/${campaignId}/`} style={{ margin: '20px' }}>
				Back to campaign
			</Link>
			<CampaignSections campaignId={campaignId} />
			<div id='article-content-container'>
				<div id='article-title-container'>
					<h2 id='article-title'>{article?.title}</h2>
					<Link to={`/campaigns/${campaignId}/${sectionId}/${articleId}/edit`}>
						<button id='edit-article-button'>Edit Article</button>
					</Link>
				</div>
				{article?.photo_url && (
					<img src={article.photo_url} id='article-photo' alt='article' />
				)}
				<pre
					id='article-content'
					dangerouslySetInnerHTML={{ __html: article?.content }}
				></pre>
			</div>
		</div>
	);
}
