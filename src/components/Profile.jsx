import React, { useEffect } from "react";
import axiosWithAuth from "../helpers/axios";

export default function Profile(props) {
	useEffect(() => {
		axiosWithAuth()
			.get("me")
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	return <div>hello</div>;
}
