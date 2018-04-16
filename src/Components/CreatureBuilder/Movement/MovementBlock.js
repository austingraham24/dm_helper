import React, {Component} from 'react';
import {PageHeader, Panel, Clearfix, FormGroup, FormControl, ControlLabel, Row, Col} from "react-bootstrap";
import MovementItem from "./MovementItem";
import MovementForm from './MovementForm';

class MovementBlock extends Component {
    constructor(props) {
        super(props);

        this.state={
            visible: false,
            speed: "",
            type: "",
            onSubmit: this.props.onSubmit
        };
    }

    render() {
        return (
            <FormGroup controlId="creatureMovement">
            <Col sm={12} className="form-col">
                <Col xs={12} md={5} className="form-col">
                    <ControlLabel>Movement:</ControlLabel>
                    <MovementItem type="Walking" speed="30ft"/>
                    <MovementItem type="Flying" speed="30ft"/>
                    <MovementForm onSubmit={()=>{}}/>
                </Col>
                <Col xs={12} md={7} className="form-col">
                    <h1>In progress</h1>
                </Col>
            </Col>
        </FormGroup>
        );
    }
}

export default MovementBlock;