import React from 'react';
import {Table} from 'react-bootstrap';

const TableTemplate = (props) => {
	let count = 0;
	let getKey = () => {
		count += 1;
		return count;
	}

	let headers = () => {
		return props.headers.map((header) => {
			return <th key={header}>{header}</th>
		});
	}

	let rows = () => {
		return props.rows.map((row) => {
			return <tr key={getKey()}>{fields(row)}</tr>
		});
	}

	let fields = (dataElements) => {
		if (dataElements == null) {
			return <td></td>
		}
		return dataElements.map((data) => {
			return <td key={getKey()}>{data}</td>
		});
	}

	return (
		<Table bordered responsive className="templateTable">
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