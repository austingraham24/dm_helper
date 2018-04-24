import React, {Component} from 'react';
import {PageHeader, Panel, Clearfix, FormGroup, FormControl, ControlLabel, Row, Col, Button, Glyphicon} from "react-bootstrap";
import MovementItem from "./MovementItem";
import MovementForm from './MovementForm';

class MovementBlock extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = (this.props.onSubmit || null);
        this.validSizes = {
            "md":{"editing": 4, "default":2},
            "sm":{"editing": 6, "default":3}
        };

        this.state={
            isEditing: false,
            movementItems: this.props.movement || [{type:"Walking", speed: "30ft", hover:false}],//{type:"",speed:"", hover: bool}
            toggleLabel: "Edit Movment",
            activeMediumSize: this.validSizes.md.default,
            activeSmallSize: this.validSizes.sm.default
        };
    }

    toggleFormVisible(){
        let visible = !this.state.isEditing;
        let label = "Edit Movment";
        let sizeM = this.validSizes.md.default;
        let sizeS = this.validSizes.sm.default;
        if(visible) {
            label = "Save Changes"
            sizeM = this.validSizes.md.editing;
            sizeS = this.validSizes.sm.editing;
        }
        else {
            if(this.onSubmit) {
                this.onSubmit("movement", this.state.movementItems);
            }
        }
        this.setState({...this.state, isEditing:visible, toggleLabel: label, activeMediumSize: sizeM, activeSmallSize: sizeS});
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
            <Col xs={12} sm={this.state.activeSmallSize} md={this.state.activeMediumSize} className="form-col">
                <FormGroup controlId="creatureMovement">
                        <ControlLabel>Movement:</ControlLabel>
                        {this.setUpMovement()}
                        <div>
                            <Button bsStyle="primary" bsSize="xsmall" onClick={this.toggleFormVisible.bind(this)}>{this.state.toggleLabel}</Button>
                        </div>
                </FormGroup>
            </Col>
        );
    }
}

export default MovementBlock;