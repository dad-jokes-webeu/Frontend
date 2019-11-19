import React, { useState } from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
	Button,
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	Collapse
} from "reactstrap";

import "./NavBar.scss";

// const NavContainer = styled.div`
// 	display: flex;
// 	justify-content: space-between;
// 	/* padding: 10px 60px; */
// 	align-items: center;
// 	color: #358dd7;

// 	img {
// 		width: 80px;
// 	}
// `;

const CustomNav = styled(Nav)`
	display: flex;
	align-items: center;
	a {
		margin: 0 30px;
		text-decoration: none;
	}
`;

export default function SiteNavbar() {
	const [dropdownOpen, setOpen] = useState(false);
	const toggle = () => setOpen(!dropdownOpen);
	return (
		<>
			{!localStorage.getItem("token") ? (
				<>
					<Nav>
						<Link to="#">
							<Button outline color="primary">
								Knock-knock
							</Button>{" "}
						</Link>
						<ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
							<DropdownToggle caret color="primary">
								Who's there?
							</DropdownToggle>
							<DropdownMenu>
								<Link to="/login">
									<DropdownItem>Sign In</DropdownItem>
								</Link>
								<Link to="/register">
									<DropdownItem>Register</DropdownItem>
								</Link>
							</DropdownMenu>
						</ButtonDropdown>
					</Nav>
				</>
			) : (
				<Navbar light expand="md">
					{/* <NavbarBrand href="/">reactstrap</NavbarBrand> */}
					<NavbarToggler onClick={toggle} />
					<Collapse isOpen={dropdownOpen} navbar>
						<Link to="/">
							<img src={logo} alt="logo" className="logo" />
						</Link>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink href="#">Knock-knock</NavLink>
							</NavItem>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle caret color="primary">
									Who's there?
								</DropdownToggle>
								<DropdownMenu right>
									<DropdownItem>
										<NavLink href="/login">Sign In</NavLink>
									</DropdownItem>
									<DropdownItem>
										<NavLink href="/register">
											Register
										</NavLink>
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						</Nav>
					</Collapse>
				</Navbar>
			)}
		</>
	);
}
