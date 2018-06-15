import React, { Component } from 'react';
import { PageHeader, Panel, Clearfix, FormGroup, FormControl, ControlLabel, Row, Col, Button, Glyphicon } from "react-bootstrap";
import MovementItem from "./MovementItem";
import MovementForm from './MovementForm';
import GenericButton from "../../../GenericButton";

class MovementBlock extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = (this.props.onSubmit || null);

    this.state = {
      isEditing: false,
      movementItems: this.props.movement,//[{type:"",speed:"", hover: bool}]
    };
  }

  toggleFormVisible() {
    let visible = !this.state.isEditing;
    if (this.onSubmit) {
      this.onSubmit("movement", this.state.movementItems);
    }
    this.setState({ ...this.state, isEditing: visible});
  }

  handleChange(action, index = null, newData = null) {
    let newMovementItems = [...this.state.movementItems];
    if (action === "delete" && index != null) {
      newMovementItems.splice(index, 1);
    }
    else if (action === "add" && newData != null) {
      newMovementItems.push(newData);
    }
    else if (action === "update" && index != null && newData != null) {
      newMovementItems.splice(index, 1, newData);
    }
    if (action === "update" || (newMovementItems.length !== this.state.movementItems.length)) {
      this.setState({ movementItems: newMovementItems });
    }
  }

  layoutExistingItemsForms() {
    return (
      this.state.movementItems.map((item, index) => {
        return <MovementForm key={item.type || "Form"} index={index} type={item.type} speed={item.speed} hover={item.hover} submitChanges={this.handleChange.bind(this)} />
      })
    );
  }

  setUpMovement() {
    if (!this.state.movementItems || this.state.movementItems.length === 0) {
      return (
        <div style={{ marginTop: "5px" }}>
        <MovementForm submitChanges={this.handleChange.bind(this)} />
        </div>
      );
    }
      return (
        <div style={{ marginTop: "5px" }}>
          {this.layoutExistingItemsForms()}
          <MovementForm submitChanges={this.handleChange.bind(this)} />
        </div>
      );
  }

  render() {
    return (
      <FormGroup controlId="creatureMovement">
        <div style={{ border: "1px solid #ccc", borderWidth: "0px 0px 1px 0px", paddingBottom: "5px" }}>
          <b>Movement</b>
        </div>
        <div>
          {this.setUpMovement()}
        </div>
      </FormGroup>
    );
  }
}

export default MovementBlock;