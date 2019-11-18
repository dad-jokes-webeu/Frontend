import React, { useState, useEffect } from "react";
import * as help from "../helpers";

export default function List(props) {
	const [response, setResponse] = useState(null);

	useEffect(() => {
		axios.get(help.withBaseURL(api)).then(res => {
			console.log(res.data);

			setResponse(res.data);
		});
	}, []);

	return (
		<div>
			{props.jokes.map(joke => {
				return <JokeCard joke={joke} />;
			})}
		</div>
	);
}
