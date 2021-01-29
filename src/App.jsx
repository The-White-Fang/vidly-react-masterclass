import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navbar";
import LoginForm from "./components/login-form";
import RegisterForm from "./components/register-form";
import Movies from "./components/movies";
import Customers from "./components/customers";
import MovieForm from "./components/movie-form";
import Rentals from "./components/rentals";
import NotFound from "./components/not-found";

import 'react-toastify/dist/ReactToastify.css'

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<ToastContainer />
				<header>
					<NavBar />
				</header>
				<main className="container p-2">
					<Switch>
						<Route path="/login" component={LoginForm} />
						<Route path="/register" component={RegisterForm} />
						<Route path="/movies/new" component={MovieForm}></Route>
						<Route path="/movies/:id" component={MovieForm}></Route>
						<Route path="/movies" component={Movies}></Route>
						<Route path="/customers" component={Customers}></Route>
						<Route path="/rentals" component={Rentals}></Route>
						<Route path="/not-found" component={NotFound}></Route>
						<Redirect from="/" exact to="/movies" />
						<Redirect to="/not-found" />
					</Switch>
				</main>
			</React.Fragment>
		);
	}
}

export default App;
