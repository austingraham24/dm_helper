import React, {Component, Fragment} from 'react';
import {PageHeader, Panel, Clearfix, FormGroup, FormControl, ControlLabel, Row, Col, Button, Glyphicon} from "react-bootstrap";
import PanelButtonToggle from "../../PanelButtonToggle/PanelButtonToggle.js";
import AbilityForm from "./AbilityForm.js";
import AbilityItem from "./AbilityItem.js";
import "./style.css";

class AbilitiesBlock extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = (this.props.onSubmit || null);
        this.defaultLabel = "Edit";
        this.editingLabel = "Save";
        this.defaultButtonStyle = "primary";
        this.editingButtonStyle = "success";
        this.defaultGlyph = "wrench";
        this.editingGlyph = "floppy-save"

        let abilities = this.props.abilities || [
            {name:"Sample1", desc:"This is a sample description"},
            {name:"Sample2", desc:"This is a sample2 description"},
            {name:"Sample3", desc:"This is a sample3 description"}
        ];
        //ability object:
        //{name:"", desc:"", damage: null} -> no damage
        //name:"", desc:"", damage: [damageType]} -> does damage; affects offensive CR

        //damageType:
        //{type:"", avg: Int, dice: "1d12"}

        this.state = {
            abilityObjects: abilities,
            isEditing: false
        };
    }

    getEditButton() {
        let style = this.defaultButtonStyle;
        let glyph = this.defaultGlyph
        let label = this.defaultLabel;
        if(this.state.isEditing) {
            style = this.editingButtonStyle;
            glyph = this.editingGlyph;
            label = this.editingLabel;
        }
        return (
            <Button 
                bsSize="xs" 
                bsStyle={style} 
                onClick={this.toggleFormVisible.bind(this)}
            >
                <Glyphicon glyph={glyph}/>{" " + label}
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

    layoutPanelBody() {
        if (this.state.isEditing) {
            return this.state.abilityObjects.map((ability) => {
                return (
                    <AbilityForm key={ability.name} name={ability.name} desc={ability.desc}/>
                );
            });
        }
        else {
            return this.state.abilityObjects.map((ability) => {
                return <AbilityItem key={ability.name} name={ability.name} desc={ability.desc}/>
            });
        }
    }

    render() {
        return (
            <Col xs={12} sm={6}>
	        	<FormGroup controlId="abilities">
					<PanelButtonToggle title={"Traits and Abilities"} defaultOpened >
                        {this.getEditButton()}
                        <div style={{marginTop:"5px"}}>
                            {this.layoutPanelBody()}
                        </div>
                    </PanelButtonToggle>  
                </FormGroup>
            </Col>
        );
    }
}

export default AbilitiesBlock;