import React, { Component } from "react";

// columns: [Object]
// onSort: function

class TableHeader extends Component {
	render() {
		const { columns } = this.props;
		return (
			<thead>
				<tr>
					{columns.map((item) => (
						<th
							className="clickable"
							itemScope="col"
							key={item.path || item.key}
							onClick={() => this.onSort(item.path)}
						>
							{item.name}
						</th>
					))}
				</tr>
			</thead>
		);
	}

	onSort = (path) => {
		let sortby = { path },
			{ sortby: prevSort, onSort } = this.props;
		if (path === prevSort.path) {
			sortby.inc = !prevSort.inc;
		} else {
			sortby.inc = true;
		}

		onSort(sortby);
	};
}

export default TableHeader;
