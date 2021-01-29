import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
	state = {
		data: {
			username: "",
			password: "",
		},
		errors: {},
	};

	schema = {
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().label("Password"),
	};

	doSubmit = () => {
		console.log("Submitted");
	};

	render() {
		return (
			<div>
				<h1 className="mb-2 text-center">Login</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("username", "Username", { autoComplete: "off" })}
					{this.renderInput("password", "Password", {
						autoComplete: "off",
						type: "password",
					})}
					{this.renderSubmitBtn("Login")}
				</form>
			</div>
		);
	}
}

export default LoginForm;
