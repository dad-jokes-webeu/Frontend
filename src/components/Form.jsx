import React, { useState } from "react";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";

function UserForm(props) {
	return (
		<Form>
			<label>
				Email:
				<Field type="email" name="email" placeholder="Email" />
			</label>
			?
		</Form>
	);
}

const FormikForm = withFormik({
	mapPropsToValues({ email }) {
		return {
			email: email || ""
		};
	},

	validationSchema: yup.object().shape({
		email: yup.string().required("password needed")
	}),

	handleSubmit(values) {
		console.log(values);
	}
})(UserForm);

export default FormikForm;
