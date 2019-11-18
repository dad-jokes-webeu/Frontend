import React from "react";

export default function JokeCard(props) {
	console.log(props.joke);
	return (
		<div>
			<h1>{props.joke.setup}</h1>
			<h2>{props.joke.punchline}</h2>
		</div>
	);
}
