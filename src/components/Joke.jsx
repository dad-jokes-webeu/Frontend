import React, { useState } from "react";
import JokesList from "./JokesList";
import { func } from "prop-types";
import { useParams } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import axiosWithAuth from "../helpers/axios";

import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import { FormGroup, Label, FormFeedback, Col, Row, Input } from "reactstrap";

function JokeForm(props) {
	const { id } = useParams();
	console.log(id);

	const [joke, setJoke] = useState({
		// setup: "jjj"
		// punchline: "fff",
		// private: false
	});
	console.log(joke);

	React.useEffect(() => {
		if (id !== undefined) {
			axiosWithAuth()
				.get("me/jokes/" + id)
				.then(response => {
					console.log(response.data);
					setJoke(response.data);
					// props.values = response.data;
				})
				.catch(error => {
					console.log(error);
				});
		} else {
			console.log("add");
		}
	}, []);

	const jokeChange = e => {
		console.log("e.target.value");
		console.log(e.target.value);

		setJoke({
			...joke,
			[e.target.name]:
				e.target.type === "checkbox" ? e.target.checked : e.target.value
		});
		// console.log();
	};

	React.useEffect(() => {
		props.setValues(joke);
	}, [joke]);
	// React.useEffect(() => {
	// 	console.log(props.values);
	// 	console.log(joke);
	// 	console.log("props.touched");
	// 	console.log(props.touched);

	// 	if (props.values === props.initialValues) {
	// 	} else {
	// 		setJoke({
	// 			...joke
	// 			// punchline: "abc"
	// 		});
	// 	}
	// }, [props.values]);

	console.log(props.values);

	return (
		<>
			<Row>
				<Col>
					<h1>
						{JSON.stringify(joke) === "{}" ? "Add" : "Edit"} joke:{" "}
					</h1>
					<br />
				</Col>
			</Row>
			<Row>
				<Col>
					<Form
					// onSubmit={e => {
					// 	e.preventDefault();
					// 	// props.handleSubmit();
					// 	// setJoke({ setup: "" });
					// }}
					>
						<FormGroup>
							<Label>
								<b>Joke:</b>
							</Label>
							<Field
								name="setup"
								render={({
									field,
									form: { touched, errors }
								}) => (
									<>
										<Input
											{...field}
											type="text"
											invalid={
												!!(
													touched[field.name] &&
													errors[field.name]
												)
											}
											value={joke[field.name]}
											onChange={jokeChange}
											placeholder="Joke goes here"
										/>
										{touched[field.name] &&
											errors[field.name] && (
												<FormFeedback color="danger">
													{errors[field.name]}
												</FormFeedback>
											)}
									</>
								)}
							/>
						</FormGroup>
						<FormGroup>
							<Label>
								<b>Punchline:</b>
							</Label>
							<Field
								name="punchline"
								render={({
									field,
									form: { touched, errors }
								}) => (
									<>
										<Input
											{...field}
											type="textarea"
											invalid={
												!!(
													touched[field.name] &&
													errors[field.name]
												)
											}
											value={joke[field.name]}
											onChange={jokeChange}
											placeholder="Punchline goes here"
										/>
										{touched[field.name] &&
											errors[field.name] && (
												<FormFeedback color="danger">
													{errors[field.name]}
												</FormFeedback>
											)}
									</>
								)}
							/>
						</FormGroup>
						<FormGroup>
							<Label>
								<b>Private?</b>
							</Label>
							<br />
							<Field
								name="private"
								render={({
									field,
									form: { touched, errors }
								}) => (
									<>
										<FormControlLabel
											control={
												<Checkbox
													{...field}
													checked={Boolean(
														joke[field.name]
													)}
													onChange={jokeChange}
													color="primary"
												/>
											}
										/>
										{/* <Input {...field} type="checkbox" /> */}
										{touched[field.name] &&
											errors[field.name] && (
												<FormFeedback color="danger">
													{errors[field.name]}
												</FormFeedback>
											)}
									</>
								)}
							/>
						</FormGroup>
						<Input type="submit" />
					</Form>
				</Col>
			</Row>
		</>
	);
}

const Joke = withFormik({
	mapPropsToValues({}) {
		return {
			setup: "",
			punchline: "",
			private: true
		};
	},

	validationSchema: yup.object().shape({
		setup: yup
			.string()
			.min(3, "Minimum 3 characters")
			.required("You didn't enter a joke"),
		punchline: yup
			.string()
			.min(3, "Minimum 3 characters")
			.required("You need to enter a punchline"),
		private: yup.boolean()
	}),

	handleSubmit(values, tools) {
		console.log(values);
		console.log(tools);

		if (tools.props.match.path.includes(":id")) {
			axiosWithAuth()
				.put("me/jokes/" + tools.props.match.params.id, {
					setup: values.setup,
					punchline: values.punchline,
					private: Boolean(values.private)
				})
				.then(response => {
					tools.resetForm();
					tools.props.history.push("/dashboard");
					console.log(response);
				})
				.catch(error => {
					console.log(error);
				});
		} else {
			axiosWithAuth()
				.post("me/jokes", {
					setup: values.setup,
					punchline: values.punchline,
					private: Boolean(values.private)
				})
				.then(response => {
					tools.resetForm();
					tools.props.history.push("/dashboard");
					console.log(response);
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
})(JokeForm);

export default Joke;
