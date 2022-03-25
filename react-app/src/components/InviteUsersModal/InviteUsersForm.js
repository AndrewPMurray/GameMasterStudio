import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCampaigns, removeUsersFromCampaign, addUsersToCampaign } from '../../store/campaigns';

import './InviteUsersForm.css';

const InviteUsersForm = ({ setShowModal, campaignUsers, campaignId }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const campaigns = useSelector((state) => state.campaigns);
	const [users, setUsers] = useState([]);
	const [userResults, setUserResults] = useState('');
	const [invitedUsers, setInvitedUsers] = useState([]);
	const [removeUsers, setRemoveUsers] = useState([]);
	const [existingUsers, setExistingUsers] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch('/api/users/');
			const responseData = await response.json();
			setUsers(responseData.users);
		}
		fetchData();
		dispatch(getCampaigns(user.id));
	}, [dispatch, user.id]);

	useEffect(() => {
		setExistingUsers(() => campaigns[campaignId].users || []);
	}, [campaignId, campaigns]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const waitMsg = document.createElement('p');
		waitMsg.innerText = 'Saving changes, please wait...';
		waitMsg.id = 'wait';
		document.querySelector('#modal-content').style.opacity = 0;
		document.querySelector('#modal-background').append(waitMsg);

		dispatch(addUsersToCampaign(invitedUsers, campaignId))
			.then(() => dispatch(removeUsersFromCampaign(removeUsers, campaignId)))
			.then(() => setShowModal(false))
			.catch(() => {
				document.querySelector('#modal-background').removeChild(waitMsg);
				document.querySelector('#modal-content').style.opacity = 1;
			});
	};

	const resultsArr = users.filter((availableUser) => {
		if (availableUser.id === user.id) return false;
		let alreadyInCampaign = false;
		campaignUsers.every((campaignUser) => {
			if (campaignUser.id === availableUser.id) {
				alreadyInCampaign = true;
				return false;
			}
			return true;
		});
		if (alreadyInCampaign) return false;
		return availableUser.username.toLowerCase().includes(userResults);
	});

	return (
		<div className='invite-users-container'>
			<div>
				<h2>Invite Users</h2>
				<p>
					Invite users to share your campaign. Other users can add and edit sections and
					articles, but they cannot edit the campaign title or description or invite other
					users. You can also remove users here.
				</p>
			</div>
			<form className='invite-users-form' onSubmit={handleSubmit}>
				<div className='form-field'>
					<label htmlFor='title'>Users already in campaign: </label>
					<div id='user-container'>
						{existingUsers?.map((existingUser, i) => (
							<div id='user-div' key={`existingUser-${i}`}>
								<img
									src={
										existingUser?.profile_pic_url
											? existingUser.profile_pic_url
											: 'https://gamemasterstudio.s3.us-east-2.amazonaws.com/blank-profile-picture.png'
									}
									alt='user-profile'
									id='profile-pic'
								/>
								{user?.id !== existingUser.id && (
									<p
										id='delete-user'
										onClick={() => {
											setRemoveUsers(() => {
												let userExists = false;
												const newRemoveUsers = [...removeUsers];
												removeUsers.forEach((removedUser) => {
													if (removedUser.id === existingUser.id)
														userExists = true;
												});
												if (!userExists) newRemoveUsers.push(existingUser);
												return newRemoveUsers;
											});
											setExistingUsers(() => {
												const newExistingUsers = [...existingUsers];
												newExistingUsers.splice(i, 1);
												return newExistingUsers;
											});
										}}
									>
										X
									</p>
								)}
								<p id='invite-user-name'>
									{existingUser.username.length > 10
										? `${existingUser.username.slice(0, 10)}...`
										: existingUser.username}
								</p>
							</div>
						))}
					</div>
				</div>
				<div className='form-field'>
					<label htmlFor='title'>Selected Users to invite: </label>
					<div id='user-container'>
						{invitedUsers?.map((invitedUser, i) => (
							<div id='user-div' key={`invited-user-${i}`}>
								<img
									src={
										invitedUser?.profile_pic_url
											? invitedUser.profile_pic_url
											: 'https://gamemasterstudio.s3.us-east-2.amazonaws.com/blank-profile-picture.png'
									}
									alt='user-profile'
									id='profile-pic'
								/>
								<p
									id='delete-user'
									onClick={() => {
										setInvitedUsers(() => {
											const newInvitedUsers = [...invitedUsers];
											newInvitedUsers.splice(i, 1);
											return newInvitedUsers;
										});
									}}
								>
									X
								</p>
								<p id='invite-user-name'>
									{invitedUser.username.length > 10
										? `${invitedUser.username.slice(0, 10)}...`
										: invitedUser.username}
								</p>
							</div>
						))}
					</div>
				</div>
				<div className='form-field'>
					<label htmlFor='title'>Search Users</label>
				</div>
				<div id='user-input-container'>
					<input
						type='text'
						placeholder='Search Users'
						id='search-users-input'
						value={userResults}
						onChange={(e) => setUserResults(e.target.value)}
						autoComplete='off'
					/>
					{userResults.length > 0 && (
						<div id='user-search-results'>
							{resultsArr.map((result, i) => (
								<div
									id='user-result'
									key={`result-${i}`}
									onClick={() => {
										setInvitedUsers(() => {
											let userExists = false;
											const newInvitedUsers = [...invitedUsers];
											invitedUsers.forEach((invitee) => {
												if (invitee.id === result.id) userExists = true;
											});
											if (!userExists) newInvitedUsers.push(result);
											return newInvitedUsers;
										});
										setUserResults(() => '');
									}}
								>
									<img
										src={
											result?.profile_pic_url
												? result.profile_pic_url
												: 'https://gamemasterstudio.s3.us-east-2.amazonaws.com/blank-profile-picture.png'
										}
										alt='user-profile'
										id='profile-pic'
										style={{ height: '30px', borderWidth: '1px' }}
									/>
									<p>{result.username}</p>
								</div>
							))}
						</div>
					)}
				</div>
				<div id='invite-users-button'>
					<button
						type='submit'
						disabled={invitedUsers.length === 0 && removeUsers.length === 0}
					>
						Confirm changes
					</button>
				</div>
			</form>
		</div>
	);
};

export default InviteUsersForm;
