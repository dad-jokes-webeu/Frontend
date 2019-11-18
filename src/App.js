import React, { useState } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";
import List from "./components/JokesList";
// import * as help from "./helpers";
// import axios from "axios";

function App() {
	// const [response, setResponse] = useState(null);

	// const getRequest = api => {
	// 	axios.get(help.withBaseURL(api)).then(res => {
	// 		console.log(res.data);

	// 		setResponse(res.data);
	// 	});
	// };

	return (
		<div className="App">
			<Navbar />
			{/* <header
				className="App-header"
				// onClick={e => getRequest("jokes/public")}
			>
				<img src={logo} className="App-logo" alt="logo" />
				<p>This the next big app for Dad Jokes</p>
			</header> */}
			<Route
				exact
				path="/"
				render={props => {
					return <List api="jokes/public" />;
				}}
			/>
		</div>
	);
}

export default App;
