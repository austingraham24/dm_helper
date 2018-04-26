import React, {Component} from 'react';
import {Form, PageHeader, Panel, Clearfix, InputGroup, FormGroup, FormControl, ControlLabel, Row, Col, Checkbox, Button, Glyphicon} from "react-bootstrap";
import _ from "lodash";

class AbilityForm extends Component {
    constructor(props) {
        super(props);

        this.debouncedSubmit = _.debounce(this.submitChanges, 500);
        
        this.state={
            name: this.props.name || "",
            desc: this.props.desc || "",
            damage: this.props.damage || []
        };
    }

    submitChanges() {

    }

    render() {
        return (
            <div>
                Test
            </div>
        );
    }
}

export default AbilityForm;