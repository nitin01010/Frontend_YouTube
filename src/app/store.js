import { configureStore } from '@reduxjs/toolkit'
import  youtubeSlice  from '../features/youtube/youtubeSlice'
import  userSlice  from '../features/youtube/userSlice'

export default configureStore({
  reducer: {
    youtubeSlice: youtubeSlice,
    user: userSlice
  }
})