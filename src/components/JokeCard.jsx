import React, { useState } from "react";
import { Col } from "reactstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

// const CustomCard = styled(Card)`
// 	/* width: 60%; */
// 	margin: 10px auto;
// 	/* min-height: 220px; */
// 	height: auto;
// 	border-radius: 10px;
// 	border: 1px solid black;
// 	padding: 10px;
// 	background-color: orange;
// `;

const useStyles = makeStyles(theme => ({
	card: {
		marginBottom: "30px"
	},
	media: {
		height: 0,
		paddingTop: "56.25%" // 16:9
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
		backgroundColor: red[500]
	},
	actions: {
		display: "flex",
		justifyContent: "space-between"
	},
	liked: {
		color: "red"
	}
}));

export default function JokeCard(props) {
	const [showPLine, setShowPLine] = useState(false);
	// let punchlineClass = "";
	function togglePLine() {
		setShowPLine(!showPLine);
	}

	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Col xs="12" md="6" lg="4">
			<Card className={classes.card}>
				<CardHeader
					avatar={
						<Avatar aria-label="recipe" className={classes.avatar}>
							{props.joke.user_avatar ? (
								<img src={props.joke.user_avatar} alt="" />
							) : (
								(props.joke.user_username || "").slice(0, 1)
							)}
						</Avatar>
					}
					action={
						<>
							{localStorage.getItem("token") ? (
								<>
									<IconButton
										aria-label="settings"
										onClick={e =>
											props.deleteJoke(props.joke)
										}
									>
										<DeleteIcon />
									</IconButton>
									<Link to={`joke/${props.joke.id}`}>
										<IconButton aria-label="settings">
											<EditIcon />
										</IconButton>
									</Link>
								</>
							) : (
								""
							)}
						</>
					}
					title={props.joke.user_username}
					// subheader="September 14, 2016"
				/>
				{/* <CardMedia
					className={classes.media}
					image="/static/images/cards/paella.jpg"
					title="Paella dish"
				/> */}
				<CardContent>
					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
					>
						{props.joke.setup}
					</Typography>
				</CardContent>
				<CardActions disableSpacing className={classes.actions}>
					<IconButton
						aria-label="add to favorites"
						className={props.joke.liked ? classes.liked : ""}
						onClick={e => {
							props.likeJoke(props.joke);
						}}
					>
						<FavoriteIcon />
					</IconButton>
					<IconButton aria-label="share" onClick={e => props.share()}>
						<ShareIcon />
					</IconButton>
					<IconButton
						className={clsx(classes.expand, {
							[classes.expandOpen]: expanded
						})}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</IconButton>
				</CardActions>
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<CardContent>
						<Typography paragraph>
							{props.joke.punchline}
						</Typography>
					</CardContent>
				</Collapse>
			</Card>
			{/* 
			<CustomCard body>
				<h1>Joke #{props.joke.id}</h1>
				<h2>{props.joke.setup}</h2>
				<h2 className={showPLine ? "" : "punchline-hide"}>
					{props.joke.punchline}
				</h2>
				<Button color="primary" onClick={() => togglePLine()}>
					{showPLine ? "Hide" : "Punchline..."}
				</Button>
			</CustomCard> */}
		</Col>
	);
}
