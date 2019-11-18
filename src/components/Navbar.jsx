import React, { useState } from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
	Button,
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from "reactstrap";

const NavContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px 60px;
	align-items: center;
	color: #358dd7;

	img {
		width: 80px;
	}
`;

const Nav = styled.nav`
	display: flex;
	align-items: center;

	a {
		margin: 0 30px;
		text-decoration: none;
	}
`;

export default function Navbar() {
	const [dropdownOpen, setOpen] = useState(false);
	const toggle = () => setOpen(!dropdownOpen);
	return (
		<NavContainer>
			<img src={logo} alt="logo" />
			<Nav>
				<Link to='#'>
					<Button outline color="primary">
						Knock-knock
					</Button>{" "}
				</Link>
				<ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
					<DropdownToggle caret color="primary">
						Who's there?
					</DropdownToggle>
					<DropdownMenu>
						<Link to='#'>
							<DropdownItem>Sign In</DropdownItem>
						</Link>
						<Link to='#'>
							<DropdownItem>Register</DropdownItem>
						</Link>
					</DropdownMenu>
				</ButtonDropdown>
			</Nav>
		</NavContainer>
	);
}
