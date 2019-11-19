import React, { useState } from "react";
import { Button, Card, Col, Row, Input, Alert } from "reactstrap";
import JokesList from "./JokesList";
import { func } from "prop-types";
import { useHistory } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import axiosWithAuth from "../helpers/axios";

function JokeForm(props) {
	return (
		<>
			<Row>
				<Col>
					<Form>
						joke{" "}
						<Field
							name="joke"
							render={({ field, form: { touched, errors } }) => (
								<>
									<Input
										{...field}
										type="text"
										placeholder="Joke goes here"
									/>
									{touched[field.name] &&
										errors[field.name] && (
											<Alert color="danger">
												{errors[field.name]}
											</Alert>
										)}
								</>
							)}
						/>
						punch{" "}
						<Field
							name="punchline"
							render={({ field, form: { touched, errors } }) => (
								<>
									<Input
										{...field}
										type="textarea"
										placeholder="Punchline goes here"
									/>
									{touched[field.name] &&
										errors[field.name] && (
											<Alert color="danger">
												{errors[field.name]}
											</Alert>
										)}
								</>
							)}
						/>
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
			joke: "",
			punchline: ""
		};
	},

	validationSchema: yup.object().shape({
		joke: yup.string().required("You didn't enter a joke"),
		punchline: yup.string().required("You need to enter a punchline")
	}),

	handleSubmit(values, tools) {
		console.log(values);
		axiosWithAuth()
			.post("jokes/me", {
				setup: values.joke,
				punchline: values.punchline,
				private: false
			})
			.then(response => {
				tools.resetForm();
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			});
	}
})(JokeForm);

export default Joke;
