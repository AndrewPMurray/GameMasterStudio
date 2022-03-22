import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getSectionsByCampaign } from '../../store/sections';
import './SectionPage.css';

export default function SectionPage() {
	const { campaignId, sectionId } = useParams();
	const section = useSelector((state) => state.sections[sectionId]);
	const dispatch = useDispatch();
	const articles = section?.articles;

	useEffect(() => {
		dispatch(getSectionsByCampaign(+campaignId));
	}, []);

	return (
		<div className='section-container'>
			<Link id='back-to-campaign' to={`/campaigns/${campaignId}`} style={{ margin: '20px' }}>
				Back to campaign
			</Link>
			<h2 id='section-title'>{section?.title}</h2>
			{articles?.map((article) => (
				<Link to={`/campaigns/${campaignId}/${sectionId}/${article.id}`} id='article-link'>
					{article.title}
				</Link>
			))}
		</div>
	);
}
