const LOAD_SECTIONS = 'sections/LOAD_SECTION';
const ADD_SECTION = 'sections/ADD_SECTION';
const REMOVE_SECTION = 'sections/REMOVE_SECTION';
const UPDATE_SECTION = 'sections/UPDATE_SECTION';
const RESET_STATE = 'sections/RESET_STATE';

const load = (sections) => ({
	type: LOAD_SECTIONS,
	sections,
});

const add = (section) => ({
	type: ADD_SECTION,
	section,
});

const update = (section) => ({
	type: UPDATE_SECTION,
	section,
});

const remove = (sectionId) => ({
	type: REMOVE_SECTION,
	sectionId,
});

export const clearSectionState = () => ({ type: RESET_STATE });

export const getSectionsByCampaign = (campaignId) => async (dispatch) => {
	const response = await fetch(`/api/campaigns/${campaignId}/sections`);

	if (response.ok) {
		const sections = await response.json();
		dispatch(load(sections.all_sections));
		return sections.all_sections;
	}
};

export const addSection = (payload) => async (dispatch) => {
	const response = await fetch(`/api/sections/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	if (response.ok) {
		const newSection = await response.json();
		dispatch(add(newSection));
		return newSection;
	} else {
		const errors = await response.json();
		return errors;
	}
};

export const updateSection = (payload, sectionId) => async (dispatch) => {
	const response = await fetch(`/api/sections/${sectionId}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	if (response.ok) {
		const editedSection = await response.json();
		dispatch(update(editedSection));
		return editedSection;
	} else {
		const errors = await response.json();
		return errors;
	}
};

export const deleteSection = (sectionId, ownerId) => async (dispatch) => {
	const response = await fetch(`/api/sections/${sectionId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ owner_id: ownerId }),
	});

	if (response.ok) {
		const deletedSection = await response.json();
		dispatch(remove(sectionId));
		return deletedSection;
	}
};

const initialState = {};

const sectionsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_SECTIONS: {
			const sections = {};
			action.sections.forEach((section) => {
				sections[section.id] = section;
			});
			return { ...sections };
		}
		case ADD_SECTION: {
			const newState = { ...state, [action.section.id]: action.section };
			return newState;
		}
		case UPDATE_SECTION: {
			const newState = { ...state, [action.section.id]: action.section };
			return newState;
		}
		case REMOVE_SECTION: {
			const newState = { ...state };
			delete newState[action.sectionId];
			return newState;
		}
		case RESET_STATE: {
			return initialState;
		}
		default:
			return state;
	}
};

export default sectionsReducer;
