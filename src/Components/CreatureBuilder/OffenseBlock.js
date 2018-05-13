import React, { Component } from "react";
import { Panel, FormGroup, FormControl, ControlLabel, Col } from "react-bootstrap";
import ActionBlock from "./ActionBlock";
import UtilityPanel from "../UtilityPanel";
import CalculationFunctions from "./CalculationFunctions";

class OffenseBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offensiveCR: 0,
      saveDC: 0,
      attackBonus: 0,
      dpr: 0
    };
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      let currentState = this.state;
      this.props.handleChange(currentState);
    }
    if (prevProps.offenseProps.offenseCR !== this.props.offenseProps.offenseCR) {
      this.render();
    }
  }

  handleChange(event) {
    let fieldName = event.target.name
    let newValue = event.target.value
    let newDataObject = { ...this.state }
    newDataObject[fieldName] = newValue;
    this.setState({ ...newDataObject });
    return
  }

  render() {
    return (
      <Col xs={12} md={7}>
        <FormGroup controlId="offenseBlock">
          <UtilityPanel title={"Offense (CR: " + (this.props.offenseProps.offenseCR || 0) + ")"} defaultOpened collapsible>
            <Col xs={12} md={4} className="form-col">
              <label className="has-float-label">
                <FormControl
                  type="text"
                  name="attackBonus"
                  placeholder="Enter Number Value"
                  value={this.state.attackBonus || ""}
                  onChange={this.handleChange.bind(this)}
                />
                <span>Attack Bonus</span>
              </label>
            </Col>
            <Col xs={12} md={4} className="form-col">
              <label className="has-float-label">
                <FormControl
                  type="text"
                  name="saveDC"
                  placeholder="Enter Number Value"
                  value={this.state.saveDC || ""}
                  onChange={this.handleChange.bind(this)}
                />
                <span>Save DC</span>
              </label>
            </Col>
            <Col xs={12} md={4} className="form-col">
              <label className="has-float-label">
                <FormControl
                  type="text"
                  name="dpr"
                  placeholder="Enter Number Value"
                  value={this.state.dpr || ""}
                  onChange={this.handleChange.bind(this)}
                />
                <span>Damage Per Round</span>
              </label>
            </Col>
            <ActionBlock />
          </UtilityPanel>
        </FormGroup>
      </Col>
    );
  }
}

export default OffenseBlock;