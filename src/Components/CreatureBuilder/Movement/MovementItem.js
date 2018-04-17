import React from 'react';
import {Col, Button, Glyphicon} from "react-bootstrap";

const MovementItem = (props) => {
    let movementType = props.type;
    let speed = props.speed;

    return (
        <Col xs={12}>
            {movementType}: {speed}
            {/* <Button bsStyle="danger" bsSize="xsmall" className="remove-button"><Glyphicon glyph="minus"/></Button> */}
        </Col>
    );
}

export default MovementItem;