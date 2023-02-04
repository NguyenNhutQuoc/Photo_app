import React, { useRef } from "react";
import Banner from "../../../../components/Banner";
import {
	Box,
	Button,
	Fade,
	Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import "./MainPage.scss";
import Backdrop from "@mui/material/Backdrop";
import {
	Link,
	useNavigate,
} from "react-router-dom";
import PhotoList from "../../components/PhotoList";
import { useDispatch, useSelector } from "react-redux";
import { removePhoto } from "../../photoSlice";
const MainPage = () => {
	const [open, setOpen] = React.useState(false);
	const photoRef = useRef(null);
	const handleOpen = (photo) => {
		console.log("Open: ", photo);
		photoRef.current = photo 
		setOpen(true);
	};
	const handleClose = () => setOpen(false);
	const photos = useSelector(
		(state) => state.photos,
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		boxShadow: 24,
		p: 4,
	};
	const handleEditClick = (photo) => {
		console.log("Edit: ", photo);
		navigate(`/photos/${photo.id}`);
	};
	const handleRemoveClick = () => {
		console.log("Remove: ", photoRef.current.id)
		dispatch(removePhoto(photoRef.current.id));
		handleClose()
	};
	return (
		<>
			<Banner title='Your awesome photos 🎉' />
			<div className='main'>
				<Link
					className='main__link'
					to='/photos/add'>
					<Button
						variant='outlined'
						color='success'>
						Add new photo
					</Button>
				</Link>

				<PhotoList
					photoList={photos}
					onPhotoEditClick={handleEditClick}
					onPhotoRemoveClick={handleOpen}
				/>
				<Modal
					aria-labelledby='transition-modal-title'
					aria-describedby='transition-modal-description'
					open={open}
					onClose={handleClose}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500,
					}}>
					<Fade in={open}>
						<Box sx={style}>
							<Typography
								id='transition-modal-title'
								variant='h6'
								color='error'
								component='h2'>
								Be Careful!!!
							</Typography>
							<Typography
								id='transition-modal-description'
								sx={{ mt: 2 }}>
								Are you sure you want to delete
								this photo?
							</Typography>
							<div style={{
								display: "flex",
								marginTop: "20px",
								justifyContent: "space-between",
								alignItems: "flex-end",
							}}>
								<Button
									variant='contained'
									color='error'
									onClick={handleRemoveClick}>
									Yes
								</Button>
								<Button
									variant='outlined'
									color='primary'
									onClick={handleClose}>
									No
								</Button>
							</div>
						</Box>
					</Fade>
				</Modal>
			</div>
		</>
	);
};

export default MainPage;
