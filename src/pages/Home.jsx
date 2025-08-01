import VideoCard from '../components/VideoCard'
import { youtubeAllvideos } from '../api/api';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['youtubeAllvideos'],
    queryFn: youtubeAllvideos
  });
  if (isLoading) return <p className=' ml-22 font-bold'><b>Loading</b></p>
  if (isError) return <p className=' ml-22 font-bold'><b>{isError}</b></p>
  if (error) return <p className=' ml-22 font-bold'><b>{error}</b></p>

  return (
    <div className=' m-auto ml-21 p-1 '>
      <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-5 '>
        {
          data?.data.map((item) => {
            return (
              <div key={item._id}>
                <VideoCard data={item} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home
