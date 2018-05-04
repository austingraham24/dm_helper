import React, {Component, Fragment} from 'react';
import {Form, Tooltip, OverlayTrigger, PageHeader, MenuItem, DropdownButton, Panel, Clearfix, InputGroup, FormGroup, FormControl, ControlLabel, Row, Col, Checkbox, Button, Glyphicon} from "react-bootstrap";
import _ from "lodash";
import SelectField from "../../SelectField.js";
import CalculationFunctions from "../CalculationFunctions.js";
import DiceAverages from "../../../Inf/DiceAverages.json";

class DiceForm extends Component {
    constructor(props) {
        super(props);

        this.debouncedCalcAvg = _.debounce(this.calcAverageDamage, 1000);
        this.debouncedCalcExpression = _.debounce(this.calcDiceExpression, 1000);
        
        this.state={
            flatDamage: this.props.flatDamage || "",
            diceExpression: this.props.diceExpression || "",
            dmgType: this.props.dmgType || ""
        };
    }

    submitChanges() {

    }

    onChange(event) {
        let field = event.target.name;
        let value = event.target.value;
        if(field === "diceExpression") {
            this.debouncedCalcAvg(value);
        }
        else if(field === "flatDamage") {
            this.debouncedCalcExpression(value)
        }
        this.setState({[field]:value});
    }

    calcDiceExpression(flatDamage) {
        if(!flatDamage || isNaN(flatDamage)) {
            return
        }
        let diceType = this.parseExpresion(this.state.diceExpression).type;
        let diceAverage = DiceAverages["d"+diceType];
        if(isNaN(diceType) || !diceAverage) {
            console.log("Not valid dice or no average for that kind of dice");
            return
        }

        let count = Math.floor(flatDamage/diceAverage);
        let remainder = Math.ceil(flatDamage%diceAverage);
        let expression = count + "d" + diceType + ((remainder > 0)? "+" + remainder: "");

        this.setState({diceExpression: expression});
    }

    calcAverageDamage(expression) {
        if(!expression) {
            return
        }
        let parsed = this.parseExpresion(expression);
        let mod = parsed.mod || 0;
        let count = parsed.count;
        let type = parsed.type;
        if(type && !count) {
            this.calcDiceExpression(this.state.flatDamage);
            return
        }
        else if(!type) {
            return
        }
        let avg = DiceAverages["d"+type] || 0;
        let final = Math.ceil((avg*count) + mod);
        this.setState({flatDamage: final});
    }

    parseExpresion(expression) {
        let splitExpression = expression.split("d")
        if(splitExpression.length > 1) {
            let mod = 0;
            let num = splitExpression[0].trim();
            let splitType = splitExpression[1].split("+");
            let type = splitType[0].trim();
            if(splitType.length > 1) {
                mod = parseFloat(splitType[1].trim()) || 0
            }
            return {count: num, type: type, mod: mod};
        }
        return {type: expression};
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

    getTooltip(type) {
        if(type == "expression") {
            return (
                <Tooltip id="diceExpressionToolTip">
                    ex: "2d6+10" or put dice type (ex: d6) and fill next field to calculate
                </Tooltip>
            );
        }
        else {
            return
        }
    }

    render() {
        return (
            <Fragment>
                <Row>
                <Col xs={12}>
                <InputGroup bsSize="small">
                    <OverlayTrigger
                        overlay={this.getTooltip("expression")}
                        placement="top"
                        delayShow={300}
                        delayHide={150}
                        >
                        <label className="has-float-label">
                            <FormControl
                                bsSize="small"
                                type="text"
                                name = "diceExpression"
                                value={this.state.diceExpression || ""}
                                placeholder="2d12+5"
                                onChange={this.onChange.bind(this)}
                            />
                            <span>Dice Expression</span>
                        </label>
                    </OverlayTrigger>
                    <InputGroup.Addon>
                        or
                    </InputGroup.Addon>
                    <label className="has-float-label">
                        <FormControl
                            bsSize="small"
                            type="text"
                            name = "flatDamage"
                            value={this.state.flatDamage}
                            placeholder="2"
                            onChange={this.onChange.bind(this)}
                        />
                        <span>Average DMG</span>
                    </label>    
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