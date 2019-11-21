import React, { useState } from "react";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axiosWithAuth from "../helpers/axios";
import { Alert, Input, FormGroup, Label, FormFeedback } from "reactstrap";

function UserForm(props) {
	return (
		<Form>
			<h1>Register</h1>
			<br />
			<FormGroup>
				<Label>
					<b>Username:</b>
				</Label>
				<Field
					name="username"
					render={({ field, form: { touched, errors } }) => (
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

const RegisterForm = withFormik({
	mapPropsToValues({}) {
		return {
			username: "",
			email: "",
			password: ""
		};
	},

	validationSchema: yup.object().shape({
		username: yup
			.string()
			.min(3, "Minimum 3 characters")
			.required("Username is required"),
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
			.post("auth/register", {
				username: values.username,
				email: values.email,
				password: values.password
			})
			.then(response => {
				props.history.push("/login");
				console.log(response);
			})
			.catch(error => {
				console.log(props);
				setStatus({ error: true });
				console.log(error);
			});
	}
})(UserForm);

export default RegisterForm;
