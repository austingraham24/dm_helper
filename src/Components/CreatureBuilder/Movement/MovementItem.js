import React from 'react';
import {Col} from "react-bootstrap";

const MovementItem = (props) => {
    let movementType = props.type;
    let speed = props.speed;

    return (
        <Col xs={12}>
            {movementType}: {speed}
        </Col>
    );
}

export default MovementItem;