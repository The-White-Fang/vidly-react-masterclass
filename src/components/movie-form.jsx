import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class MovieForm extends Form {
	state = {
		data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
		genres: [],
		errors: {},
	};

	schema = {
		_id: Joi.string(),
		title: Joi.string().required().label("Title"),
		genreId: Joi.string().required().label("Genre"),
		numberInStock: Joi.number().integer().min(0).required().label("Number In Stock"),
		dailyRentalRate: Joi.number().min(0).precision(1).required().label("Daily Rental Rate"),
	};

	componentDidMount = async () => {
		try {
			await this.populateGenres();
			await this.populateMovie();
		} catch (error) {
			toast.error(`${error}`);
		}
	};

	async populateGenres() {
		let genres = await getGenres();

		this.setState({ genres });
	}

	async populateMovie() {
		const { id } = this.props.match.params;
		if (id) {
			let movie = await getMovie(id);
			if (!Object.keys(movie).length) {
				return this.props.history.replace("/not-found");
			}

			let data = {
				_id: movie._id,
				title: movie.title,
				genreId: movie.genre._id,
				numberInStock: movie.numberInStock,
				dailyRentalRate: movie.dailyRentalRate,
			};

			this.setState({ data });
		}
	}

	async doSubmit() {
		const movie = { ...this.state.data };

		try {
			await saveMovie(movie);
		} catch (error) {
			return toast.error(`Update failed due to error ${error.response.status}`);
		}

		this.props.history.push("/movies");
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				{this.renderInput("title", "Title", { autoComplete: "off" })}
				{this.renderSelect("genreId", "Genres", this.state.genres)}
				{this.renderInput("numberInStock", "Number In Stock", {
					autoComplete: "off",
					type: "number",
					min: 0,
				})}
				{this.renderInput("dailyRentalRate", "Daily Rental Rate", {
					autoComplete: "off",
					type: "number",
					min: 0,
					step: 0.5,
				})}
				{this.renderSubmitBtn("Save")}
			</form>
		);
	}
}

export default MovieForm;
