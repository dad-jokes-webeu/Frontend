import React from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
	return (
		<div className="App">
			<Navbar />
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>This the next big app for Dad Jokes</p>
			</header>
		</div>
	);
}

export default App;
