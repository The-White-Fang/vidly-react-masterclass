import React, { Component } from "react";
import TableHeader from "./table-header";
import TableBody from "./table-body";

class Table extends Component {
	render() {
		const {data, columns, sortby, onSort} = this.props

		return (
			<table className="table">
				<TableHeader columns={columns} sortby={sortby} onSort={onSort} />
				<TableBody columns={columns} data={data} />
			</table>
		);
	}
}

export default Table;
