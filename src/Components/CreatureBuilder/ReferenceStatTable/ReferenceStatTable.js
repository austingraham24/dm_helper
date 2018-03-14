import React from 'react';
import {Table} from 'react-bootstrap';

//props should include CR and crData
//"CR": String -> the selected CR
//crData: {} -> data object for the given CR} --> see CreatureStatChart.json in the Inf folder for the data object

const ReferenceStatTable = (props) => {
	console.log(props);
	let crData = props.crData;
	if (!crData) {
		return null;
	};

	return (
		<Table key="test" className={"example "+props.status} bordered>
  		<thead>
		    <tr>
		      <th>CR</th>
		      <th>Experience</th>
		      <th>Proficiency Bonus</th>
		      <th>Armor Class</th>
		      <th>Hit Points</th>
		      <th>Attack Bonus</th>
		      <th>Damage Per Round</th>
		      <th>Save DC</th>
		    </tr>
	  	</thead>
		  <tbody>
		    <tr>
		      <td>{props.CR}</td>
		      <td>{crData.xp}</td>
		      <td>{crData.proficiency}</td>
		      <td>{crData.ac}</td>
		      <td>{crData.hp}</td>
		      <td>{crData.attackBonus}</td>
		      <td>{crData.dpr}</td>
		      <td>{crData.saveDC}</td>
		    </tr>
		  </tbody>
	  </Table>
	);
}

export default ReferenceStatTable;