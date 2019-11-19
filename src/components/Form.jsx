import React, { useState } from "react";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

function UserForm(props) {
	return (
		<div>
			<Form>
				<label>
					Username:
					<Field type="text" name="username" placeholder="Username" />
				</label>
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

const FormikForm = withFormik({
	mapPropsToValues({}) {
		return {
			username: "",
			email: "",
			password: ""
		};
	},

	validationSchema: yup.object().shape({
		username: yup.string().required("username required"),
		email: yup.string().required("password needed"),
		password: yup.string().required("Please enter a password")
	}),

	handleSubmit(values) {
		console.log(values);
	}
})(UserForm);

export default FormikForm;
