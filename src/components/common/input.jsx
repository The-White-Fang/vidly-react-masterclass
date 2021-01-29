import React from "react";

const Input = ({ name, label, error, type, ...rest }) => {

	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input name={name} type={type||'text'} id={name} className="form-control" {...rest} />
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

export default Input;
