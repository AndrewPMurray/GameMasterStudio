import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './CampaignPage.css';
import { getCampaigns } from '../../store/campaigns';

const CampaignPage = () => {
	const { campaignId } = useParams();
	const campaign = useSelector((state) => state.campaigns[campaignId]);
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!campaign) {
			dispatch(getCampaigns(user.id));
		}
	});

	return (
		<div className='campaign-container'>
			<div id='campaign-sections-container'>
				<p>Campaign Sections</p>
			</div>
			<div id='campaign-info'>
				<h2 id='campaign-title'>{campaign?.title}</h2>
				<p id='campaign-description'>{campaign?.description}</p>
			</div>
			<div id='campaign-characters-container'>
				<p>Campaign Characters</p>
			</div>
		</div>
	);
};

export default CampaignPage;
