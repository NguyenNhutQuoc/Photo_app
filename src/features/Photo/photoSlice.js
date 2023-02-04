import { createSlice } from "@reduxjs/toolkit";

const photoSlice = createSlice({
    name: "photo",
    initialState: [
        {
            id: 1,
            title: "Ember Hamster",
            category: 'Nature',
            description: "Ember Hamster is cute",
            photo: "https://source.unsplash.com/2ShvY8Lf6l0/800x600"
        },
        {
            id: 2,
            title: "Samoyed Puppy",
            category: 'Nature',
            description: "Samoyed Puppy is cute",
            photo: "https://source.unsplash.com/Dm-qxdynoEc/800x600"
        },
        {
            id: 3,
            title: "Cute Kitten",
            category: 'Nature',
            description: "Cute Kitten is cute",
            photo: "https://source.unsplash.com/qGQNmBE7mYw/800x600"
        },
        {
            id: 4,
            title: "Pug Smile",
            category: 'Nature',
            description: "Pug Smile is cute",
            photo: "https://source.unsplash.com/iecJiKe_RNg/800x600"
        },
    ],
    reducers: {
        addPhoto: (state, action) => {
            state.push(action.payload);
        },
        removePhoto: (state, action) => {
            console.log("action.payload.id: ", action.payload)
            state = state.filter(photo => photo.id !== action.payload);
            return state
        },
        updatePhoto: (state, action) => {
            const photoIndex = state.findIndex(photo => photo.id === action.payload.id);
            if (photoIndex >= 0) {
                state[photoIndex] = action.payload;
            }
        },
        getPhoto: (state, action) => {
            
        }

    }
})

export const { addPhoto, removePhoto, updatePhoto, getPhoto } = photoSlice.actions;
export default photoSlice;