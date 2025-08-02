import { createSlice } from '@reduxjs/toolkit'

export const youtubeSlice = createSlice({
    name: 'youtube',
    initialState: {
        value: []
    },
    reducers: {
        setVideos: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const {setVideos} = youtubeSlice.actions
export default youtubeSlice.reducer