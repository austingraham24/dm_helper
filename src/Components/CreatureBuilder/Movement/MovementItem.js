import React from 'react';
import {Col, Button, Glyphicon} from "react-bootstrap";

const MovementItem = (props) => {
    let movementType = props.type;
    let speed = props.speed;
    let hover = props.hover;

    function getHover() {
        if(hover) {
            return "(Hover)"
        }
        return null
    }

    return (
        <Col xs={12}>
            {movementType}: {speed}ft {getHover()}
        </Col>
    );
}

export default MovementItem;