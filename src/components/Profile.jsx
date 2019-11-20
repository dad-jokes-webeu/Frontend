import React, { useState, useEffect } from "react";
import axiosWithAuth from "../helpers/axios";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import { Col, Row, Input, Alert } from "reactstrap";

function Profile(props) {
	const [userInfo, setUserInfo] = useState({});
	const [img, setImg] = useState(null);

	useEffect(() => {
		axiosWithAuth()
			.get("me")
			.then(res => {
				console.log(res);
				setUserInfo(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	function handleChange(e) {
		setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
	}

	React.useEffect(() => {
		props.setValues(userInfo);
	}, [userInfo]);

	return (
		<>
			<h1>Update Info?</h1>
			<Row>
				<Col>
					<Form>
						<Field
							name="image"
							render={({ field, form: { touched, errors } }) => (
								<>
									<Input
										{...field}
										type="file"
										value={userInfo.image}
										onChange={e => handleChange(e)}
										// placeholder="Joke goes here"
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
						Username{" "}
						<Field
							name="username"
							render={({ field, form: { touched, errors } }) => (
								<>
									<Input
										{...field}
										type="text"
										value={userInfo.username}
										onChange={e => handleChange(e)}
										// placeholder="Joke goes here"
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
						email{" "}
						<Field
							name="email"
							render={({ field, form: { touched, errors } }) => (
								<>
									<Input
										{...field}
										value={userInfo.email}
										onChange={e => {
											handleChange(e);
										}}
										// placeholder=""
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
						Password{" "}
						<Field
							name="password"
							render={({ field, form: { touched, errors } }) => (
								<>
									<Input
										{...field}

										// placeholder=""
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

const ProfileFormik = withFormik({
	mapPropsToValues({ email, username, password, image }) {
		return {
			username: username || "",
			email: email || "",
			password: password || "",
			image: image || ""
		};
	},

	validationSchema: yup.object().shape({
		username: yup.string().required("You must have a username"),
		email: yup.string().required("You must enter an email"),
		password: yup.string().required("You must have a password")
	}),

	handleSubmit(values, tools) {
		console.log(axiosWithAuth(true));
		axiosWithAuth()
			.put("me", {
				username: values.username,
				email: values.email,
				password: values.password
			})
			.then(response => {
				tools.resetForm();
				console.log(response);
				console.log(tools);
				return response.data.id;
			})
			.then(id => {
				console.log(values.image);
				let form_data = new FormData();
				form_data.append("image", values.image, "profile.jpg");
				axiosWithAuth(true)
					.post(`me/avatar/`, form_data)
					.then(res => {
						console.log(res);
					})
					.catch(err => {
						console.log(err);
					});
			})
			.catch(error => {
				console.log(error);
			});
	}
})(Profile);

export default ProfileFormik;
