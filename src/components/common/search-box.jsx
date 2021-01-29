import React, { Component } from "react";

class SearchBox extends Component {
	render() {
		return (
			<input
				type="text"
				className="form-control w-100 mb-3"
				placeholder="Search"
				value={this.props.value}
				onChange={this.handleChange}
			/>
		);
	}

	handleChange = (event) => {
		let query = event.currentTarget.value;

		this.props.onSearch(query);
	}
}

export default SearchBox;
