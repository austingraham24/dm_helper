import React from 'react';
import {Table} from 'react-bootstrap';

const TableTemplate = (props) => {

	let headers = () => {
		return props.headers.map((header) => {
			return <th key={header}>{header}</th>
		});
	}

	let rows = () => {
		let count = 0;
		console.log(props);
		return props.rows.map((row) => {
			return <tr>{fields(row)}</tr>
		});
	}

	let fields = (dataElements) => {
		console.log(dataElements);
		if (dataElements == null) {
			return <td></td>
		}
		return dataElements.map((data) => {
			return <td>{data}</td>
		});
	}

	return (
		<Table bordered>
  		<thead>
		    <tr>
		      {headers()}
		    </tr>
	  	</thead>
		  <tbody>
		    {rows()}
		  </tbody>
	  </Table>
	);
};
export default TableTemplate;