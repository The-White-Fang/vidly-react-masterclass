import React, { Component } from "react";

class ListGroup extends Component {
	static defaultProps = {
		textProp: "name",
		valueProp: "_id",
	};

	render() {
		const { items, valueProp, textProp, onItemSelect, selectedItem } = this.props;

		return (
			<ul className="list-group">
				{items.map((item) => (
					<li
						key={item[valueProp]}
						className={"list-group-item" + (selectedItem === item ? " active" : "")}
						onClick={() => onItemSelect(item)}
					>
						{item[textProp]}
					</li>
				))}
			</ul>
		);
	}
}

export default ListGroup;
