import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axiosWithAuth from "../helpers/axios";
import { Alert, Input, FormGroup, Label, FormFeedback } from "reactstrap";

import useStateWithLocalStorage from "../helpers/uselocalstorage";

function UserForm(props) {
	// const [token, setToken] = useStateWithLocalStorage("token", null);
	return (
		<Form>
			<h1>Login</h1>
			<br />
			<FormGroup>
				<Label>
					<b>Email:</b>
				</Label>
				<Field
					name="email"
					render={({ field, form: { touched, errors } }) => (
						<>
							<Input
								{...field}
								type="email"
								invalid={
									!!(
										touched[field.name] &&
										errors[field.name]
									)
								}
								placeholder="Email please?"
							/>
							{touched[field.name] && errors[field.name] && (
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
					<b>Password:</b>
				</Label>
				<Field
					name="password"
					render={({ field, form: { touched, errors } }) => (
						<>
							<Input
								{...field}
								type="password"
								invalid={
									!!(
										touched[field.name] &&
										errors[field.name]
									)
								}
								placeholder="Password please?"
							/>
							{touched[field.name] && errors[field.name] && (
								<FormFeedback color="danger">
									{errors[field.name]}
								</FormFeedback>
							)}
						</>
					)}
				/>
			</FormGroup>
			<Input type="submit" />
			<br />
			{props.status && props.status.error && (
				<Alert color="danger">
					There was an error, please try again
				</Alert>
			)}
		</Form>
	);
}

const LoginForm = withFormik({
	mapPropsToValues({}) {
		return {
			email: "",
			password: ""
		};
	},

	validationSchema: yup.object().shape({
		email: yup
			.string()
			.email("Please enter a valid email")
			.required("Email is required"),
		password: yup
			.string()
			.min(3, "Minimum 3 characters")
			.required("Password is required")
	}),

	handleSubmit(values, { props, setStatus }) {
		axiosWithAuth()
			.post("auth/login", {
				email: values.email,
				password: values.password
			})
			.then(response => {
				localStorage.setItem("token", response.data.token);

				// setToken("response.data.token");

				props.history.push("/dashboard");

				console.log(response);
			})
			.catch(error => {
				console.log(props);

				setStatus({ error: true });
				console.log(error);
			});
	}
})(UserForm);

export default LoginForm;
