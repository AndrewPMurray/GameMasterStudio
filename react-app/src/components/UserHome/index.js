import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getCampaigns } from '../../store/campaigns';
import CampaignFormModal from '../CampaignFormModal';

export default function UserHome() {
	const campaigns = useSelector((state) => state.session.user.campaigns);
	const user = useSelector((state) => state.session.user);
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCampaigns(user?.id));
	}, [dispatch, user]);

	return (
		<>
			<h1>Welcome home, warrior</h1>
			<CampaignFormModal />
			<ul id='characters-list'></ul>
			<Link to='/characters'>Create New Character</Link>
		</>
	);
}
