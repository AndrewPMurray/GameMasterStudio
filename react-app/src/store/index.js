import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import campaignsReducer from './campaigns';
import charactersReducer from './characters';
import sectionsReducer from './sections';
import articlesReducer from './articles';

const rootReducer = combineReducers({
	session,
	campaigns: campaignsReducer,
	characters: charactersReducer,
	sections: sectionsReducer,
	articles: articlesReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require('redux-logger').default;
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
