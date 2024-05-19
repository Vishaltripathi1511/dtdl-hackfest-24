import React, { useState } from 'react';
import { HiChatAlt2, HiX } from 'react-icons/hi';  // Import the necessary icons

const ChatApp = () => {
    // Initialize with some hardcoded messages
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello! How can we assist you today?', sender: 'support', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        { id: 1, text: 'I need help with my account.', sender: 'support', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false); // State to control the visibility of the chat interface

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            const newEntry = {
                id: messages.length + 1,
                text: newMessage,
                sender: 'user',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // Add timestamp to each new message
            };
            setMessages([...messages, newEntry]);
            setNewMessage('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            handleSendMessage();
            event.preventDefault();
        }
    };

    return (
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8">
            <button
                className="text-white bg-pink-500 hover:bg-pink-600 rounded-full p-3 text-3xl"
                onClick={() => setIsOpen(!isOpen)}  // Toggle chat window
            >
                {isOpen ? <HiX /> : <HiChatAlt2 />} 
            </button>

            {isOpen && (
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden mt-4">
                    <div className="p-4 bg-pink-600 text-white font-bold text-lg">
                        Frag Magenta
                    </div>
                    <div className="p-4 bg-pink-200 text-black">
                        Der Live-Chat mit unseren Mitarbeiter*innen steht in der Zeit von 23:00 bis 07:00 Uhr leider nicht zur Verfügung.
                    </div>
                    <div className="p-4 overflow-y-auto" style={{ height: '300px' }}>
                        {messages.map((message) => (
                            <div key={message.id} className={`p-2 text-white text-sm my-2 mx-4 rounded-lg ${message.sender === 'user' ? 'bg-pink-500 ml-auto' : 'bg-gray-300 mr-auto'}`}>
                                <div>{message.text}</div>
                                <div className="text-xs text-right text-gray-500">{message.timestamp}</div>
                            </div>
                        ))}
                    </div>
                    <div className="px-4 pb-4 pt-2 bg-white">
                        <textarea
                            className="w-full p-2 border-2 border-pink-300 rounded-md focus:outline-none focus:border-pink-500 resize-none"
                            placeholder="Hier schreiben..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            rows={2}
                        />
                        <button
                            onClick={handleSendMessage}
                            className="w-full mt-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4
 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
