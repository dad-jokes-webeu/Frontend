import React, { useState } from "react";
import { Button, Card, Col, Row } from "reactstrap";
import JokesList from "./JokesList";
import { func } from "prop-types";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NavigationIcon from "@material-ui/icons/Navigation";

const useStyles = makeStyles(theme => ({
	fab: {
		margin: theme.spacing(2),
		position: "fixed",
		bottom: 0,
		right: 0
	},
	extendedIcon: {
		marginRight: theme.spacing(1)
	}
}));
export default function Dashboard(props) {
	let history = useHistory();

	function Add(params) {
		history.push("/joke");
	}
	const classes = useStyles();
	return (
		<>
			<Row>
				<Col>
					<h1>Dashboard </h1>
					<br />
				</Col>
			</Row>
			<Row>
				<JokesList api="me/jokes" dashboard={true} />
				<Fab
					color="primary"
					aria-label="add"
					className={classes.fab}
					onClick={e => {
						Add();
					}}
				>
					<AddIcon />
				</Fab>
			</Row>
		</>
	);
}
