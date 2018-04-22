import React, {Component} from 'react';
import {Form, PageHeader, Panel, Clearfix, InputGroup, FormGroup, FormControl, ControlLabel, Row, Col, Checkbox, Button, Glyphicon} from "react-bootstrap";
import _ from "lodash";

class LanguageForm extends Component {
    constructor(props) {
        super(props);

        this.debouncedSubmit = _.debounce(this.submitChanges, 500);
        
        this.state={
            value: null
        };
    }

    onChange(event) {
        let value = event.target.value;
        this.setState({value: value});
    }

    buttonClick(event) {
        let action = event.target.name
        if (action === "deleteButton") {
            this.submitChanges("delete");
        }
        else if(action === "addButton") {
            this.submitChanges("add");
        }
    }

    submitChanges(action) {
        if (action === "delete") {
            this.props.submitChanges("delete", this.props.index);
        }
        else {
            let fieldValue = this.state.value;
            if(fieldValue) {
                this.props.submitChanges(action, this.props.index, fieldValue);
                if(action === "add"){
                    this.setState({
                        value: null
                    });
                }
            }
        }
    }

    getSubmitButton() {
        if(!this.props.language) {
            return <Button bsStyle="default" onClick={()=>{this.submitChanges("add")}} name="addButton">Add</Button>
        }
    }

    render() {
        return (
            <Row>
                <Col xs={12} sm={8}>
                    <InputGroup>
                        <FormControl
                            bsSize="small"
                            type="text"
                            name = "language"
                            value={this.state.value || ""}
                            placeholder="Common"
                            onChange={this.onChange.bind(this)}
                        />
                        <InputGroup.Button>
                            <Button bsSize="sm" bsStyle="success" onClick={this.buttonClick.bind(this)} name="addButton">Add</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </Col>
            </Row>
        );
    }
}

export default LanguageForm;