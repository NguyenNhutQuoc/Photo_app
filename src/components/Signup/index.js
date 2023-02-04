import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
	auth,
	createUserWithEmailAndPassword,
	updateProfile,
} from "../../firebase";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";

import {
	createTheme,
	ThemeProvider,
} from "@mui/material/styles";

import { useNavigate } from "react-router-dom";

function Copyright(props) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}>
			{"Copyright © "}
			<Link
				color='inherit'
				href='https://mui.com/'>
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}
const theme = createTheme();

export default function SignUp() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(
			event.currentTarget,
		);
		const email = data.get("email");
		const password = data.get("password");
		const displayName = data.get("name");
		const photoUrl = data.get("photoUrl");

        console.log(email, password, displayName, photoUrl)
		// Create a new user with Firebase
		createUserWithEmailAndPassword(
			auth,
			email,
			password,
		)
			.then((userAuth) => {
				// Update the newly created user with a display name and a picture
				updateProfile(userAuth.user, {
					displayName: displayName,
					photoURL: photoUrl,
				})
					.then(
						// Dispatch the user information for persistence in the redux state
						dispatch(
							login({
								email: userAuth.user.email,
								uid: userAuth.user.uid,
								displayName: displayName,
								photoUrl: photoUrl,
							}),
						),
                        navigate("/photos"),
					)
					.catch((error) => {
						console.log("user not updated");
					});
			})
			.catch((err) => {
				alert(err);
			});
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					<Avatar
						sx={{
							m: 1,
							bgcolor: "secondary.main",
						}}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign Up
					</Typography>
					<Box
						component='form'
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							autoFocus
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							id='name'
							label='Name'
							name='name'
							autoComplete='name'
							autoFocus
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							id='photoUrl'
							label='Picture URL'
							name='photoUrl'
							autoComplete='photoUrl'
							autoFocus
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}>
							Sign Up
						</Button>
					</Box>
				</Box>
				<Box sx={{ mt: 8 }}>
					<Typography
						variant='body2'
						color='text.secondary'
						align='center'>
						{"Made with ❤️ by "}
						<Link
							color='inherit'
							href='https://material-ui.com/'>
							Material-UI
						</Link>
						{" team."}
					</Typography>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}
