import React, {Component} from 'react';
import "./style.css";
import {Panel, Glyphicon, Button} from "react-bootstrap";
import PropTypes from 'prop-types';

/*
Notes to self:
- consider changing code later to use a reverse of the toolbar prop for expected a more layout. Get user feedback on the expected behavior.
*/

class UtilityPanel extends Component {
	constructor(props) {
		super(props);

		let panelOpen = (this.props.defaultOpened || !this.props.collapsible)? true : false;

		this.state = {
			panelOpen: panelOpen,
			panelGlyph: this.props.defaultOpened? "minus" : "plus"
		};
	}

	togglePanel() {
		let open = !this.state.panelOpen;
		let glyph = open ? "minus" : "plus";
		let title = this.props.title;
		if (this.props.closedTitle || this.props.closedTitle === "") {
			if (!open) {
				title = this.props.closedTitle;
			}
		}
		this.setState({panelOpen: open, panelGlyph: glyph});
	}

	getTitle() {
		let open = this.state.panelOpen;
		let title = this.props.title;
		if (this.props.closedTitle || this.props.closedTitle === "") {
			if (!open) {
				title = this.props.closedTitle;
			}
		}
		return <b>{title}</b>;
	}

	getToolbar() {
		//if the panel is closed or the toolbar prop is not an array/is empty
		if(!this.state.panelOpen || (!Array.isArray(this.props.toolbar) || !this.props.toolbar.length)){
			return
		}
		return this.props.toolbar.map((element, index) => {
			return <span className="panel-toggle" key={index}>{element}</span>;
		});
	}

	getDeleteButton() {
		if(!this.props.deletable) {
			return
		}
		return <Button className="panel-toggle" bsSize="xsmall" bsStyle="danger"><Glyphicon glyph="remove" /></Button>
	}

	getToggleButton() {
		if(!this.props.collapsible && !this.props.defaultOpened) {
			return
		}
		return <Panel.Toggle componentClass="a" className="panel-toggle btn btn-default btn-xs"><Glyphicon glyph={this.state.panelGlyph} /></Panel.Toggle>
	}

	setUpPanelHeading() {
		return (
			<Panel.Heading>
				{this.getTitle()}
				{this.getDeleteButton()}
				{this.getToggleButton()}
				{this.getToolbar()}
			</Panel.Heading>
		);
	}

	render() {
		return (
			<Panel bsStyle={this.props.bsStyle || "default"} style={this.props.style} expanded={this.state.panelOpen} onToggle={this.togglePanel.bind(this)}>
				{this.setUpPanelHeading()}
				<Panel.Body collapsible>
					{this.props.children}
				</Panel.Body>
			</Panel>
		);
	}

}

UtilityPanel.propTypes = {
	/*REQUIRED*/

	/*Optional*/
	bsStyle: PropTypes.string, //bootstrap styling *see react-bootstrap documentation*
	collapsible: PropTypes.bool, //can the panel collapse
	closedTitle: PropTypes.string, //a unique title to show when the panel is closed
	defaultOpened: PropTypes.bool, //should the panel be open by default (if not provided the default is false)
	deletable: PropTypes.bool, //should the panel show a delete button (red button with "X")
	deleteFunction: PropTypes.func, /*function to call when the delete button is called; not providing one to a deletable panel will do nothing when clicking delete*/
	style: PropTypes.object, //optional styling to apply to the form
	title: PropTypes.string, //what should be the label of the panel; either a string or a react element
	toolbar: PropTypes.arrayOf(PropTypes.element) //additional buttons/elements to be displayed next to the toggle that act as a toolbar
}

/*
	a special note about the toolbar: since the elements float right, the last item in the array will be on the leftmost side and
	therefore the first item in the toolbar
*/

export default UtilityPanel;