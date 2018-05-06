import React, {Component} from 'react';
import "./style.css";
import {Panel, Glyphicon, Button} from "react-bootstrap";
import PropTypes from 'prop-types';

/*
Notes to self:
- consider changing code later to use a reverse of the toolbar prop for expected a more layout. Get user feedback on the expected behavior.
*/

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

	setUpToolbar() {
		if(!Array.isArray(this.props.toolbar) || !this.props.toolbar.length){
			return
		}

		if(!this.state.panelOpen) {
			return
		}

		return this.props.toolbar.map((element) => {
			return <span className="panel-toggle">{element}</span>;
		});
	}

	render() {
		return (
			<Panel style={this.props.style} expanded={this.state.panelOpen} onToggle={this.togglePanel.bind(this)}>
				<Panel.Heading>
					{this.getTitle.bind(this)()}
					<Panel.Toggle componentClass="a" className="panel-toggle btn btn-default btn-xs"><Glyphicon glyph={this.state.panelGlyph} /></Panel.Toggle>
					{this.setUpToolbar()}
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
	defaultOpened: PropTypes.bool, //should the panel be open by default (if not provided the default is false)
	toolbar: PropTypes.arrayOf(PropTypes.element) //additional buttons/elements to be displayed next to the toggle that act as a toolbar
	/*
	a special note about the toolbar: since the elements float right, the last item in the array will be on the leftmost side and
	therefore the first item in the toolbar
	*/
}

export default PanelButtonToggle;