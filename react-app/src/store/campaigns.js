const LOAD_CAMPAIGNS = 'campaigns/LOAD_CAMPAIGNS';
const ADD_CAMPAIGN = 'campaigns/ADD_CAMPAIGN';
const REMOVE_CAMPAIGN = 'campaigns/REMOVE_CAMPAIGN';
const UPDATE_CAMPAIGN = 'campaigns/UPDATE_CAMPAIGN';
const RESET_STATE = 'campaigns/RESET_STATE';

const load = (campaigns) => ({
	type: LOAD_CAMPAIGNS,
	campaigns,
});

const add = (campaign) => ({
	type: ADD_CAMPAIGN,
	campaign,
});

const update = (campaign) => ({
	type: UPDATE_CAMPAIGN,
	campaign,
});

const remove = (campaignId) => ({
	type: REMOVE_CAMPAIGN,
	campaignId,
});

export const clearCampaignState = () => ({ type: RESET_STATE });

export const getCampaigns = (userId) => async (dispatch) => {
	const response = await fetch(`/api/users/campaigns/${userId}`);

	if (response.ok) {
		const campaigns = await response.json();
		dispatch(load(campaigns.all_campaigns));
	}
};

export const addCampaign = (payload) => async (dispatch) => {
	console.log(payload);
	const response = await fetch('/api/campaigns/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	if (response.ok) {
		const newCampaign = await response.json();
		dispatch(add(newCampaign));
		return newCampaign;
	}
};

export const updateCampaign = (payload) => async (dispatch) => {
	const response = await fetch(`/api/campaigns/${payload.campaign_id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	const editedCampaign = await response.json();
	dispatch(update(editedCampaign));
	return editedCampaign;
};

export const deleteCampaign = (campaignId) => async (dispatch) => {
	const response = await fetch(`/api/campaigns/${campaignId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.ok) {
		const deletedCampaign = await response.json();
		dispatch(remove(campaignId));
		return deletedCampaign;
	}
};

const initialState = {};

const campaignsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_CAMPAIGNS: {
			const campaigns = {};
			action.campaigns.forEach((campaign) => {
				campaigns[campaign.id] = campaign;
			});
			return { ...state, ...campaigns };
		}
		case ADD_CAMPAIGN: {
			const newState = { ...state, [action.campaign.id]: action.campaign };
			return newState;
		}
		case UPDATE_CAMPAIGN: {
			return {
				...state,
				[action.campaign.id]: action.campaign,
			};
		}
		case REMOVE_CAMPAIGN: {
			const newState = { ...state };
			delete newState[action.campaignId];
			return newState;
		}
		case RESET_STATE: {
			return initialState;
		}
		default:
			return state;
	}
};

export default campaignsReducer;
