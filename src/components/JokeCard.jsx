import React, { useState } from "react";
import { Button } from "reactstrap";
import styled from "styled-components";

const Card = styled.div`
	width: 60%;
	margin: 10px auto;
	/* min-height: 220px; */
	height: auto;
	border-radius: 10px;
	border: 1px solid black;
	padding: 10px;
	background-color: orange;
`;

export default function JokeCard(props) {
	const [showPLine, setShowPLine] = useState(false);
	// let punchlineClass = "";
	function togglePLine() {
		setShowPLine(!showPLine);
	}

	return (
		<div>
			<Card body>
				<h1>Joke #{props.joke.id}</h1>
				<h2>{props.joke.setup}</h2>
				<h2 className={showPLine ? "" : "punchline-hide"}>
					{props.joke.punchline}
				</h2>
				<Button color="primary" onClick={() => togglePLine()}>
					{showPLine ? "Hide" : "Punchline..."}
				</Button>
			</Card>
		</div>
	);
}
