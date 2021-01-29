import React from "react";

const Select = ({ name, label, data, dataLabel, dataId, value, error, onChange }) => {
	return (
		<div className="mb-3">
			<div className="input-group">
				<div className="input-group-prepend">
					<label className="input-group-text" htmlFor={name}>
						{label}
					</label>
				</div>
				<select
					className="custom-select"
					id={name}
					name={name}
					value={value}
					onChange={onChange}
				>
					<option value="">Choose...</option>
					{data.map((item) => (
						<option key={item[dataId]} value={item[dataId]}>
							{item[dataLabel]}
						</option>
					))}
				</select>
			</div>
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

export default Select;
