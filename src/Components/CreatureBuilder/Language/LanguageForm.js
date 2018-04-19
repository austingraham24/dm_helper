import React, {Component} from 'react';
import {Form, PageHeader, Panel, Clearfix, InputGroup, FormGroup, FormControl, ControlLabel, Row, Col, Checkbox, Button, Glyphicon} from "react-bootstrap";
import "./style.css";
import _ from "lodash";

class LanguageForm extends Component {
    constructor(props) {
        super(props);

        this.debouncedSubmit = _.debounce(this.submitChanges, 500);
        
        this.state={
            value: null
        };
    }

    componentDidUpdate(prevProps, prevState) {
        this.debouncedSubmit("update")
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
            return <Button bsStyle="default" onClick={this.buttonClick.bind(this)} name="addButton">Add</Button>
        }
    }

    render() {
        return (
            <Row>
                <Col xs={4} sm={3}>
                    <InputGroup>
                        <FormControl
                            type="text"
                            name = "language"
                            value={this.state.value}
                            placeholder="Common"
                            onChange={this.onChange.bind(this)}
                        />
                        <InputGroup.Button>
                            <Button bsStyle="danger">Delete</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </Col>
                <Col xs={6} sm={3}>
                    {this.getSubmitButton()}
                </Col>
            </Row>
        );
    }
}

export default LanguageForm;