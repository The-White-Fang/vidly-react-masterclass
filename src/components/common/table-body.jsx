import React, { Component } from "react";
import { getVal } from "../../utils/functions";

// data: [Object]
// columns: [Object]

class TableBody extends Component {
	render() {
		const { data, columns } = this.props,
			{ cellKey, renderCell} = this;

		return (
			<tbody>
				{data.map((item) => (
					<tr key={item._id}>
						{columns.map((column) => (
							<td key={cellKey(item, column)}>{renderCell(item, column)}</td>
						))}
					</tr>
				))}
			</tbody>
		);
	}

	renderCell(item, column) {
		if (column.content) return column.content(item);
		return getVal(item, column.path);
	}

	cellKey = (item, column) => item._id + (column.path || column.key);
}

export default TableBody;
