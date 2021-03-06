import React, { Component, Fragment } from 'react';
import { Form, PageHeader, Panel, Clearfix, InputGroup, FormGroup, FormControl, ControlLabel, Row, Col, Checkbox, Button, Glyphicon } from "react-bootstrap";
import _ from "lodash";
import DamageForm from '../Damage/DamageForm';
import GenericButton from '../../GenericButton';

class ActionForm extends Component {
  constructor(props) {
    super(props);

    this.debouncedSubmit = _.debounce(this.submitChanges, 500);
    this.state = {
      name: this.props.name || "",
      desc: this.props.desc || "",
      damage: this.props.damage || null
    };
  }

  submitChanges(action) {
    if (!this.props.onSubmit) {
      return null;
    }
    let damage = this.state.damage;
    if (damage && damage.length === 0) {
      damage = null;
    }
    this.props.onSubmit(action, {
      name: this.state.name,
      desc: this.state.desc,
      damage: damage
    });
  }

  updateDamage(action, index, object) {
    let damage = this.state.damage ? [...this.state.damage] : [];
    switch (action) {
      case "add":
        damage.push(object);
        break;
      case "update":
        damage.splice(index, 1, object);
        break;
      case "delete":
        damage.splice(index, 1);
        break;
    }

    //set to null if damage no longer has elements
    if (damage.length === 0) {
      damage = null;
    }
    //only update state if we need to
    if (damage != this.state.damage) {
      this.setState({ damage: damage });
    }
  }

  onChange(event) {
    let field = event.target.name;
    let value = event.target.value;
    this.setState({ [field]: value });
    //this.debouncedSubmit("update")
  }

  layoutDamageItems() {
    if (!this.state.damage) {
      return null
    }
    return (
      this.state.damage.map(
        (damageItem, index) => {
          return (
            <div className={index + "-" + damageItem.dmgType + "-" + damageItem.flatDamage}>
              <DamageForm
                key={index + "-" + damageItem.dmgType + "-" + damageItem.flatDamage}
                flatDamage={damageItem.flatDamage}
                diceExpression={damageItem.diceExpression}
                dmgType={damageItem.dmgType}
                index={index}
                submitFunction={this.updateDamage.bind(this)}
              />
            </div>
          );
        })
    );
  }

  getDamageForms() {
    if (this.state.damage) {
      return (
        <Fragment>
          {this.layoutDamageItems()}
          <DamageForm key="empty" defaultEmpty submitFunction={this.updateDamage.bind(this)} />
        </Fragment>
      );
    }
    else {
      return (
        <div style={{ marginBottom: "5px" }}>
          <Button bsSize="xsmall" bsStyle="primary" onClick={() => { this.setState({ damage: [] }) }}>Add Damage</Button>
        </div>
      );
    }
  }

  getSubmitButton() {
    if (this.state.name === "" || this.state.desc === "") {
      if (!this.props.name) {
        return (
          <GenericButton type="cancel" onClick={() => {
            this.submitChanges("delete");
            return
          }} />
        );
      }

    }

    return (
      <GenericButton type="done" onClick={() => {
        this.submitChanges("update");
        return
      }} />
    );
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
      <Col sm={8}>
        <FormGroup validationState="success">
          <label className="has-float-label">
            <FormControl
              bsSize="small"
              type="text"
              name="name"
              value={this.state.name || ""}
              className="form-label-group action-input"
              placeholder="Put a cool name here..."
              onChange={this.onChange.bind(this)}
            />
            <span>Action Name</span>
          </label>
        </FormGroup>
        </Col>
        <Col xs={12}>
        <FormGroup validationState="">
          <label className="has-float-label">
            <FormControl
              bsSize="small"
              componentClass="textarea"
              className="action-description action-input"
              name="desc"
              value={this.state.desc || ""}
              placeholder="What does it do?"
              onChange={this.onChange.bind(this)}
            />
            <span>Action Description</span>
          </label>
        </FormGroup>
        </Col>
        {this.getDamageForms()}
        <div style={{ marginBottom: "10px" }}>
          {this.getSubmitButton()}
        </div>
      </div>
    );
  }
}

export default ActionForm;