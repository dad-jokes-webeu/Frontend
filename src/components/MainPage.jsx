import React, { useState } from "react";
import { Button, Card, Col, Row } from "reactstrap";
import JokesList from "./JokesList";
import { func } from "prop-types";
import { useHistory } from "react-router-dom";

export default function MainPage(props) {
	return (
		<>
			<h1>Welcome to the best collection of dad Jokes</h1>
			<Row>
				<JokesList {...props} api="jokes/public" />
			</Row>
		</>
	);
}
