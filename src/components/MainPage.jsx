import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import JokesList from "./JokesList";
import { func } from "prop-types";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../helpers/axios";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles(theme => ({
	card: {
		// maxWidth: 345
		backgroundColor: "#F4CD18"
	},
	media: {
		height: 0,
		paddingTop: "56.25%", // 16:9
		backgroundSize: "contain"
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: "rotate(180deg)"
	},
	avatar: {
		backgroundColor: "#ccc",
		color: "#000"
	}
}));

export default function MainPage(props) {
	const [jokeofDay, setjokeofDay] = useState({});

	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const getJokeofday = () => {};

	React.useEffect(() => {
		axiosWithAuth()
			.get("public/jokes/thehour")
			.then(response => {
				setjokeofDay(response.data);
				// props.values = response.data;
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	return (
		<div className="mainpage">
			<h1 className="hourJoke">Joke of the hour</h1>

			<Row>
				<Col md={{ size: 6, order: 2, offset: 3 }}>
					{JSON.stringify(jokeofDay) !== "{}" && (
						<Card className={classes.card} elevation={3}>
							<CardHeader
								avatar={
									<Avatar
										aria-label="recipe"
										className={classes.avatar}
									>
										{(jokeofDay.user_username || "")
											.slice(0, 1)
											.toUpperCase()}
									</Avatar>
								}
								// action={}
								title={"@" + jokeofDay.user_username}
								subheader={new Date().toDateString()}
							/>
							<CardContent>
								<Typography variant="body6" component="p">
									<h2>{jokeofDay.setup}</h2>
									<hr />
									<h2>{jokeofDay.punchline}</h2>
								</Typography>
							</CardContent>
						</Card>
					)}
				</Col>
			</Row>
			<br />
			<h1 className="popularJokes">Popular Jokes</h1>
			<br />
			<Row>
				<JokesList {...props} api="public/jokes/popular" />
			</Row>
		</div>
	);
}
