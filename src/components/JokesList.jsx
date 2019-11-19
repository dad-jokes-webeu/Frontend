import React, { useState, useEffect } from "react";
import axiosWithAuth from "../helpers/axios";

import JokeCard from "./JokeCard";

export default function List(props) {
	const [response, setResponse] = useState([]);
	console.log(response);

	useEffect(() => {
		axiosWithAuth()
			.get(props.api)
			.then(res => {
				setResponse(res.data);
			});
	}, []);

	return (
		<>
			{response
				? response.map(joke => {
						return <JokeCard joke={joke} key={joke.id} />;
				  })
				: "Loading"}
		</>
	);
}
