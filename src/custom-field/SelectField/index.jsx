import React from "react";
import PropTypes from "prop-types";
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";

function SelectField(props) {
	const handleChange = (event) => {
		form.setFieldValue(
			field.name,
			event.target.value,
		);
	};

	const { field, form, label, options } = props;

	const { errors, touched } = form;
	const showErrors =
		errors[field.name] && touched[field.name];

	// Demo: https://mui.com/components/selects/

	return (
		<FormControl fullWidth>
			<InputLabel
				id='demo-simple-select-label'
				sx={{
					mt: 0.5,
					mb: 0.5,
				}}>
				{label}
			</InputLabel>
			<Select
				labelId='demo-simple-select-label'
				id='demo-simple-select'
				sx={{
					mt: 0.5,
					mb: 0.5,
				}}
				{...field}
				label={label}
				error={showErrors}
				helpertext={
					showErrors && errors[field.name]
				}
				onChange={handleChange}>
				{options.map((option, index) => {
					return (
						<MenuItem
							key={index}
							value={option.name}>
							{option.name}
						</MenuItem>
					);
				})}
			</Select>
		</FormControl>
	);
}

SelectField.propTypes = {
	field: PropTypes.object.isRequired,
	form: PropTypes.object.isRequired,

	type: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	options: PropTypes.array,
};

SelectField.defaultProps = {
	type: "text",
	label: "",
	placeholder: "",
	options: [],
};

export default SelectField;
