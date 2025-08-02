import { configureStore } from '@reduxjs/toolkit'
import  youtubeSlice  from '../features/youtube/youtubeSlice'

export default configureStore({
  reducer: {
    youtubeSlice: youtubeSlice
  }
})