import React, { createContext, useRef, useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

export const ModalContext = createContext();

export function ModalProvider({ children }) {
	const modalRef = useRef();
	const [value, setValue] = useState();

	useEffect(() => {
		setValue(modalRef.current);
	}, []);

	return (
		<>
			<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
			<div ref={modalRef} />
		</>
	);
}

export function Modal({ onClose, children }) {
	const modalNode = useContext(ModalContext);

	useEffect(() => {
		const modalBackground = document.querySelector('#modal-background');
		const modalContent = document.querySelector('#modal-content');
		const timeout = () => setTimeout(onClose, 175);

		modalBackground.addEventListener('click', (e) => {
			if (e.target === modalBackground) {
				modalContent.classList.remove('fade-in-grow');
				modalBackground.classList.remove('fade-in');
				modalContent.classList.add('fade-out-shrink');
				modalBackground.classList.add('fade-out');
				timeout();
			}

			return () => {
				clearTimeout(timeout);
			};
		});
	}, [modalNode, onClose]);

	if (!modalNode) return null;

	return ReactDOM.createPortal(
		<div id='modal' style={{ zIndex: 1000 }}>
			<div id='modal-background' className='fade-in' style={{ zIndex: 1000 }} />
			<div id='modal-content' className='fade-in-grow' style={{ zIndex: 1000 }}>
				{children}
			</div>
		</div>,
		modalNode
	);
}
