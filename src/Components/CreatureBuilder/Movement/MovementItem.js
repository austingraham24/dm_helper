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
        <div>
            {movementType}: {speed}ft {getHover()}
        </div>
    );
}

export default MovementItem;