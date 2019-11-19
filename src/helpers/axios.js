import * as url from "./url";
// import UseLocalStorage from "./uselocalstorage";
import axios from "axios";
import { useState } from "react";

export default function axiosWithAuth() {
	// const [token, setToken] = UseLocalStorage("token", "sss");
	// const [token, setToken] = useState(localStorage.getItem("token"));

	const token = localStorage.getItem("token") || "";
	// console.log(UseLocalStorage("test", "aaa"));
	// localStorage.setItem("token", "abc");

	// axios.defaults.headers.common['Authorization'] = "token 02dcb2cae4f385b8d314cfd61d2a1adcb059e237"

	const instance = axios.create({
		baseURL: "http://localhost:5000/api/",
		headers: {
			"Content-Type": "application/json",
			Authorization: token
		}
	});

	return instance;
}
