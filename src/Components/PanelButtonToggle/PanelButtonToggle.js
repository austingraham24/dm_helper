import React, {Component} from 'react';
import "./style.css";
import {Panel, Glyphicon} from "react-bootstrap";
import PropTypes from 'prop-types';

class PanelButtonToggle extends Component {
	constructor(props) {
		super(props);
		let defaultOpened = this.props.defaultOpened || false;
		let startingGlyph = defaultOpened? "minus" : "plus";
		let title = this.props.title;
		if (this.props.closedTitle && !defaultOpened) {
			title = this.props.closedTitle;
		}

		this.state = {
			panelOpen: defaultOpened,
			panelGlyph: startingGlyph
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
		return title;
	}

	render() {
		return (
			<Panel style={this.props.style} expanded={this.state.panelOpen} onToggle={this.togglePanel.bind(this)}>
				<Panel.Heading>
					{this.getTitle.bind(this)()}
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
	style: PropTypes.object, //optional styling to apply to the form
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	  ]), //what should be the label of the panel; either a string or a react element
	defaultOpened: PropTypes.bool //should the panel be open by default (if not provided the default is false)
}

export default PanelButtonToggle;