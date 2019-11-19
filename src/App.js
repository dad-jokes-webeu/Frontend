import React, { useState } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";
import List from "./components/JokesList";
import RegisterForm from "./components/Register";
import LoginForm from "./components/Login";
import { Container, Row, Col } from "reactstrap";

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
						return <List api="jokes/public" />;
					}}
				/>
			</Row>
			{/* <Route path="/" component={"Login"} /> */}
			{/* <Route path="/" component={"Jokes"} /> */}
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
			<Route path="/profile" component={"Profile"} />
			<Route path="/dashboard" component={"Dashboard"} />{" "}
			{/* Child: Jokes*/}
			<Route path="/joke" component={"AddJoke"} />
			<Route path="/joke/:id" component={"EditJoke"} />
			<Route path="/jokes" component={"Jokes"} /> {/* Load More here */}
		</Container>
	);
}

export default App;
