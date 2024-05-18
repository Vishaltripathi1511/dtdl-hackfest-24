import React, { useState } from "react";

const auth_token = import.meta.env.VITE_AUTHORIZATION_TOKEN;
const ConnectWithFriendsPopup = (props) => {
    const [emails, setEmails] = useState([{ email: '' }]);
    const [message, setMessage] = useState('');

  const handleInputChange = (index, event) => {
    const values = [...emails];
    values[index].email = event.target.value;
    setEmails(values);
  };

  const handleAddEmail = () => {
    setEmails([...emails, { email: "" }]);
  };

  const handleRemoveEmail = (index) => {
    const values = [...emails];
    values.splice(index, 1);
    setEmails(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailList = emails.map((emailObj) => emailObj.email);

    try {
      const response = await fetch("http://localhost:8080/friend/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
		  "Authorization": `Bearer ${auth_token}`
        },
        body: JSON.stringify({ username: emailList }),
      });

      if (response.ok) {
        setMessage("Emails submitted successfully!");
        props.onClose();
      } else {
        setMessage("Error Sending request to the user(s). Kindly re-check your input data");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div>
      {props.isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="p-6 w-full max-w-md relative rounded-lg shadow-lg bg-gradient-to-r from-gray-300 via-white to-gray-300">
            <button
              onClick={() => props.onClose()}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <h1 className="text-2xl font-bold mb-4 text-gray-700">
              Add Friends
            </h1>
            <form onSubmit={handleSubmit}>
              {emails.map((email, index) => (
                <div key={index} className="flex items-center mb-3">
                  <input
                    type="text"
                    className=" px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
                    placeholder="Enter email"
                    value={email.email}
                    onChange={(event) => handleInputChange(index, event)}
					width="15"
                    required
                  />
                  {emails.length !== 1 && <button
                    type="button"
                    onClick={() => handleRemoveEmail(index)}
                    className="ml-2 text-gray-500 hover:text-gray-800 text-xl transition duration-200"
                  >
                    &times;
                  </button>}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddEmail}
                className="text-white bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded mb-3 transition duration-200"
              >
                Add Email
              </button>
              <button
                type="submit"
                className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded transition duration-200"
              >
                Submit
              </button>
            </form>
            {message && <p className="mt-4 text-gray-700">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectWithFriendsPopup;
