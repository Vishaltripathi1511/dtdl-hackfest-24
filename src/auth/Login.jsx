import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const handleLogin = async () => {
    const loginDetails = {
      username,
      password,
    };

    try {
      const response = await fetch("https://api.yourdomain.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        setLoginMessage("Login Successful!");
      } else {
        console.log("Login failed");
        setLoginMessage("Login Failed: Incorrect username or password");
      }
    } catch (error) {
      console.error("Network error:", error);
      setLoginMessage(`Login Failed: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 w-full max-w-xl bg-white rounded-lg shadow-xl">
        <h2 className="text-xl text-center font-bold mb-6">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-pink-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-pink-500 bg-white"
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
        >
          Log in
        </button>
        {loginMessage && (
          <div className="mt-4 text-center text-sm font-medium text-red-500">
            {loginMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
