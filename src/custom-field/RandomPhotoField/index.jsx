import React from "react";
import PropTypes from "prop-types";
import { FormGroup } from "@mui/material";
import RandomPhoto from "../../components/RandomPhoto";

function RandomPhotoField(props) {
	const { field, form } = props;
    const { errors, touched } = form;
	const { name, value, onBlur } = field;
    const handleChangeUrlImage = (newUrlImage) => {
        form.setFieldValue(name, newUrlImage);
    }
    const showErrors = errors[name] && touched[name];
	return (
        <FormGroup className="random-photo-field">
            <RandomPhoto
                errorMessage={errors[name]}
                className = {showErrors ? "is-invalid" : ""}
                name={name}
                imageUrl={value}
                onImageUrlChange={handleChangeUrlImage}
                onRandomButtonBlur={onBlur}
            />
        </FormGroup>
    )
}

RandomPhotoField.propTypes = {
	form: PropTypes.object.isRequired,
	field: PropTypes.object.isRequired,

	label: PropTypes.string,
};

RandomPhotoField.defaultProps = {
	label: "",
};

export default RandomPhotoField;
