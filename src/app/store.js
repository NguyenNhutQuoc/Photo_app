import { configureStore } from "@reduxjs/toolkit";
import photoSlice from "../features/Photo/photoSlice";
import userSlice from "../features/userSlice";

const rootReducer = {
    photos: photoSlice.reducer,
    user: userSlice.reducer
}

const store = configureStore({
    reducer: rootReducer
})



export default store;