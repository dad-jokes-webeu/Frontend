import React from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px 60px;
	align-items: center;

	img {
		width: 80px;
	}
`;

const Nav = styled.nav`
	a {
		margin: 0 30px;
		text-decoration: none;
	}
`;

export default function Navbar() {
	return (
		<NavContainer>
			<img src={logo} alt="logo" />
			<Nav>
				<Link>Joke Page</Link>
				<Link>Sign In | Register </Link>
			</Nav>
		</NavContainer>
	);
}
