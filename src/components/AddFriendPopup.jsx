import React from 'react';

const AddFriendPopup = (props) => {

    return (
        <div>
            {/* <button onClick={openPopup}>Open Popup</button> */}
            {props.isOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
				<div className="bg-white rounded-lg p-6 w-full max-w-md relative">
					<button
						onClick={() => props.onClose()}
						className="absolute top-2 right-2 btn-magenta text-2xl"
					>
						&times;
					</button>
					<h1 className="text-2xl font-bold mb-4 text-magenta-dark">Select Friends and Details</h1>
					{/* <div className="flex flex-wrap gap-2 mb-4">
						{friends.map((friend, index) => (
							<div
								key={index}
								className={`px-4 py-2 border rounded-full cursor-pointer ${
									selectedFriends.includes(friend)
										? 'bg-magenta text-white'
										: 'bg-gray-200 text-gray-800'
								}`}
								onClick={() => handleSelectFriend(friend)}
							>
								{friend}
							</div>
						))}
					</div> */}
					{/* <input
						type="text"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
						placeholder="Enter your name"
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-magenta mb-4"
					/>
					<input
						type="text"
						value={movieName}
						onChange={(e) => setMovieName(e.target.value)}
						placeholder="Enter movie name"
						className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-magenta mb-4"
					/> */}
					{/* <button
						onClick={handleSubmit}
						className="btn-magenta text-white px-4 py-2 rounded hover:bg-black-dark"
					>
						Submit
					</button> */}
					{/* {message && <p className="mt-4 text-magenta-dark">{message}</p>} */}
				</div>
			</div>
		)}
        </div>
    );
}

export default AddFriendPopup;
