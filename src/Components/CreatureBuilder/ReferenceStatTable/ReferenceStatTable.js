import React, { Component } from 'react';
import AnimateHeight from 'react-animate-height';
import TableTemplate from '../../TableTemplate.js';
import { Panel, Button } from "react-bootstrap";
import './style.css';

//props should include CR and crData
//"CR": String -> the selected CR
//crData: {} -> data object for the given CR} --> see CreatureStatChart.json in the Inf folder for the data object

class ReferenceStatTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      crData: null,
      tableShowSize: "0",
      showTable: false,
      tableHeaders: ["CR", "Experience", "Proficiency Bonus", "Armor Class", "Hit Points", "Attack Bonus", "Damage Per Round", "Save DC"]
    };
  };

  componentWillReceiveProps(nextProps) {
    let nextCRData = nextProps.crData;
    if (!nextCRData || !nextProps.CR) {
      if (this.state.tableShowSize !== "0") {
        this.setState({ tableShowSize: "0" });
      }
    }
    else {
      if (this.state.tableShowSize === "0") {
        this.setState({ tableShowSize: "auto" });
      }
      let dataArray = [nextProps.CR, nextCRData.xp, nextCRData.proficiency, nextCRData.ac, nextCRData.hp, nextCRData.attackBonus, nextCRData.dpr, nextCRData.saveDC]
      this.setState({ crData: dataArray });
    }
  }

  render() {
    let show = false;
    if (this.props.CR != null) {
      show = true;
    }

    let dataArray = [];

    if (this.props.crData != null && this.props.crData != undefined) {
      dataArray = [this.props.CR, this.props.crData.xp, this.props.crData.proficiency, this.props.crData.ac, this.props.crData.hp, this.props.crData.attackBonus, this.props.crData.dpr, this.props.crData.saveDC]
    }

    return (
      <Panel expanded={show} style={{ border: "none", boxShadow: "none", margin:"0px" }}>
        <Panel.Collapse>
          <div><TableTemplate headers={this.state.tableHeaders} rows={[dataArray]} /></div>
          <Button bsSize={"xsmall"} bsStyle={"primary"} style={{}} onClick={() => {
            this.props.setTemplateCR()
          }}>Use as template</Button>
        </Panel.Collapse>
      </Panel>
    );
  }
}

export default ReferenceStatTable;