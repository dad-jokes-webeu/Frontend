import React, { useState } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import SiteNavbar from "./components/Navbar";
import { Route } from "react-router-dom";
import RegisterForm from "./components/Register";
import LoginForm from "./components/Login";
import JokesList from "./components/JokesList";
import { Container, Row, Col } from "reactstrap";
import Dashboard from "./components/Dashboard";
import Joke from "./components/Joke";
import MainPage from "./components/MainPage";
import ProfileFormik from "./components/Profile";

function App() {
	return (
		<Container>
			{/* <SiteNavbar /> */}
			<Route
				path="/"
				render={props => {
					return <SiteNavbar {...props} />;
					// return <JokesList {...props} api="jokes/public" />;
				}}
			/>
			<Route
				exact
				path="/"
				render={props => {
					return <MainPage {...props} />;
					// return <JokesList {...props} api="jokes/public" />;
				}}
			/>
			{/* <Route path="/" component={"Login"} /> */}
			{/* <Route path="/" component={"Jokes"} /> */}
			<Route
				exact
				path="/register"
				render={props => {
					return <RegisterForm {...props} />;
				}}
			/>
			<Route
				exact
				path="/login"
				render={props => {
					return <LoginForm {...props} />;
				}}
			/>
			<Route
				path="/profile"
				render={props => {
					return <ProfileFormik />;
				}}
			/>
			<Route
				exact
				path="/dashboard"
				render={props => {
					return <Dashboard {...props} />;
				}}
			/>{" "}
			{/* Child: Jokes*/}
			<Route
				exact
				path="/joke"
				render={props => {
					return <Joke {...props} testggg="abc" />;
				}}
			/>
			<Route
				exact
				path="/joke/:id"
				render={props => {
					return <Joke {...props} />;
				}}
			/>
			<Route
				exact
				path="/jokes"
				render={props => {
					return <JokesList {...props} api="jokes/public" />;
				}}
			/>{" "}
			{/* Load More here */}
		</Container>
	);
}

export default App;
