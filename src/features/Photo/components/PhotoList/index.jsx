import React from "react";
import PropTypes from "prop-types";
import PhotoCard from "../PhotoCard";
import { Grid } from "@mui/material";

PhotoList.propTypes = {
	photoList: PropTypes.array,
	onPhotoEditClick: PropTypes.func,
	onPhotoRemoveClick: PropTypes.func,
};

PhotoList.defaultProps = {
	photoList: [],
	onPhotoEditClick: null,
	onPhotoRemoveClick: null,
};

function PhotoList(props) {
	const {
		photoList,
		onPhotoEditClick,
		onPhotoRemoveClick,
	} = props;

	return (
		<div style={{marginTop: '50px'}}>
			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 4, sm: 8, md: 12 }}>
				{photoList.map((photo, index) => {
					return (
						<Grid
							key={index}
							item
							xs={2}
							sm={4}
							md={4}>
							<PhotoCard
								photo={photo}
								onEditClick={onPhotoEditClick}
								onRemoveClick={onPhotoRemoveClick}
							/>
						</Grid>
					);
				})}
			</Grid>
		</div>
	);
}

export default PhotoList;
