import React, {Component} from 'react';
import "./style.css";
import {Panel, Glyphicon} from "react-bootstrap";
import PropTypes from 'prop-types';

class PanelButtonToggle extends Component {
	constructor(props) {
		super(props);
		let defaultOpened = this.props.defaultOpened || false;
		let startingGlyph = defaultOpened? "minus" : "plus";

		this.state = {
			panelOpen: defaultOpened,
			panelGlyph: startingGlyph
		};
	}

	togglePanel() {
		let open = !this.state.panelOpen;
		let glyph = open ? "minus" : "plus";
		this.setState({panelOpen: open, panelGlyph: glyph});
	}

	render() {
		return (
			<Panel expanded={this.state.panelOpen} onToggle={this.togglePanel.bind(this)}>
				<Panel.Heading>
					{this.props.title}
					<Panel.Toggle componentClass="a" className="panel-toggle btn btn-default btn-xs"><Glyphicon glyph={this.state.panelGlyph} /></Panel.Toggle>
				</Panel.Heading>
				<Panel.Body collapsible>
					{this.props.children}
				</Panel.Body>
			</Panel>
		);
	}

}

PanelButtonToggle.propTypes = {
	/*REQUIRED*/

	/*Optional*/
	title: PropTypes.string, //the string for the title of the the panel
	defaultOpened: PropTypes.bool //should the panel be open by default (if not provided the default is false)
}

export default PanelButtonToggle;