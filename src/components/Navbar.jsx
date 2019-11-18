import React from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<div>
			<img src={logo} alt="logo" />
			<nav>
				<Link>Joke Page</Link>
				<Link>Sign In | Register </Link>
			</nav>
		</div>
	);
}
