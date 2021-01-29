import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
	state = {
		data: {
			username: "",
			password: "",
			name: "",
		},
		errors: {},
	};

	schema = {
		username: Joi.string().email().required().label("Username"),
		password: Joi.string().min(5).required().label("Password"),
		name: Joi.string().required().label("Name"),
	};

	doSubmit = () => {
		console.log("Submitted");
	};

	render() {
		return (
			<div>
				<h1 className="mb-2 text-center">Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("username", "Username", { autoComplete: "off" })}
					{this.renderInput("password", "Password", {
						autoComplete: "off",
						type: "password",
					})}
					{this.renderInput("name", "Name", { autoComplete: "off" })}
					{this.renderSubmitBtn("Login")}
				</form>
			</div>
		);
	}
}

export default RegisterForm;
