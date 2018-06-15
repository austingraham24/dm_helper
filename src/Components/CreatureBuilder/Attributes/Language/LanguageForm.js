import React, { Component } from 'react';
import { Form, PageHeader, Panel, Clearfix, InputGroup, FormGroup, FormControl, ControlLabel, Row, Col, Checkbox, Button, Glyphicon } from "react-bootstrap";
import _ from "lodash";

class LanguageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null
    };
  }

  onChange(event) {
    let value = event.target.value;
    this.setState({ value: value });
  }

  submitChanges(action) {
    console.log(this.state);
    if (action === "delete") {
      this.props.submitChanges("delete", this.props.index);
    }
    else {
      let fieldValue = this.state.value;
      if (fieldValue) {
        this.props.submitChanges(action, this.props.index, fieldValue);
        if (action === "add") {
          this.setState({
            value: null
          });
        }
      }
    }
  }

  getSubmitButton() {
    if (!this.state.value) {
      return <Button bsSize="sm" bsStyle="success" name="nullButton" disabled><Glyphicon glyph="plus"/></Button>
    }
    return <Button bsSize="sm" bsStyle="success" onClick={() => { this.submitChanges("add")}} name="addButton"><Glyphicon glyph="plus"/></Button>
  }

  render() {
    return (
      <InputGroup>
        <FormControl
          bsSize="small"
          type="text"
          name="language"
          value={this.state.value || ""}
          placeholder="Common"
          onChange={this.onChange.bind(this)}
        />
        <InputGroup.Button>
          {this.getSubmitButton()}
        </InputGroup.Button>
      </InputGroup>
    );
  }
}

export default LanguageForm;