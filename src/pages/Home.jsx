import React from 'react'
import VideoCard from '../components/VideoCard'

const Home = () => {
  return (
    <div className=' m-auto ml-21 p-1 '>
      <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-5'>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 10].map((item) => {
            return <VideoCard />
          })
        }
      </div>

    </div>
  )
}

export default Home
