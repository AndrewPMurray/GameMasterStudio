import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FileUploader } from 'react-drag-drop-files';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css';
import { updateProfilePic } from '../../store/session';

export default function NavBar() {
	const [showMenu, setShowMenu] = useState(false);
	const [loading, setLoading] = useState(false);
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const fileTypes = ['JPG', 'PNG', ' JPEG', 'jpg', 'jpeg'];

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (e.target === document.querySelector('#user-navbar-menu')) return;
			if (e.target === document.querySelector('#change-profile-pic-button')) return;
			if (e.target === document.querySelector('#file-uploader')) return;
			if (e.target === document.querySelector('#change-profile-pic-button')) return;
			if (e.target === document.querySelector('input')) return;
			setShowMenu(false);
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	}, [showMenu]);

	const changeProfilePic = (file) => {
		setLoading(true);
		const image = new Image();
		image.src = URL.createObjectURL(file);
		image.onload = () => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			ctx.canvas.width = 300;
			ctx.canvas.height = 300;
			const imgSize = Math.min(image.width, image.height);
			const left = (image.width - imgSize) / 2;
			const top = (image.height - imgSize) / 2;

			ctx.drawImage(
				image,
				left,
				top,
				imgSize,
				imgSize,
				0,
				0,
				ctx.canvas.width,
				ctx.canvas.height
			);

			const base64Image = canvas.toDataURL('image/jpeg', 1);
			const byteString = atob(base64Image.split(',')[1]);
			const mimeString = base64Image.split(',')[0].split(':')[1].split(';')[0];
			const arrBuff = new ArrayBuffer(byteString.length);
			const uIntArr = new Uint8Array(arrBuff);

			for (let i = 0; i < byteString.length; i++) {
				uIntArr[i] = byteString.charCodeAt(i);
			}

			const resizedImg = new File([arrBuff], file.name, { type: mimeString });
			dispatch(updateProfilePic(resizedImg, user?.id)).then(() => {
				setLoading(false);
				setShowMenu(false);
			});
		};
	};

	return (
		<div>
			<nav id='navbar-container'>
				<div id='nav-items'>
					<NavLink to='/' exact={true} activeClassName='active'>
						Home
					</NavLink>
					<div id='login-logout-container'>
						{!user && (
							<div id='login-logout-items'>
								<NavLink to='/login' exact={true} activeClassName='active'>
									Login
								</NavLink>
								<NavLink to='/sign-up' exact={true} activeClassName='active'>
									Sign Up
								</NavLink>
							</div>
						)}
						{user && (
							<div id='user-navbar-container' onClick={() => setShowMenu(true)}>
								<img
									src={
										user?.profile_pic_url
											? user.profile_pic_url
											: 'http://theelderwan.us.to:9000/gamemasterstudio/blank-profile-picture.png'
									}
									alt='user-profile'
									id='profile-pic'
									style={{ height: '40px', borderWidth: '1px', margin: '5px' }}
								/>
								<h2>{user?.username}</h2>
								<i className='fas fa-angle-down' style={{ margin: '0 15px' }}></i>
								{showMenu === true && (
									<>
										<div id='user-navbar-menu' className='fade-in-slide-down'>
											<FileUploader
												id='file-uploader'
												name='image'
												types={fileTypes}
												handleChange={(file) => changeProfilePic(file)}
											>
												<button id='change-profile-pic-button'>
													Change profile picture
												</button>
											</FileUploader>
											<LogoutButton />
										</div>
									</>
								)}
							</div>
						)}
						{loading && (
							<p style={{ position: 'absolute', bottom: '50px', right: '20px' }}>
								Updating Profile Pic...
							</p>
						)}
					</div>
				</div>
			</nav>
		</div>
	);
}
