import React, { useState } from "react";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import * as help from "../helpers";

function UserForm(props) {
	return (
		<div>
			<Form>
				<label>
					Email:
					<Field type="text" name="email" placeholder="Email" />
				</label>
				<label>
					Password
					<Field
						type="password"
						name="password"
						placeholder="Password"
					/>
				</label>
				<input type="submit" />
			</Form>
		</div>
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
		email: yup.string().required("password needed"),
		password: yup.string().required("Please enter a password")
	}),

	handleSubmit(values) {
		console.log(values);
		axios
			.post(help.withBaseURL("auth/login"), {
				email: values.email,
				password: values.password
			})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			});
	}
})(UserForm);

export default LoginForm;
