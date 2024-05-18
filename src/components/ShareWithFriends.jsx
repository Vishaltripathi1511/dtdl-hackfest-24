import React, { useState, useEffect } from 'react';

const FriendsListModal = ({isOpen, onClose}) => {
    const [friends, setFriends] = useState(['Alice', 'Bob', 'Charlie', 'David', 'Eve']);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [userName, setUserName] = useState('');
    const [movieName, setMovieName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                // const response = await fetch('https://api.example.com/friends');
                // if (response.ok) {
                //     const data = await response.json();
                //     setFriends(data.friends);
                // } else {
                //     console.error('Failed to fetch friends');
                // }
            } catch (error) {
                console.error('Error fetching friends:');
            }
        };

        fetchFriends();
    }, []);
    // Effect to handle actions after state update
    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    }, [message]);

    const handleSelectFriend = (friend) => {
        if (selectedFriends.includes(friend)) {
            setSelectedFriends(selectedFriends.filter(selected => selected !== friend));
        } else {
            setSelectedFriends([...selectedFriends, friend]);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('https://api.example.com/submit-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName, movieName, selectedFriends }),
            });

            if (response.ok) {
                setMessage('Details submitted successfully!');
                onClose();
                setSelectedFriends([]);
                setUserName('');
                setMovieName('');
            } else {
                setMessage('Failed to submit details.');
            }
        } catch (error) {
            setMessage('Error: ' + error.message);
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-pink-500 hover:text-pink-700 text-2xl transition duration-200"
                    >
                        &times;
                    </button>
                    <h1 className="text-2xl font-bold mb-4 text-pink-600">Select Friends and Details</h1>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {friends.map((friend, index) => (
                            
                            <div
                                key={index}
                                className={`px-4 py-2 border-2 border-pink-500 rounded-full cursor-pointer text-lg transition duration-200
                                    ${selectedFriends.includes(friend) ? 'bg-pink-500 text-white' : 'text-pink-600 hover:bg-pink-100'}`}
                                onClick={() => handleSelectFriend(friend)}
                            >
                                {friend}
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 mb-4"
                    />
                    <input
                        type="text"
                        value={movieName}
                        onChange={(e) => setMovieName(e.target.value)}
                        placeholder="Enter movie name"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 mb-4"
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded transition duration-200"
                    >
                        Submit
                    </button>
                    {message && <p className="mt-4 text-pink-600">{message}</p>}
                </div>
            </div>
        )
    );

};

export default FriendsListModal;
