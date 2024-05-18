import React, { useState } from 'react';

const EmailCollectorModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [emails, setEmails] = useState([{ email: '' }]);
    const [message, setMessage] = useState('');

    const handleInputChange = (index, event) => {
        const values = [...emails];
        values[index].email = event.target.value;
        setEmails(values);
    };

    const handleAddEmail = () => {
        setEmails([...emails, { email: '' }]);
    };

    const handleRemoveEmail = (index) => {
        const values = [...emails];
        values.splice(index, 1);
        setEmails(values);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const emailList = emails.map(emailObj => emailObj.email);

        try {
            const response = await fetch('https://api.example.com/submit-emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emails: emailList }),
            });

            if (response.ok) {
                setMessage('Emails submitted successfully!');
                setIsModalOpen(false);
            } else {
                setMessage('Failed to submit emails.');
            }
        } catch (error) {
            setMessage('Error: ' + error.message);
        }
    };

    return (
        <div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2 text-magenta-dark text-2xl"
                        >
                            &times;
                        </button>
                        <h1 className="text-2xl font-bold mb-4 text-magenta-dark">Email Collector</h1>
                        <form onSubmit={handleSubmit}>
                            {emails.map((email, index) => (
                                <div key={index} className="flex items-center mb-3">
                                    <input
                                        type="email"
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-magenta"
                                        placeholder="Enter email"
                                        value={email.email}
                                        onChange={event => handleInputChange(index, event)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveEmail(index)}
                                        className="ml-2 text-magenta-dark text-xl"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddEmail}
                                className="btn-magenta text-black px-4 py-2 rounded mb-3 hover:bg-blue-dark"
                            >
                                Add Email
                            </button>
                            <button
                                type="submit"
                                className="btn-magenta text-black px-4 py-2 rounded hover:bg-blue-dark"
                            >
                                Submit
                            </button>
                        </form>
                        {message && <p className="mt-4 text-magenta-dark">{message}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmailCollectorModal;
