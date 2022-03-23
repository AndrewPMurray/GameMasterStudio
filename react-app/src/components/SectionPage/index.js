import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getSectionsByCampaign } from '../../store/sections';
import './SectionPage.css';
import CampaignSections from '../CampaignPage/CampaignSections';

export default function SectionPage() {
	const { campaignId, sectionId } = useParams();
	const section = useSelector((state) => state.sections[sectionId]);
	const dispatch = useDispatch();
	const articles = section?.articles;

	useEffect(() => {
		dispatch(getSectionsByCampaign(campaignId));
	}, [campaignId, dispatch]);

	return (
		<div className='section-container'>
			<Link id='back-to-campaign' to={`/campaigns/${campaignId}`} style={{ margin: '20px' }}>
				Back to campaign
			</Link>
			<CampaignSections campaignId={campaignId} />
			<div id='section-list'>
				<h2 id='section-title'>{section?.title}</h2>
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
