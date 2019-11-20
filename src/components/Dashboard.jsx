import React, { useState } from "react";
import { Button, Card, Col, Row } from "reactstrap";
import JokesList from "./JokesList";
import { func } from "prop-types";
import { useHistory } from "react-router-dom";

export default function Dashboard(props) {
	let history = useHistory();

	function Add(params) {
		history.push("/joke");
	}

	return (
		<>
			<Row>
				<Col>
					<Button
						color="success"
						className="float-right"
						onClick={e => {
							Add();
						}}
					>
						Add ➕
					</Button>
				</Col>
			</Row>
			<Row>
				<JokesList api="jokes/me" dashboard={true} />
			</Row>
		</>
	);
}
