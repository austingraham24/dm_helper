import React from 'react';
import { Alert, Panel, Label, FormGroup, FormControl, ControlLabel, Checkbox, Col, Clearfix, Row, Button, InputGroup, Glyphicon, Popover, OverlayTrigger } from "react-bootstrap";
import creatureSizes from "../../../Inf/CreatureSize.json";
import SelectField from "../../SelectField.js";
import CreatureClassificationArray from "../../../Inf/CreatureClassification.json";
import "./style.css";

const OverviewBlock = (props) => {
  let onChange = (event) => {
    let field = event.target.name;
    let value = event.target.value;
    props.handleChange(field, value);
  }

  let alignments = { "none": "Unaligned", "lg": "Lawful Good", "ng": "Neutral Good", "cg": "Chaotic Good", "ln": "Lawful Neutral", "n": "Neutral", "cn": "Chaotic Neutral", "le": "Lawful Evil", "ne": "Neutral Evil", "ce": "Chaotic Evil" }

  let propCalcCR = props.state.calculatedCR || 0;
  let calcCRStatus = "";
  if (propCalcCR != null || props.state.challengeRating != undefined) {
    //console.log(propCalcCR, props.state.challengeRating);
    if (propCalcCR != props.state.challengeRating) {
      calcCRStatus = "notMatching";
    }
    else {
      calcCRStatus = "matching";
    }
  }

  let calcCRPopover = (
    <Popover id="calculated-cr-popover" title="What is Calculated CR?">
      This is what the form thinks the CR should be. Of course this is just a suggestion using a quick averaging calculation.
      <br /><br />
      There are, however, many factors the form cannot account for, so please review your creature's abilities to modify the CR to a more accurate value.
    </Popover>
  );

  let modifyCRIndex = (offset) => {
    let CRKeys = props.CRKeys;
    let CRIndex = (CRKeys.indexOf(props.state.challengeRating) || 0) + offset;
    if (CRIndex < 0) {
      CRIndex = 0;
    }
    else if (CRIndex > CRKeys.length - 1) {
      CRIndex = CRKeys.length - 1;
    }
    props.handleChange("challengeRating", CRKeys[CRIndex]);
  }

  return (
    <Panel>
      <Panel.Heading><b>Creature Overview</b></Panel.Heading>
      <Panel.Body>
        {props.children}
        <Row>
          <Col xs={12} sm={6} className="form-col">
            <FormGroup controlId="creatureIdentifiers">
              <Col xs={12} className="form-col">
                <ControlLabel>Creature Name:</ControlLabel>
                <FormControl
                  type="text"
                  name="type"
                  value={props.state.type}
                  placeholder="ex. Skeleton"
                  onChange={onChange}
                />
              </Col>
              <Col xs={12} className="form-col">
                <ControlLabel>Unique Name: <span className="form-help">(Optional)</span></ControlLabel>
                <FormControl
                  type="text"
                  name="name"
                  value={props.state.name}
                  placeholder="ex. Yorick"
                  onChange={onChange}
                />
              </Col>
            </FormGroup>
          </Col>
          <Col xs={12} sm={6} className="form-col">
            <FormGroup controlId="creatureIdentifiers">
              <Col xs={6} md={4} className="form-col">
                <ControlLabel>Classification:</ControlLabel>
                <SelectField name="classification" arrayData={CreatureClassificationArray} onChange={onChange} stateValue={props.state.classification} placeholder="Unknown" />
              </Col>
              <Col xs={6} md={4} className="form-col">
                <ControlLabel>Size:</ControlLabel>
                <SelectField name="size" arrayData={Object.keys(creatureSizes)} placeholder="Select Size" onChange={onChange} stateValue={props.state.size} />
              </Col>
              <Col xs={6} md={4} className="form-col">
                <ControlLabel>Alignment:</ControlLabel>
                <SelectField name="alignment" objectData={alignments} onChange={onChange} stateValue={props.state.alignment} />
              </Col>
            </FormGroup>
            <FormGroup controlId="creatureCore">
              <Col xs={6} md={4} className="form-col">
                <ControlLabel>Challenge Rating:</ControlLabel>
                <div style={{ display: "table", width: "100%" }}>
                  <div style={{ display: "table-row" }}>
                    <InputGroup>
                      <FormControl
                        name="challengeRating"
                        type="text"
                        placeholder="ex. 1/2"
                        style={{ borderRight: "0px", borderRadius: "4px 0px 0px 0px" }}
                        value={props.state.challengeRating || ""}
                        onChange={onChange}
                      />
                      {/* <div style={{ display: "table-cell", zIndex: "0", margin: "-1px" }}>
                    <Button style={{ borderRadius: "0px 4px 4px 0px" }}>Test</Button>
                  </div> */}
                      <InputGroup.Button>
                        <div>
                          <Button 
                          bsSize={"xsmall"} 
                          className={"crEditButton"} 
                          style={{ paddingBottom: "1px", borderRadius: "0px 4px 0px 0px", borderBottom: "0px" }}
                          onClick={() => {
                            modifyCRIndex(1);
                          }}
                          >
                            <Glyphicon glyph="chevron-up" style={{ top: "2px" }} />
                          </Button>
                          <Button 
                          bsSize={"xsmall"} 
                          className={"crEditButton"}
                          onClick={() => {
                            modifyCRIndex(-1);
                          }}
                          >
                            <Glyphicon glyph="chevron-down" style={{ top: "2px" }} />
                          </Button>
                        </div>
                      </InputGroup.Button>
                    </InputGroup>
                  </div>
                  <div style={{ display: "table-row" }}>
                    <OverlayTrigger
                      trigger={'click'}
                      rootClose
                      placement="bottom"
                      overlay={calcCRPopover}
                    >
                      <div className={"calculatedCRBlock " + (calcCRStatus)}>
                        Calculated CR: {propCalcCR || 0}
                      </div>
                    </OverlayTrigger>
                  </div>
                </div>
              </Col>
              <Col xs={6} md={4} className="form-col">
                <ControlLabel>XP Awarded:</ControlLabel>
                <FormControl type="text" placeholder="#" value={props.state.experience || 0} />
              </Col>
              {/* <Col xs={6} md={4} className="form-col">
                <ControlLabel>Calculated CR:</ControlLabel>
                <div>{props.state.challengeRating || 0}</div>
              </Col> */}
              {/* <Clearfix visibleXsBlock visibleSmBlock /> */}
              <Col xs={6} md={4} className="form-col">
                <ControlLabel>Proficiency Bonus:</ControlLabel>
                <FormControl type="text" placeholder="#" value={props.state.proficiencyBonus || 0} />
              </Col>
            </FormGroup>
          </Col>
        </Row>
      </Panel.Body>
    </Panel>
  );
}

export default OverviewBlock;