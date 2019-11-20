import * as url from "./url";
// import UseLocalStorage from "./uselocalstorage";
import axios from "axios";
import { useState } from "react";

export default function axiosWithAuth() {
	const token = localStorage.getItem("token") || "";

	const instance = axios.create({
		baseURL: "http://localhost:5000/api/",
		headers: {
			"Content-Type": "application/json",
			Authorization: token
		}
	});

	return instance;
}
