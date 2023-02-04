import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
	auth,
	signInWithEmailAndPassword,
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

export default function SignIn() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(
			event.currentTarget,
		);
		const email = data.get("email");
		const password = data.get("password");

		// Sign in an existing user with Firebase
		signInWithEmailAndPassword(
			auth,
			email,
			password,
		)
			// returns  an auth object after a successful authentication
			// userAuth.user contains all our user details
			.then((userAuth) => {
				// store the user's information in the redux state
				dispatch(
					login({
						email: userAuth.user.email,
						uid: userAuth.user.uid,
						displayName:
							userAuth.user.displayName,
						photoUrl: userAuth.user.photoURL,
					}),
				);
				navigate("/photos");
			})
			// display the error if any
			.catch((err) => {
				alert(err);
			});

		// navigate("/photos");
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
						Sign in
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
						<FormControlLabel
							control={
								<Checkbox
									value='remember'
									color='primary'
								/>
							}
							label='Remember me'
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href='#' variant='body2'>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link
									href='/sign-up'
									variant='body2'>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
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
				<Box sx={{ mt: 8, mb: 8 }}>
					<Typography
						variant='body2'
						color='text.secondary'
						align='center'>
						Or Login with:
					</Typography>
					{/* <SignInScreen /> */}
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}
