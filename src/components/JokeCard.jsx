import React, { useState } from "react";
import { Button, Card, Col } from "reactstrap";
import styled from "styled-components";

const CustomCard = styled(Card)`
	/* width: 60%; */
	margin: 10px auto;
	/* min-height: 220px; */
	height: auto;
	border-radius: 10px;
	border: 1px solid black;
	padding: 10px;
`;

export default function JokeCard(props) {
	const [showPLine, setShowPLine] = useState(false);
	// let punchlineClass = "";
	function togglePLine() {
		setShowPLine(!showPLine);
	}

	return (
		<Col xs="12" md="6">
			<CustomCard body>
				<h1>Joke #{props.joke.id}</h1>
				<h2>{props.joke.setup}</h2>
				<h2 className={showPLine ? "" : "punchline-hide"}>
					{props.joke.punchline}
				</h2>
				<Button color="primary" onClick={() => togglePLine()}>
					{showPLine ? "Hide" : "Punchline..."}
				</Button>
			</CustomCard>
		</Col>
	);
}

{
	/* <Row>

<Col sm="6">
  <Card body>
    <CardTitle>Special Title Treatment</CardTitle>
    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
    <Button>Go somewhere</Button>
  </Card>
</Col> */
}
// </Row>
