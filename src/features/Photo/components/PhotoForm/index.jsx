import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";

import Container from "@mui/material/Container";
import {
	createTheme,
	ThemeProvider,
} from "@mui/material/styles";

import * as Yup from "yup";

import { FastField, Form, Formik } from "formik";
import InputField from "../../../../custom-field/InputField";
import CATEGORY_PHOTO from "../../../../constants";

import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import SelectField from "../../../../custom-field/SelectField";
import RandomPhotoField from "../../../../custom-field/RandomPhotoField";
import { FormGroup } from "@mui/material";
import { addPhoto, updatePhoto } from "../../photoSlice";
import { useDispatch } from "react-redux";	
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function PhotoForm({ initialValues }) {
	const dispatch = useDispatch();
	const history = useNavigate();
	console.log("initialValues", initialValues);
	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 0,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					<Box
						component='div'
						sx={{
							mt: 1,
							width: {
								sm: "100%",
								md: "100%",
							},
						}}>
						<Formik
							initialValues={ initialValues || {
								title: "",
								description: "",
								category: "",
								photo: "",
							}}
							validationSchema={Yup.object().shape(
								{
									title: Yup.string().required(
										"Please enter title",
									),
									description:
										Yup.string().required(
											"Please enter description",
										),
									category: Yup.string().required(
										"Please enter category",
									),
									photo: Yup.string().required(
										"Please Random a photo",
									),
								},
							)}
							onSubmit={(values) => {
								return new Promise(
									(resolve, reject) => {
										setTimeout(() => {
											const action = initialValues ? updatePhoto(values) : addPhoto(values);
											dispatch(action);
											history("/photos");
											resolve(true);
										}, 2000);
									},
								);
							}}>
							{(formikProps) => {
								const {
									values,
									errors,
									touched,
									isSubmitting,
								} = formikProps;
								console.log({
									values,
									errors,
									touched,
									isSubmitting,
								});
								return (
									<Form>
										<FastField
											name='title'
											component={InputField}
											label='Title'
											type='text'
											placeholder='Enter title'
										/>
										<FastField
											name='description'
											component={InputField}
											label='Description'
											type='text'
											placeholder='Enter description'
										/>
										<FastField
											name='category'
											component={SelectField}
											label='Category'
											placeholder='What is your photo category?'
											options={CATEGORY_PHOTO}
											type='text'
										/>
										<FastField
											name='photo'
											component={RandomPhotoField}
											label='Random Photo'
										/>
										<FormGroup>
											{isSubmitting ? (
												<LoadingButton
													loading
													loadingPosition='start'
													startIcon={<SaveIcon />}
													variant='outlined'>
													Save
												</LoadingButton>
											) : (
												<Button
													type='submit'
													fullWidth
													variant='contained'
													sx={{ mt: 3, mb: 2 }}>
													{initialValues ? "Update" : "Add"}
												</Button>
											)}
										</FormGroup>
									</Form>
								);
							}}
						</Formik>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
