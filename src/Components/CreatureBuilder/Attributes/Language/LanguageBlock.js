import React, { Component } from 'react';
import { PageHeader, Panel, Clearfix, FormGroup, FormControl, ControlLabel, Row, Col, ButtonGroup, Button, Glyphicon } from "react-bootstrap";
import './style.css';
import LanguageForm from './LanguageForm.js';
import GenericButton from "../../../GenericButton";

class LanguageBlock extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.props.onSubmit || null

    this.state = {};
  }

  submitChanges(newData) {
    this.props.onSubmit("languages", newData);
  }

  handleChange(action, index = null, newData = null) {
    let newLanguages = [...this.props.languages];
    if (action === "delete" && index != null) {
      newLanguages.splice(index, 1);
    }
    else if (action === "add" && newData != null) {
      newLanguages.push(newData);
    }
    else if (action === "update" && index != null && newData != null) {
      newLanguages.splice(index, 1, newData);
    }
    this.submitChanges(newLanguages);
  }

  layoutExistingItemsForms() {
    let sortedLanguaged = this.props.languages.sort((itemA, itemB) => {
      var nameA = itemA.value.toLowerCase(), nameB = itemB.value.toLowerCase();
      if(itemA.understandsOnly > itemB.understandsOnly) {
        return 1;
      }
      else if(itemA.understandsOnly < itemB.understandsOnly) {
        return -1;
      }
      else {
        if(nameA > nameB) {
          return 1;
        }
        return -1;
      }
    });
    return (
      sortedLanguaged.map((item, index) => {
        let extraLabel = null;
        if(item.understandsOnly) {
          extraLabel = "(understood not spoken)"
        }
        return (
          <ButtonGroup key={item.value} bsSize="xsmall" style={{margin:"0px 5px 5px 0px"}}>
            <Button className="languageButton">{item.value} {extraLabel}</Button>
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