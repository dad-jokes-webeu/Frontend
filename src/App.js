import React, { useState } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";
import List from "./components/JokesList";
import RegisterForm from "./components/Register";
import LoginForm from "./components/Login";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Route
				exact
				path="/"
				render={props => {
					return <List api="jokes/public" />;
				}}
			/>
			<Route
				path="/register"
				render={props => {
					return <RegisterForm />;
				}}
			/>
			<Route
				path="/login"
				render={props => {
					return <LoginForm />;
				}}
			/>
		</div>
	);
}

export default App;
