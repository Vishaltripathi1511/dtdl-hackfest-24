import React, { useContext, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import Contextpage from "../Contextpage";
import { useNavigate } from "react-router-dom";
import slugify from "react-slugify";

function Searchbar() {
	const { filteredGenre, fetchSearch, setBackGenre, setGenres } =
		useContext(Contextpage);
	const [value, setValue] = useState("");
	const navigate = useNavigate();
	let inputRef = useRef(null);

	const searchDelayed = () => {
		$("#searchpanel").change($.debounce(250, show_loading));
	};
	// debounce(openSearch, 500);

	const [typingTimeout, setTypingTimeout] = useState(null);
	const [text, setText] = useState("");
	const [voiceText, setVoiceText] = useState(false);
	const [isListening, setIsListening] = useState(false);
	const [error, setError] = useState("");
	const startListening = () => {
		if (!("webkitSpeechRecognition" in window)) {
			setError(
				"Your browser does not support speech recognition. Try using Google Chrome."
			);
			return;
		}

		const recognition = new window.webkitSpeechRecognition();
		recognition.lang = "en-US";
		recognition.interimResults = false;
		recognition.maxAlternatives = 1;

		recognition.start();
		setIsListening(true);
		setError("");

		recognition.onresult = (event) => {
			const speechToText = event.results[0][0].transcript;
			setText(speechToText);
			setVoiceText(speechToText);
			setIsListening(false);
			speakText(speechToText);
		};

		recognition.onspeechend = () => {
			recognition.stop();
			setIsListening(false);
		};

		recognition.onerror = (event) => {
			console.error(event.error);
			setError(`Error occurred: ${event.error}`);
			setIsListening(false);
		};
	};

	var flag = false;

	const speakText = (text) => {
		console.log(text);
		const utterance = new SpeechSynthesisUtterance(text);
		const keywords = [
			"action",
			"adventure",
			"animation",
			"comedy",
			"crime",
			"documentary",
			"drama",
			"family",
			"fantasy",
			"history",
			"horror",
			"music",
			"mystery",
			"romance",
			"science fiction",
			"tv movie",
			"thriller",
			"war",
			"western",
			"how are you",
			"can you help",
		];
		const matchingKeyword = keywords.find((keyword) =>
			utterance.text.includes(keyword)
		);

		var result = "";
		if (matchingKeyword && matchingKeyword.includes("how are you")) {
			console.log(`Keyword found in the text: ${matchingKeyword}`);
			result = new SpeechSynthesisUtterance("I am good, how about you?");
		} else if (
			matchingKeyword &&
			matchingKeyword &&
			matchingKeyword.includes("can you help")
		) {
			result = new SpeechSynthesisUtterance(
				"Sure, can you please be more specific about what you wana watch"
			);
		} else if (matchingKeyword) {
			console.log(`Keyword found in the text: ${matchingKeyword}`);
			// word = matchingKeyword
			// sendDataToParent();
			result = new SpeechSynthesisUtterance(
				`Here is your recommended ${matchingKeyword} content`
			);
			const genre = matchingKeyword;
			setValue(genre);
			navigate(`/search/${slugify(genre)}`);
		} else {
			result = new SpeechSynthesisUtterance("Am not smart enough, sorry");
		}
		result.lang = "en-US";
		window.speechSynthesis.speak(result);
	};

	// <button
	// 	onClick={startListening}
	// 	disabled={isListening}
	// 	className="block text-white p-2 hover:bg-pink-700 rounded transition duration-300"
	// >
	// 	{isListening ? "Listening..." : "Smart Assistant"}
	// </button>;
	const handleSearch = () => {
		if (voiceText) onKeyUp(voiceText);

		// Clear the previous timeout to prevent premature execution
		if (typingTimeout) {
			clearTimeout(typingTimeout);
		}

		// Set a new timeout
		const newTimeout = setTimeout(() => {
			onKeyUp(value);
		}, 500); // Adjust the timeout duration as needed (in milliseconds)

		setTypingTimeout(newTimeout);
		setVoiceText(false);
	};

	const onKeyUp = (query) => {
		// console.log(query)
		if (query !== "") {
			query = query.trim();

			if (query === "") {
				navigate("/");
			} else {
				navigate(`/search/${slugify(query)}`);
			}
		}
	};

	return (
		<>
			<Helmet>
				<title>OneTV Movies</title>
			</Helmet>

			<div className="w-full bg-gradient-to-r from-pink-600 to-pink-600 h-[10rem] md:h-[12rem]">
				<div className="h-full w-full bg-black/30 flex justify-center items-center">
					<input
						type="search"
						name="searchpanel"
						id="searchpanel"
						ref={inputRef}
						placeholder="Search Movie"
						className="p-3 w-full mx-10 md:w-[40rem]  rounded-xl outline-none"
						onKeyUp={(e) => handleSearch()}
						value={value}
						onChange={searchDelayed}
					/>
					<button
						onClick={startListening}
						disabled={isListening}
						className="block text-white p-2 hover:bg-pink-700 rounded transition duration-300"
					>
						{isListening ? "Listening..." : "Smart Assistant"}
					</button>
				</div>
			</div>
		</>
	);
}

export default Searchbar;
