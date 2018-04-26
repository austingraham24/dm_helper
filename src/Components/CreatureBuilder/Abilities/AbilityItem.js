import React from 'react';
import {Col, Button, Glyphicon} from "react-bootstrap";

const AbilityItem = (props) => {
    let name = props.name;
    let desc = props.desc;
    let damage = props.damage || [];

    return (
        <div style={{marginBottom:"5px"}}>
            <b>{name}:</b>
            <div>
                {desc}
            </div>
        </div>
    );
}

export default AbilityItem;