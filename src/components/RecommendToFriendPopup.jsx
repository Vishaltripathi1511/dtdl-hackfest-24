import React, { useState } from 'react';

const RecommendToFriendPopup = (props) => {
    // const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => {
        setIsOpen(true);
    };

    const closePopup = () => {
        props.isOpen = false;
    };

    return (
        <div>
			abc
            {/* <button onClick={openPopup}>Open Popup</button> */}
            {props.isOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>This is a Popup!</h2>
                        <p>Popup content goes here.</p>
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RecommendToFriendPopup;
