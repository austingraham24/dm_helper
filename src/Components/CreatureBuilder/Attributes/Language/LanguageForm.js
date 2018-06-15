import React, { Component } from 'react';
import { Form, PageHeader, Panel, Clearfix, InputGroup, FormGroup, FormControl, ControlLabel, Row, Col, Checkbox, Button, Glyphicon } from "react-bootstrap";
import _ from "lodash";

class LanguageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      understandsOnly: false
    };
  }

  onChange(event) {
    let value = event.target.value;
    this.setState({ value: value });
  }

  toggleUnderstandsOnly() {
    this.setState({ understandsOnly: !this.state.understandsOnly });
  }

  submitChanges(action) {
    if (action === "delete") {
      this.props.submitChanges("delete", this.props.index);
    }
    else {
      let fieldValue = this.state.value;
      if (fieldValue) {
        this.props.submitChanges(action, this.props.index, {"value":fieldValue, "understandsOnly":this.state.understandsOnly});
        if (action === "add") {
          this.setState({
            value: null,
            understandsOnly:false
          });
        }
      }
    }
  }

  getSubmitButton() {
    if (!this.state.value) {
      return <Button bsSize="sm" bsStyle="success" name="nullButton" disabled><Glyphicon glyph="plus" /></Button>
    }
    return <Button bsSize="sm" bsStyle="success" onClick={() => { this.submitChanges("add") }} name="addButton"><Glyphicon glyph="plus" /></Button>
  }

  render() {
    let understandsGlyph = "unchecked";

    if (this.state.understandsOnly) {
      understandsGlyph = "check";
    }

    let buttonStyle = { borderRadius: "0px", borderLeft: "0px" };

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
          <Button bsSize="sm" style={buttonStyle} onClick={() => { this.toggleUnderstandsOnly() }}>
            Understands only <Glyphicon glyph={understandsGlyph} />
          </Button>
        </InputGroup.Button>
        <InputGroup.Button>
          {this.getSubmitButton()}
        </InputGroup.Button>
      </InputGroup>
    );
  }
}

export default LanguageForm;