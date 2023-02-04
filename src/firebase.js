import { initializeApp } from "firebase/app";
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";

console.log(process.env.PHOTO_REACT_APP_API_FIREBASE_KEY);
const firebaseConfig = {
	apiKey:
    "AIzaSyA9FitVn8wfyNrfMGoQMQdLZIFExqLbGJA",
	authDomain:
		'engaged-droplet-348417.firebaseapp.com',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export {
	createUserWithEmailAndPassword,
    updateProfile,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
};
