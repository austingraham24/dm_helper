import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import AnimateHeight from 'react-animate-height';
import TableTemplate from './TableTemplate.js';

//props should include CR and crData
//"CR": String -> the selected CR
//crData: {} -> data object for the given CR} --> see CreatureStatChart.json in the Inf folder for the data object

class ReferenceStatTable extends Component {
	constructor(props) {
		super(props);

		this.state = {
			crData: null,
			tableShowSize: "0",
			tableHeaders: ["CR", "Experience", "Proficiency Bonus", "Armor Class", "Hit Points", "Attack Bonus", "Damage Per Round", "Save DC"]
		};
	};

	componentWillReceiveProps(nextProps) {
		let nextCRData = nextProps.crData;
		if (!nextCRData || !nextProps.CR) {
			if(this.state.tableShowSize != "0"){
				this.setState({tableShowSize: "0"});
			}
		}
		else {
			if (this.state.tableShowSize === "0") {
				this.setState({tableShowSize: "auto"});
			}
			let dataArray = [nextProps.CR, nextCRData.xp, nextCRData.proficiency, nextCRData.ac, nextCRData.hp, nextCRData.attackBonus, nextCRData.dpr, nextCRData.saveDC]
			this.setState({crData: dataArray});
			console.log(this.state);
		}
	}

	render() {
		return (
			<AnimateHeight
				duration={ 300 }
				height={ this.state.tableShowSize }>
				<TableTemplate headers={this.state.tableHeaders} rows={[this.state.crData]} />
			</AnimateHeight>
		);
	}
}

export default ReferenceStatTable;