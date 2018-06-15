import React, { Component } from 'react';
import { PageHeader, Panel, Clearfix, FormGroup, FormControl, ControlLabel, Row, Col, ButtonGroup, Button, Glyphicon } from "react-bootstrap";
import './style.css';
import LanguageForm from './LanguageForm.js';
import GenericButton from "../../../GenericButton";

class LanguageBlock extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.props.onSubmit || null
    this.validSizes = { "editing": 3, "default": 3 }

    this.state = {
      isEditing: false,
      languages: this.props.languages || [],
      activeSize: this.validSizes.default
    };
  }

  toggleFormVisible() {
    let visible = !this.state.isEditing;
    let size = this.validSizes.default;
    if (visible) {
      size = this.validSizes.editing
    }
    else {
      if (this.onSubmit) {
        this.onSubmit("movement", this.state.movementItems);
      }
    }
    this.setState({ ...this.state, isEditing: visible, activeSize: size });
  }

  handleChange(action, index = null, newData = null) {
    console.log("language", action, index, newData);
    let newLanguages = [...this.state.languages];
    if (action === "delete" && index != null) {
      newLanguages.splice(index, 1);
    }
    else if (action === "add" && newData != null) {
      newLanguages.push(newData);
    }
    else if (action === "update" && index != null && newData != null) {
      newLanguages.splice(index, 1, newData);
    }
    if (action === "update" || (newLanguages.length !== this.state.languages.length)) {
      this.setState({ languages: newLanguages });
    }
  }

  layoutExistingItemsForms() {
    return (
      this.state.languages.map((item, index) => {
        return (
          <ButtonGroup key={index} bsSize="xsmall" style={{margin:"0px 5px 5px 0px"}}>
            <Button className="languageButton">{item}</Button>
            <Button bsStyle="danger" onClick={(event) => { this.handleChange("delete", index) }}><Glyphicon glyph="minus" /></Button>
          </ButtonGroup>
        );
      })
    );
  }

  setUpLanguages() {
    return (
      <React.Fragment>
        <div>{this.layoutExistingItemsForms()}</div>
        <LanguageForm submitChanges={this.handleChange.bind(this)} />
      </React.Fragment>
    );

  }

  render() {
    return (
      <FormGroup controlId="creatureLanguages">
        <div style={{ border: "1px solid #ccc", borderWidth: "0px 0px 1px 0px", paddingBottom: "5px" }}>
          <b>Languages</b>
        </div>
        <div style={{ marginTop: "5px" }}>
          {this.setUpLanguages()}
        </div>
      </FormGroup>
    );
  }
}

export default LanguageBlock;