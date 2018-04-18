import React, {Component} from 'react';
import {PageHeader, Panel, Clearfix, FormGroup, FormControl, ControlLabel, Row, Col, Button, Glyphicon} from "react-bootstrap";
import MovementItem from "./MovementItem";
import MovementForm from './MovementForm';

class MovementBlock extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.props.onSubmit || null

        this.state={
            isEditing: false,
            movementItems: this.props.movement || [{type:"Walking", speed: "30ft", hover:false}],//{type:"",speed:"", hover: bool}
            toggleLabel: "Edit Movment"
        };
    }

    toggleFormVisible(){
        let visible = !this.state.isEditing;
        let label = "Edit Movment";
        if(visible) {
            label = "Save Changes"
        }
        else {
            if(this.onSubmit) {
                this.onSubmit("movement", this.state.movementItems);
            }
        }
        this.setState({...this.state, isEditing:visible, toggleLabel: label});
    }

    handleChange(action, index = null, newData = null) {
        let newMovementItems = [...this.state.movementItems];
        if(action === "delete" && index != null) {
            newMovementItems.splice(index, 1);
        }
        else if(action === "add" && newData != null) {
            newMovementItems.push(newData);
        }
        else if(action === "update" && index!=null && newData != null) {
            newMovementItems.splice(index, 1, newData);
        }
        if(action === "update" || (newMovementItems.length !== this.state.movementItems.length)){
            this.setState({movementItems:newMovementItems});
        }
    }

    layoutExistingItemsForms() {
        return (
            this.state.movementItems.map((item, index) => {
                return <MovementForm key={index} index={index} type={item.type} speed={item.speed} hover={item.hover} submitChanges={this.handleChange.bind(this)}/>
            })
        );
    }

    setUpMovement() {
        if(this.state.isEditing) {
            return (
                <React.Fragment>
                    {this.layoutExistingItemsForms()}
                    <MovementForm submitChanges={this.handleChange.bind(this)}/>
                </React.Fragment>
            );
        }
        return (
            this.state.movementItems.map((item) => {
                return <MovementItem key={item.type} type={item.type} speed={item.speed} hover={item.hover}/>
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
                        <Button bsStyle="primary" bsSize="xsmall" onClick={this.toggleFormVisible.bind(this)}>{this.state.toggleLabel}</Button>
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