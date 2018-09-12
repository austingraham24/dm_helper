import React, { Component, Fragment } from 'react';
import { Form, PageHeader, Panel, Clearfix, InputGroup, FormGroup, FormControl, ControlLabel, Row, Col, Checkbox, Button, Glyphicon } from "react-bootstrap";
import _ from "lodash";
import DamageForm from '../Damage/DamageForm';
import GenericButton from '../../GenericButton';

class MagicAction extends Component {
  constructor(props) {
    super(props);

    //this.debouncedSubmit = _.debounce(this.submitChanges, 500);
    this.state = {
      name: this.props.name || "",
      desc: this.props.desc || "",
      type: this.props.type || "",
      range: this.props.range || "",
      numTargets: this.props.numTargets || "",
      recharge: this.props.recharge || "",
      limit: this.props.limit || "",
      damage: this.props.damage || null
    };
  }

  onChange(event) {
    let field = event.target.name;
    let value = event.target.value;
    this.setState({ [field]: value });
    //this.debouncedSubmit("update")
  }

  render() {
    return (
      <div>
        <FormControl
          componentClass="select"
          onChange={(event) => { alert("Changed!"); }}
          style={{ padding: "2px" }}>
          <option value="cs">Use Existing Attacks Coming Soon!</option>
        </FormControl>

        
      </div>
    );
  }
}

export default MagicAction;