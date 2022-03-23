const LOAD_ARTICLES = 'sections/LOAD_ARTICLES';
const ADD_ARTICLE = 'sections/ADD_ARTICLE';
const REMOVE_ARTICLE = 'sections/REMOVE_ARTICLE';
const UPDATE_ARTICLE = 'sections/UPDATE_ARTICLE';
const RESET_STATE = 'sections/RESET_STATE';

const load = (articles) => ({
	type: LOAD_ARTICLES,
	articles,
});

const add = (article) => ({
	type: ADD_ARTICLE,
	article,
});

const update = (article) => ({
	type: UPDATE_ARTICLE,
	article,
});

const remove = (articleId) => ({
	type: REMOVE_ARTICLE,
	articleId,
});

export const clearArticleState = () => ({ type: RESET_STATE });

export const getArticlesBySection = (sectionId) => async (dispatch) => {
	const response = await fetch(`/api/sections/${sectionId}/articles`);

	if (response.ok) {
		const articles = await response.json();
		dispatch(load(articles.all_articles));
		return articles.all_articles;
	}
};

export const addArticle = (payload) => async (dispatch) => {
	const response = await fetch(`/api/articles/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	if (response.ok) {
		const newArticle = await response.json();
		dispatch(add(newArticle));
		return newArticle;
	} else {
		const errors = await response.json();
		return errors;
	}
};

export const updateArticle = (payload, articleId) => async (dispatch) => {
	const response = await fetch(`/api/articles/${articleId}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	if (response.ok) {
		const editedArticle = await response.json();
		dispatch(update(editedArticle));
		return editedArticle;
	} else {
		const errors = await response.json();
		return errors;
	}
};

export const deleteArticle = (articleId, ownerId) => async (dispatch) => {
	const response = await fetch(`/api/articles/${articleId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ owner_id: ownerId }),
	});

	if (response.ok) {
		const deletedArticle = await response.json();
		dispatch(remove(articleId));
		return deletedArticle;
	}
};

const initialState = {};

const articlesReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_ARTICLES: {
			const articles = {};
			action.articles.forEach((article) => {
				articles[article.id] = article;
			});
			return { ...articles };
		}
		case ADD_ARTICLE: {
			const newState = { ...state, [action.article.id]: action.article };
			return newState;
		}
		case UPDATE_ARTICLE: {
			const newState = { ...state, [action.article.id]: action.article };
			return newState;
		}
		case REMOVE_ARTICLE: {
			const newState = { ...state };
			delete newState[action.articleId];
			return newState;
		}
		case RESET_STATE: {
			return initialState;
		}
		default:
			return state;
	}
};

export default articlesReducer;
