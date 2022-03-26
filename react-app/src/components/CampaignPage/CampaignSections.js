import SectionFormModal from '../SectionFormModal';
import { clearSectionState, getSectionsByCampaign } from '../../store/sections';
import { getCampaigns } from '../../store/campaigns';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteSectionModal from './DeleteSectionModal';

export default function CampaignSections({ campaignId }) {
	const dispatch = useDispatch();
	const sections = useSelector((state) => Object.values(state.sections));
	const campaign = useSelector((state) => state.campaigns[campaignId]);
	const user = useSelector((state) => state.session.user);

	useEffect(() => {
		dispatch(clearSectionState());
		dispatch(getCampaigns(user?.id));
		dispatch(getSectionsByCampaign(campaignId));
	}, [dispatch, campaignId, user?.id]);

	return (
		<div id='campaign-sections-container'>
			<div id='sections-header'>
				<h3>Sections</h3>
				<SectionFormModal campaignId={campaignId} />
			</div>
			<div id='campaign-sections-list'>
				{sections?.map((section, i) => (
					<div id='section' key={`section-${i}`}>
						<Link to={`/campaigns/${campaignId}/${section.id}`}>
							{section.title.length > 20
								? `${section.title.slice(0, 20)}...`
								: section.title}
						</Link>
						{campaign?.owner_id === user?.id && (
							<DeleteSectionModal section={section} ownerId={campaign.owner_id} />
						)}
					</div>
				))}
			</div>
		</div>
	);
}
