import React, { Component } from "react";
import MoviesTable from "./movies-table";
import Pagination from "./common/pagination";
import ListGroup from "./common/list-group";
import { toast } from "react-toastify";

import paginate from "../utils/paginate";
import sort from "../utils/sort";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class Movies extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: [],
			genres: [],
			currentPage: 1,
			selectedGenre: null,
			searchTerm: "",
			pageSize: 4,
			sortby: { path: "title", inc: true },
		};
	}

	async componentDidMount() {
		try {
			let [movies, genres] = await Promise.all([getMovies(), getGenres()]);
			genres = [{_id: 'all', name: 'All Genres'}, ...genres]
			this.setState({
				movies,
				genres,
			});
		} catch (error) {
			console.log(error);
			toast.error(`${error}`);
		}
	}

	render() {
		const {
			movies: allMovies,
			pageSize,
			currentPage,
			genres,
			selectedGenre,
			sortby,
			searchTerm,
		} = this.state;

		if (!allMovies.length) {
			return <h4>There are no movies in database.</h4>;
		}

		let { totalCount, movies } = this.filterData();

		return (
			<div className="row">
				<div className="col-4">
					<ListGroup
						items={genres}
						onItemSelect={this.handleGenreFilter}
						selectedItem={selectedGenre}
						name="Genre"
					/>
				</div>
				<div className="col-8">
					<MoviesTable
						movies={movies}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
						sortby={sortby}
						searchTerm={searchTerm}
						onSearch={this.handleSearch}
					/>
					<Pagination
						itemsCount={totalCount}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}

	handleDelete = (movie) => {
		deleteMovie(movie._id);

		this.setState({
			movies: this.state.movies.filter((m) => m._id !== movie._id),
		});
	};

	handlePageChange = (pageNum) => {
		this.setState({
			currentPage: pageNum,
		});
	};

	handleGenreFilter = (genre) => {
		this.setState({
			selectedGenre: genre,
			currentPage: 1,
			searchTerm: "",
		});
	};

	handleSort = (sortby) => {
		this.setState({ sortby });
	};

	handleSearch = (query) => {
		this.setState({
			searchTerm: query,
			selectedGenre: null,
			currentPage: 1,
		});
	};

	filterData = () => {
		const {
			movies: allMovies,
			pageSize,
			currentPage,
			selectedGenre,
			sortby,
			searchTerm,
		} = this.state;

		let filtered =
			selectedGenre && selectedGenre._id !== "all"
				? allMovies.filter((movie) => selectedGenre._id === movie.genre._id)
				: allMovies;

		if (searchTerm) {
			filtered = filtered.filter((movie) => movie.title.match(RegExp(searchTerm, "i")));
		}

		let sorted = sort(filtered, sortby.path, sortby.inc);

		let movies = paginate(sorted, pageSize, currentPage);

		return { totalCount: filtered.length, movies };
	};
}

export default Movies;
