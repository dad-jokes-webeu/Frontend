import React, { useState, useEffect } from "react";
import * as help from "../helpers";
import axios from "axios";
import JokeCard from "./JokeCard";

export default function List(props) {
	const [response, setResponse] = useState([]);
	console.log(response);

	useEffect(() => {
		axios.get(help.withBaseURL(props.api)).then(res => {
			console.log(res.data);

			setResponse(res.data);
		});
	}, []);

	return (
		<div>
			{response
				? response.map(joke => {
						return <JokeCard joke={joke} key={joke.id} />;
				  })
				: "Loading"}
		</div>
	);
}
