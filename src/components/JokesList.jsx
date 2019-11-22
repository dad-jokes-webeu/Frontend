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

import { useHistory } from "react-router-dom";
import { Col } from "reactstrap";

import { FacebookShareButton } from "react-share";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function List(props) {
	const [response, setResponse] = useState([]);
	const [next, setNext] = useState(0);
	const [shareId, setshareId] = useState(3);
	console.log(response);

	let history = useHistory();

	useEffect(() => {
		loadJokes();
	}, []);

	// useEffect(() => {
	// 	loadJokes();
	// 	// console.log(page);
	// }, [next]);

	const loadMore = () => {
		loadJokes();
	};

	const loadJokes = () => {
		axiosWithAuth()
			.get(props.api + (next !== 0 ? "?page=" + next : ""))
			.then(res => {
				if (res.data.next) {
					setNext(res.data.next);
				} else {
					setNext(null);
				}
				setResponse([...response, ...res.data.results]);
			});
	};

	const [open, setOpen] = React.useState(false);
	const [openDelete, setopenDelete] = React.useState(false);
	const [joketoDelete, setjoketoDelete] = React.useState({});

	const handleClickOpen = id => {
		setOpen(true);
		setshareId(id);
	};
	const handleClickDelete = jk => {
		console.log(jk);
	};

	const handleClose = () => {
		setOpen(false);
		setopenDelete(false);
	};

	const likeJoke = (jk, e) => {
		console.log(jk);
		console.log("like");
		e.stopPropagation();

		// TODO: axios request
		setResponse([
			...response.map(joke => {
				if (joke.id === jk.id) {
					joke.liked = !joke.liked;
					if (joke.liked) {
						joke.likes = Number(joke.likes) + 1;
						axiosWithAuth()
							.post(`me/jokes/${joke.id}/likes`)
							.then(res => {
								console.log(res);
							})
							.catch(err => {
								console.log(err);
							});
					} else {
						joke.likes = Number(joke.likes) - 1;
						axiosWithAuth()
							.delete(`me/jokes/${joke.id}/likes`)
							.then(res => {
								console.log(res);
							})
							.catch(err => {
								console.log(err);
							});
					}
				}
				return joke;
			})
		]);
	};

	const deleteJoke = jk => {
		setopenDelete(true);
		console.log(jk);
		setjoketoDelete(jk);
	};
	const handleDelete = () => {
		console.log(joketoDelete.id);
		// TODO: axios request

		axiosWithAuth()
			.delete("me/jokes/" + joketoDelete.id)
			.then(response => {
				history.push("/dashboard");
				console.log(response);

				setopenDelete(false);
			})
			.catch(error => {
				console.log(error);
			});
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
							<FacebookShareButton
								children={
									<FacebookIcon style={{ fontSize: 50 }} />
								}
								url={`https://best-dad-jokes.netlify.com/public-joke/${shareId}`}
							/>
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

			<Dialog
				open={openDelete}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">
					Are you sure?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description"></DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDelete} color="primary">
						Yes
					</Button>
					<Button onClick={handleClose} color="primary">
						No
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
								delete={handleClickDelete}
								likeJoke={likeJoke}
								deleteJoke={deleteJoke}
								api={props.api}
							/>
						);
				  })
				: "Loading"}

			<Col>
				<div className="loaderdiv">
					{next !== null && (
						<Button
							variant="outlined"
							color="primary"
							onClick={loadMore}
							className="morepurple"
						>
							Load More
						</Button>
					)}
				</div>
			</Col>
		</>
	);
}
