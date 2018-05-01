import React, {Component, Fragment} from 'react';
import {Form, PageHeader, MenuItem, DropdownButton, Panel, Clearfix, InputGroup, FormGroup, FormControl, ControlLabel, Row, Col, Checkbox, Button, Glyphicon} from "react-bootstrap";
import _ from "lodash";
import SelectField from "../../SelectField.js";
import CalculationFunctions from "../CalculationFunctions.js";

class DiceForm extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            diceCount: this.props.diceCount || "",
            diceType: this.props.diceType || "",
            mod: this.props.mod || 0,
            avg: this.props.avg || "",
            dmgType: this.props.dmgType || ""
        };
    }

    submitChanges() {

    }

    onChange(event) {
        let field = event.target.name;
        let value = event.target.value;
        console.log(event.target.key);
        this.setState({[field]:value});
    }

    updateDmgType(event) {
        let type = event.target.name.split("-")[1];
        this.setState({dmgType:type});
    }

    layoutDamageOptions() {
        return CalculationFunctions.damageTypes.map((dmg) => {
            return <MenuItem name={"dmgType-"+dmg} onClick={this.updateDmgType.bind(this)} key={dmg}>{dmg}</MenuItem>
        })
    }

    render() {
        return (
            <Fragment>
                <ControlLabel>Damage:</ControlLabel>
                <Row>
                <Col xs={12} sm={12} md={12} lg={8}>
                <InputGroup bsSize="small">
                    <FormControl
                        bsSize="small"
                        type="text"
                        name = "diceCount"
                        value={this.state.diceCount || ""}
                        placeholder="1"
                        onChange={this.onChange.bind(this)}
                    />
                    <InputGroup.Addon>
                        d
                    </InputGroup.Addon>
                    <FormControl
                        bsSize="small"
                        type="text"
                        name = "diceType"
                        value={this.state.diceType || ""}
                        placeholder="6"
                        onChange={this.onChange.bind(this)}
                    />
                    <InputGroup.Addon>
                        +
                    </InputGroup.Addon>
                    <FormControl
                        bsSize="small"
                        type="text"
                        name = "mod"
                        value={this.state.mod}
                        placeholder="2"
                        onChange={this.onChange.bind(this)}
                    />
                    <InputGroup.Addon>
                        AVG: 50
                    </InputGroup.Addon>
                    <DropdownButton
                        componentClass={InputGroup.Button}
                        id="damage-dropdown-addon"
                        title={this.state.dmgType ||"DMG"}
                    >
                        {this.layoutDamageOptions()}
                    </DropdownButton>
                    <InputGroup.Button>
                        <Button bsStyle="success"><Glyphicon glyph="plus" /></Button>
                    </InputGroup.Button>
                </InputGroup>
                </Col>
                </Row>
            </Fragment>
        );
    }
}

export default DiceForm;