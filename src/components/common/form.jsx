import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
	state = {
		data: {},
		errors: {},
	};

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const error = this.validateProperty(input);

		errors[input.name] = error;

		const data = { ...this.state.data };
		data[input.name] = input.value;
		this.setState({ data, errors });
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const errors = this.validate();

		this.setState({ errors: errors || {} });

		this.doSubmit();
	};

	validate = () => {
		const options = { abortEarly: false };

		const results = Joi.validate(this.state.data, this.schema, options);

		if (!results.error) return null;

		const errors = {};
		for (let item of results.error.details) {
			errors[item.path[0]] = item.message;
		}

		return errors;
	};

	validateProperty = ({ value, name }) => {
		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };

		const { error } = Joi.validate(obj, schema);

		return error ? error.details[0].message : null;
	};

	renderSubmitBtn = (label) => (
		<button disabled={this.validate()} className="btn btn-primary">
			{label}
		</button>
	);

	renderInput = (name, label, options = {}) => (
		<Input
			name={name}
			label={label}
			value={this.state.data[name]}
			onChange={this.handleChange}
			error={this.state.errors[name]}
			{...options}
		/>
	);

	renderSelect = (name, label, data, dataLabel = "name", dataId = "_id") => (
		<Select
			data={data}
			label={label}
			name={name}
			dataLabel={dataLabel}
			dataId={dataId}
			value={this.state.data[name]}
			onChange={this.handleChange}
			error={this.state.errors[name]}
		/>
	);
}

export default Form;
