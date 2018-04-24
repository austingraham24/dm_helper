import React, {Component} from 'react';
import {PageHeader, Panel, Clearfix, FormGroup, FormControl, ControlLabel, Row, Col, Button, Glyphicon} from "react-bootstrap";

class AbilitiesBlock extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = (this.props.onSubmit || null);

        let abilities = this.props.abilities || [];
        //ability object:
        //{name:"", desc:"", damage: null} -> no damage
        //name:"", desc:"", damage: [damageType]} -> does damage; affects offensive CR

        //damageType:
        //{type:"", avg: Int, dice: "1d12"}

        this.state = {
            abilityObjects: abilities
        };
    }

    getEditButton() {
        let style = "primary";
        let glyph = "wrench"
        if(this.state.isEditing) {
            style = "success";
            glyph = "floppy-save";
        }
        return (
            <Button 
                bsSize="xs" 
                bsStyle={style} 
                style={{"marginLeft":"5px"}}
                onClick={this.toggleFormVisible.bind(this)}
            >
                <Glyphicon glyph={glyph}/>
            </Button>
        );
    }

    toggleFormVisible(){
        let visible = !this.state.isEditing;
        if(!visible) {
            if(this.onSubmit) {
                this.onSubmit("abilities", this.state.abilityObjects);
            }
        }
        this.setState({...this.state, isEditing:visible});
    }

    render() {
        return (
            <Col xs={12} sm={7}>
                <FormGroup controlId="creatureMovement">
                    <ControlLabel>Abilities: {this.getEditButton()}</ControlLabel>
                    
                </FormGroup>
            </Col>
        );
    }
}

export default AbilitiesBlock;