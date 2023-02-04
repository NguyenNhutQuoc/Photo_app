import "./App.css";
import React, {
	Suspense,
	useEffect,
	useState,
} from "react";
import productApi from "./api/productApi";
import {
	Route,
	Routes,
	useNavigate,
} from "react-router-dom";

import SignIn from "./components/Login";

import {
	useDispatch,
	useSelector,
} from "react-redux";
import {
	login,
	logout,
} from "./features/userSlice";
import {
	auth,
	onAuthStateChanged,
} from "./firebase";
import SignUp from "./components/Signup";
import { getAuth } from "firebase/auth";

const Photo = React.lazy(() =>
	import("./features/Photo"),
);

function App() {
	const navigate = useNavigate();
	const [productList, setProductList] = useState(
		[],
	);
	// check at page load if a user is authenticated
	const dispatch = useDispatch();
	const auth = getAuth();
	const user = auth.currentUser;
	useEffect(() => {
		const fetchProductList = async () => {
			try {
				const params = {
					_limit: 10,
				};
				const response = await productApi.getAll(
					params,
				);
				console.log(response);
				setProductList(response);
			} catch (error) {
				console.log("Failed to fetch product list: ", error);
			}
		}
		fetchProductList();
	}, [user]);
	useEffect(() => {
		onAuthStateChanged(auth, async (userAuth) => {
			if (userAuth) {
				// user is logged in, send the user's details to redux, store the current user in the state
				dispatch(
					login({
						email: userAuth.email,
						uid: userAuth.uid,
						displayName: userAuth.displayName,
						photoUrl: userAuth.photoURL,
					}),
				);
				const token = await userAuth.getIdToken();
				console.log(token);
				navigate("/photos");
			} else {
				dispatch(logout());
			}
		});
	}, [dispatch, navigate, user, auth]);
	return (
		<div>
			<Suspense fallback={<div> Loading...</div>}>
				<Routes>
					<Route
						path='photos/*'
						element={<Photo />}
					/>
					<Route
						index
						path='/'
						element={<SignIn />}
					/>
					<Route
						path='/sign-up'
						element={<SignUp />}
					/>
				</Routes>
			</Suspense>
		</div>
	);
}

export default App;
