import React, { useState, useEffect } from "react";
import axiosWithAuth from "../helpers/axios";

import JokeCard from "./JokeCard";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import IconButton from "@material-ui/core/IconButton";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function List(props) {
	const [response, setResponse] = useState([]);
	console.log(response);

	useEffect(() => {
		axiosWithAuth()
			.get(props.api)
			.then(res => {
				setResponse(res.data.results);
			});
	}, []);

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		console.log("aa");

		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const likeJoke = jk => {
		console.log(jk);
		console.log("like");

		// TODO: axios request
		setResponse([
			...response.map(joke => {
				if (joke.id === jk.id) {
					joke.liked = true;
				}
				return joke;
			})
		]);
	};

	const deleteJoke = jk => {
		// TODO: axios request
		// setResponse([
		// 	...response.map(joke => {
		// 		if (joke.id === jk.id) {
		// 			joke.liked = true;
		// 		}
		// 		return joke;
		// 	})
		// ]);
	};

	return (
		<>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">
					Share with friends on:
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						<IconButton>
							<FacebookIcon style={{ fontSize: 50 }} />
						</IconButton>
						<IconButton>
							<TwitterIcon style={{ fontSize: 50 }} />
						</IconButton>
						<IconButton>
							<InstagramIcon style={{ fontSize: 50 }} />
						</IconButton>
						<IconButton>
							<LinkedInIcon style={{ fontSize: 50 }} />
						</IconButton>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Close
					</Button>
				</DialogActions>
			</Dialog>
			{response
				? response.map(joke => {
						return (
							<JokeCard
								joke={joke}
								key={joke.id}
								share={handleClickOpen}
								likeJoke={likeJoke}
								deleteJoke={deleteJoke}
							/>
						);
				  })
				: "Loading"}
		</>
	);
}
