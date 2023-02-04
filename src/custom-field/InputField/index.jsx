import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

function InputField(props) {
	const {
		field,
		form,
        label,
		type,
		placeholder,
		disabled
	} = props;
	const { errors, touched } = form;
	const showErrors = errors[field.name] && touched[field.name];

	// create a function to sum the total price of the product
	return (
		<TextField
			error={
				showErrors
			}
			helperText = {
				showErrors && errors[field.name]
			}
            className="input-field"
			sx={{
                mt: 0.5,
                mb: 0.5,
            }}
			required
			fullWidth
            id={field.name}
            {...field}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            label={label}
		/>
	);
}

InputField.propTypes = {
	field: PropTypes.object.isRequired,
	form: PropTypes.object.isRequired,

	type: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
};

InputField.defaultProps = {
	type: "text",
	label: "",
	placeholder: "",
	disabled: false,
};

export default InputField;
