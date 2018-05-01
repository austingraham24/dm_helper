import React, {Component, Fragment} from 'react';
import {Form, PageHeader, Panel, Clearfix, InputGroup, FormGroup, FormControl, ControlLabel, Row, Col, Checkbox, Button, Glyphicon} from "react-bootstrap";
import _ from "lodash";
import DiceForm from "./DiceForm.js";
import "./style.css";
import "../../../Inf/Damage/DamageStyles.css";

class DamageForm extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            diceCount: this.props.diceCount || "",
            diceType: this.props.diceType || "",
            mod: this.props.mod || "",
            avg: this.props.avg || ""
        };
    }

    submitChanges() {

    }

    onChange(event) {
        let field = event.target.name;
        let value = event.target.value;
        this.setState({[field]:value});
    }

    render() {
        return (
            <Fragment>
                <DiceForm />
            </Fragment>
        );
    }
}

export default DamageForm;