import React, { useState } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";
import RegisterForm from "./components/Register";
import LoginForm from "./components/Login";
import JokesList from "./components/JokesList";
import { Container, Row, Col } from "reactstrap";
import Dashboard from "./components/Dashboard";
import Joke from "./components/Joke";

function App() {
	return (
		<Container>
			<Row>
				<Col>
					<Navbar />
				</Col>
			</Row>
			<Row>
				<Route
					exact
					path="/"
					render={props => {
						return <JokesList {...props} api="jokes/public" />;
					}}
				/>
			</Row>
			{/* <Route path="/" component={"Login"} /> */}
			{/* <Route path="/" component={"Jokes"} /> */}
			<Route
				path="/register"
				render={props => {
					return <RegisterForm {...props} />;
				}}
			/>
			<Route
				path="/login"
				render={props => {
					return <LoginForm {...props} />;
				}}
			/>
			<Route path="/profile" component={"Profile"} />
			<Route
				path="/dashboard"
				render={props => {
					return <Dashboard {...props} />;
				}}
			/>{" "}
			{/* Child: Jokes*/}
			<Route
				path="/joke"
				render={props => {
					return <Joke {...props} />;
				}}
			/>
			<Route path="/joke/:id" component={"EditJoke"} />
			<Route
				path="/jokes"
				render={props => {
					return <JokesList {...props} api="jokes/public" />;
				}}
			/>{" "}
			{/* Load More here */}
		</Container>
	);
}

export default App;
