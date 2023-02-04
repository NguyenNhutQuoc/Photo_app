import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import './RandomPhoto.scss'
function RandomPhoto(props) {
	const {
		errorMessage,
		className,
		imageUrl,
		onImageUrlChange,
		onRandomButtonBlur,
        name
	} = props;
	return (
		<div className='random-photo'>
			<div className='random-photo__button'>
				<Button
                    sx={{
                        mt: 0.5,
                        mb: 2,
                    }}
					variant='outlined'
					color='success'
                    id={name}
					onBlur={onRandomButtonBlur}
					onClick={async () => {
						const randomId = Math.trunc(
							Math.random() * 2000,
						);
						const response = await fetch(
							`https://picsum.photos/id/${randomId}/300/300`,
						);
						const imageUrl = response.url;
						onImageUrlChange(imageUrl);
					}}>
					Random a photo
				</Button>
			</div>
			<div className='random-photo__photo'>
				{imageUrl && ( 
					<img
						src={imageUrl}
						alt='Ooops... not found. Please click random again!'
					/>
				)}
				{
					className && (
						<div className="invalid-feedback">
							{errorMessage}
						</div>
					)
				}
			</div>
		</div>
	);
}

RandomPhoto.propTypes = {
	name: PropTypes.string,
	imageUrl: PropTypes.string,
	onImageUrlChange: PropTypes.func,
	onRandomButtonBlur: PropTypes.func,
};

RandomPhoto.defaultProps = {
	name: "",
	imageUrl: "",
	onImageUrlChange: null,
	onRandomButtonBlur: null,
};

export default RandomPhoto;
