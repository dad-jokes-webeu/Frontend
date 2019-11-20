import React, { useState } from "react";
import { Button, Card, Col, Row } from "reactstrap";
import JokesList from "./JokesList";
import { func } from "prop-types";
import { useHistory } from "react-router-dom";

export default function MainPage(props) {
	const [jokeofDay, setjokeofDay] = useState({});

	const getJokeofday = () => {};

	return (
		<div className="mainpage">
			<h1>Popular Jokes</h1>
			<Row>
				<JokesList {...props} api="public/jokes/popular" />
			</Row>
		</div>
	);
}
