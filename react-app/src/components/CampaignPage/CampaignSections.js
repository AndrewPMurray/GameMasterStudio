import SectionFormModal from '../SectionFormModal';
import { clearSectionState, getSectionsByCampaign } from '../../store/sections';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CampaignSections({ campaignId }) {
	const dispatch = useDispatch();
	const sections = useSelector((state) => Object.values(state.sections));

	useEffect(() => {
		dispatch(clearSectionState());
		dispatch(getSectionsByCampaign(campaignId));
	}, [dispatch, campaignId]);

	return (
		<div id='campaign-sections-container'>
			<div id='sections-header'>
				<h3>Sections</h3>
				<SectionFormModal campaignId={campaignId} />
			</div>
			<div id='campaign-sections-list'>
				{sections?.map((section, i) => (
					<div id='section' key={`section-${i}`}>
						<Link to={`/campaigns/${campaignId}/${section.id}`}>{section.title}</Link>
					</div>
				))}
			</div>
		</div>
	);
}
