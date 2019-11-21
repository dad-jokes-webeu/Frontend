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
	UncontrolledDropdown,
	Collapse
} from "reactstrap";

import { NavLink } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

import "./NavBar.scss";

import useStateWithLocalStorage from "../helpers/uselocalstorage";
import axiosWithAuth from "../helpers/axios";

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

	const [token, setToken] = useStateWithLocalStorage("token", null);

	React.useEffect(() => {
		setToken(localStorage.getItem("token") || "");
	});

	return (
		<>
			{token ? (
				<Navbar color="light" light expand="md">
					{/* <NavbarBrand href="/">reactstrap</NavbarBrand> */}
					<NavbarToggler onClick={toggle} />
					<Collapse isOpen={dropdownOpen} navbar>
						<Link to="/">
							<img src={logo} alt="logo" className="logo" />
						</Link>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink tag={RRNavLink} to="/profile">
									Profile
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink tag={RRNavLink} to="/dashboard">
									Dashboard
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									className="logout"
									tag={Link}
									exact
									to="/"
									onClick={e => {
										axiosWithAuth().post("auth/logout");
										localStorage.removeItem("token");
									}}
								>
									Logout
								</NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
			) : (
				<Navbar color="light" light expand="md">
					{/* <NavbarBrand href="/">reactstrap</NavbarBrand> */}
					<NavbarToggler onClick={toggle} />
					<Collapse isOpen={dropdownOpen} navbar>
						<Link to="/">
							<img src={logo} alt="logo" className="logo" />
						</Link>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink to="#">Knock-knock</NavLink>
							</NavItem>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle caret color="primary">
									Who's there?
								</DropdownToggle>
								<DropdownMenu right>
									<DropdownItem>
										<NavLink tag={Link} to="/login">
											Sign In
										</NavLink>
									</DropdownItem>
									<DropdownItem>
										<NavLink tag={Link} to="/register">
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
