import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import SearchBox from './common/search-box';

// movies: [Object]
// onDelete: function

class MoviesTable extends Component {
	columns = [
		{
			path: "title",
			name: "Title",
			content: (movie) => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>,
		},
		{ path: "genre.name", name: "Genre" },
		{ path: "numberInStock", name: "Stock" },
		{ path: "dailyRentalRate", name: "Rate" },
		{
			key: "action",
			name: "Action",
			content: (movie) => (
				<button
					className="btn btn-sm btn-danger"
					onClick={() => this.props.onDelete(movie)}
				>
					Delete
				</button>
			),
		},
	];

	render() {
		const { movies, sortby, searchTerm, onSort, onSearch } = this.props;

		return (
			<React.Fragment>
				<Link className="btn btn-primary mb-3" to="/movies/new">New</Link>
				<h4>Showing {movies.length} movies in database</h4>
				<SearchBox value={searchTerm} onSearch={onSearch} />
				<Table data={movies} columns={this.columns} sortby={sortby} onSort={onSort} />
			</React.Fragment>
		);
	}
}

export default MoviesTable;
