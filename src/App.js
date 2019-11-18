import React, { useState } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route } from "react-router-dom";
import List from "./components/JokesList";
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
		</Container>
	);
}

export default App;
