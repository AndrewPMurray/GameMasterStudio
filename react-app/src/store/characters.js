const LOAD_CHARACTERS = 'characters/LOAD_CHARACTERS';
const ADD_CHARACTER = 'characters/ADD_CHARACTER';
const REMOVE_CHARACTER = 'characters/REMOVE_CHARACTER';
const UPDATE_CHARACTER = 'characters/UPDATE_CHARACTER';
const RESET_STATE = 'characters/RESET_STATE';

const load = (characters) => ({
	type: LOAD_CHARACTERS,
	characters,
});

const add = (character) => ({
	type: ADD_CHARACTER,
	character,
});

const update = (character) => ({
	type: UPDATE_CHARACTER,
	character,
});

const remove = (characterId) => ({
	type: REMOVE_CHARACTER,
	characterId,
});

export const clearCharacterState = () => ({ type: RESET_STATE });

export const getCharacters = (userId) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/characters/`);

	if (response.ok) {
		const characters = await response.json();
		dispatch(load(characters.all_characters));
	}
};

export const addCharacter = (payload) => async (dispatch) => {
	const response = await fetch('/api/characters/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	if (response.ok) {
		const newCharacter = await response.json();
		dispatch(add(newCharacter));
		return newCharacter;
	}
};

export const updateCharacter = (payload) => async (dispatch) => {
	const response = await fetch(`/api/character/${payload.character_id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	if (response.ok) {
		const editedCharacter = await response.json();
		dispatch(update(editedCharacter));
		return editedCharacter;
	}
};

export const deleteCharacter = (characterId) => async (dispatch) => {
	const response = await fetch(`/api/campaigns/${characterId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.ok) {
		const deletedCampaign = await response.json();
		dispatch(remove(characterId));
		return deletedCampaign;
	}
};

const initialState = {};

const charactersReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_CHARACTERS: {
			const characters = {};
			action.characters.forEach((character) => {
				characters[character.id] = character;
			});
			return { ...state, ...characters };
		}
		case ADD_CHARACTER: {
			const newState = { ...state, [action.character.id]: action.character };
			return newState;
		}
		case UPDATE_CHARACTER: {
			return {
				...state,
				[action.character.id]: action.character,
			};
		}
		case REMOVE_CHARACTER: {
			const newState = { ...state };
			delete newState[action.characterId];
			return newState;
		}
		case RESET_STATE: {
			return initialState;
		}
		default:
			return state;
	}
};

export default charactersReducer;
