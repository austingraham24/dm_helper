import React, {Component} from 'react';
import {PageHeader, Panel, Clearfix, FormGroup, FormControl, ControlLabel, Row, Col, Button, Glyphicon} from "react-bootstrap";
import MovementItem from "./MovementItem";
import MovementForm from './MovementForm';

class MovementBlock extends Component {
    constructor(props) {
        super(props);

        this.state={
            isEditing: false,
            movementItems:[{type:"Walking", speed: "30ft", hover:false}],//{type:"",speed:"", hover: bool}
            onSubmit: this.props.onSubmit
        };
    }

    toggleFormVisible(){
        let visible = !this.state.isEditing;
        this.setState({"isEditing":visible});
    }

    setUpMovement() {
        if(this.state.isEditing) {
            return (
                this.state.movementItems.map((item) => {
                    return <MovementForm type={item.type} speed={item.speed} hover={item.hover}/>
                })
            );
        }
        return (
            this.state.movementItems.map((item) => {
                return <MovementItem type={item.type} speed={item.speed} hover={item.hover}/>
            })
        );
    }

    render() {
        return (
            <FormGroup controlId="creatureMovement">
            <Col sm={12} className="form-col">
                <Col xs={12} md={5} className="form-col">
                    <ControlLabel>Movement:</ControlLabel>
                    {this.setUpMovement()}
                    <Col xs={12}>
                        <Button bsStyle="primary" bsSize="xsmall" onClick={this.toggleFormVisible.bind(this)}>Edit Movment</Button>
                    </Col>
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