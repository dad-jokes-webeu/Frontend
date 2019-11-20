import * as url from "./url";
// import UseLocalStorage from "./uselocalstorage";
import axios from "axios";
import { useState } from "react";

export default function axiosWithAuth(image = false) {
	const token = localStorage.getItem("token") || "";
	console.log(image);
	const instance = axios.create({
		baseURL: "http://localhost:5000/api/",
		headers: {
			"Content-Type": image ? "multipart/form-data" : "application/json",
			Authorization: token
		}
	});

	return instance;
}
// headers: {'Content-Type': 'multipart/form-data' }
