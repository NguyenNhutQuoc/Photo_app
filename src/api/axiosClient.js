import axios from "axios";
import { getAuth } from "firebase/auth";
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
	baseURL:
		"https://js-post-api.herokuapp.com/api",
	headers: {
		"content-type": "application/json",
	},
});

const getFirebaseToken = async () => {
	const currentUser = getAuth().currentUser;
	if (currentUser)
		return currentUser.getIdToken();

	// Not logged in
	const hasRememberedAccount =
		localStorage.getItem(
			"profile"	,
		);
	if (!hasRememberedAccount) return null;

	// Logged in but current user is not fetched --> wait (10s)
	return new Promise((resolve, reject) => {
		const waitTimer = setTimeout(() => {
			reject(null);
			console.log("Reject timeout");
		}, 10000);

		const unregisterAuthObserver = getAuth()
			.onAuthStateChanged(async (user) => {
				if (!user) {
					reject(null);
				}

				const token = await user.getIdToken();
				console.log(
					"[AXIOS] Logged in user token: ",
					token,
				);
				resolve(token);

				unregisterAuthObserver();
				clearTimeout(waitTimer);
			});
	});
};

axiosClient.interceptors.request.use(
	async (config) => {
		// // Handle token here ...
		// const auth = getAuth();
		// const user = auth.currentUser;
		// if (user) {
		// 	const token = await user.getIdToken();
		// 	config.headers.Authorization = `Bearer ${token}`;
		// }

		const token = await getFirebaseToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
);

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) {
			return response.data;
		}

		return response;
	},
	(error) => {
		// Handle errors
		throw error;
	},
);

export default axiosClient;
