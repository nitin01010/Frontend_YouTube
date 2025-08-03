import VideoCard from '../components/VideoCard';
import { youtubeAllvideos } from '../api/api';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setVideos } from '../features/youtube/youtubeSlice';

const Home = () => {
  const dispatch = useDispatch();
  const allVideos = useSelector((state) => state.youtubeSlice.value);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['youtubeAllvideos'],
    queryFn: youtubeAllvideos,
    enabled: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch({ cancelRefetch: false });
    }, 60000);
    if (data?.data) {
      dispatch(setVideos(data.data));
    }
    return () => clearInterval(interval);
  }, [data, dispatch, refetch]);

  if (isLoading) {
    return <p className=" m-0 p-4 sm:ml-22 font-bold">Loading...</p>;
  }

  if (isError) {
    return <p className=" m-0 p-4 sm:ml-22 font-bold">Error: {error?.message || 'Unknown error'}</p>;
  }

  return (
    <div className="m-auto ml-0 sm:ml-21 p-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {allVideos.map((item) => (
          <div key={item._id}>
            <VideoCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;