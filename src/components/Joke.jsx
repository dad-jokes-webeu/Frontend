import React, { useState } from "react";
import { Button, Card, Col, Row, Input } from "reactstrap";
import JokesList from "./JokesList";
import { func } from "prop-types";
import { useHistory } from "react-router-dom";

export default function Joke(props) {
	return (
		<>
			<Row>
				<Col>
					joke <Input />
					punch <Input type="textarea" />
					<Button
						color="success"
						className="float-right"
						onClick={e => {
							console.log("add");
						}}
					>
						Save?
					</Button>
				</Col>
			</Row>
		</>
	);
}
