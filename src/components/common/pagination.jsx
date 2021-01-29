import React, { Component } from "react";
import PropTypes from "prop-types";

class Pagination extends Component {
	static propTypes = {
		itemsCount: PropTypes.number.isRequired,
		pageSize: PropTypes.number.isRequired,
		currentPage: PropTypes.number.isRequired,
		onPageChange: PropTypes.func.isRequired,
	};

	render() {
		const { itemsCount, pageSize, currentPage, onPageChange } = this.props,
			pageCount = Math.ceil(itemsCount / pageSize);

		if (pageCount < 2) return null;

		const pages = [];
		for (let i = 0; i < pageCount; i++) pages.push(i + 1);

		return (
			<nav className="text-center" aria-label="Page navigation example">
				<ul className="pagination">
					{pages.map((pNum) => (
						<li
							key={pNum}
							className={"page-item" + (pNum === currentPage ? " active" : "")}
						>
							<button onClick={() => onPageChange(pNum)} className="page-link">
								{pNum}
							</button>
						</li>
					))}
				</ul>
			</nav>
		);
	}
}

export default Pagination;
