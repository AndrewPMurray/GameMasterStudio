import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import configureStore from './store';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from './context/Modal';

const store = configureStore();

function Root() {
	return (
		<Provider store={store}>
			<ModalProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ModalProvider>
		</Provider>
	);
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(Root());
