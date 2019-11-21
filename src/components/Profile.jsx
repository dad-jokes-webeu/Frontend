import React, { useState, useEffect } from "react";
import axiosWithAuth from "../helpers/axios";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import {
	Col,
	Row,
	Input,
	Alert,
	FormGroup,
	Label,
	FormFeedback
} from "reactstrap";

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
		if (e.target.type === "file") {
			console.log("file");
			setUserInfo({ ...userInfo, image: e.target.files[0] });
		} else {
			setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
		}
	}

	React.useEffect(() => {
		props.setValues(userInfo);
	}, [userInfo]);

	return (
		<>
			<h1>Profile</h1>
			<br />
			<Row>
				<Col>
					<Form>
						<Row>
							<Col md="6">
								<img
									src={userInfo.avatar_url.replace(
										"http",
										"https"
									)}
									alt=""
									className="profilepic"
								/>
							</Col>
							<Col md="6" className="pfpinput">
								<FormGroup>
									<Label>
										<b>Profile picture:</b>
									</Label>
									<Field
										name="image"
										render={({
											field,
											form: { touched, errors }
										}) => (
											<>
												<Input
													// {...field}
													type="file"
													invalid={
														!!(
															touched[
																field.name
															] &&
															errors[field.name]
														)
													}
													// value={userInfo.image}
													onChange={e =>
														handleChange(e)
													}
													accept="image/png, image/jpeg"
													// placeholder="Joke goes here"
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
							</Col>
						</Row>
						<br />
						<FormGroup>
							<Label>
								<b>Username:</b>
							</Label>
							<Field
								name="username"
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
											value={userInfo.username}
											onChange={e => handleChange(e)}
											// placeholder="Joke goes here"
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
								<b>Email:</b>
							</Label>
							<Field
								name="email"
								render={({
									field,
									form: { touched, errors }
								}) => (
									<>
										<Input
											{...field}
											value={userInfo.email}
											invalid={
												!!(
													touched[field.name] &&
													errors[field.name]
												)
											}
											onChange={e => {
												handleChange(e);
											}}
											// placeholder=""
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
								<b>Password:</b>
							</Label>
							<Field
								name="password"
								render={({
									field,
									form: { touched, errors }
								}) => (
									<>
										<Input
											{...field}
											invalid={!!errors[field.name]}
											onChange={e => {
												handleChange(e);
											}}
											type="password"
											// placeholder=""
										/>
										{errors[field.name] && (
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
						{props.status && props.status.success && (
							<Alert color="success">Profile updated</Alert>
						)}
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
			password: password || ""
			// image: image || ""
		};
	},

	validationSchema: yup.object().shape({
		username: yup.string().required("You must have a username"),
		email: yup.string().required("You must enter an email"),
		password: yup.string().required("You must have a password")
	}),

	handleSubmit(values, tools) {
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
				tools.setStatus({ success: true });
				return response.data.id;
			})
			.then(id => {
				console.log(values.image);
				let form_data = new FormData();
				console.log(values);

				form_data.append("image", values.image, "profile.jpg");

				if (values.avatar_url === null) {
					axiosWithAuth(true)
						.post(`me/avatar/`, form_data)
						.then(res => {
							console.log(res);
						})
						.catch(err => {
							console.log(err);
						});
				} else {
					axiosWithAuth(true)
						.put(`me/avatar/${values.id}`, form_data)
						.then(res => {
							console.log(res);
						})
						.catch(err => {
							console.log(err);
						});
				}
			})
			.catch(error => {
				console.log(error);
			});
	}
})(Profile);

export default ProfileFormik;
