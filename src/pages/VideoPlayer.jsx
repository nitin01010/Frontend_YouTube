import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { findByIdVideoPlay } from '../api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import VideoSideBar from '../components/VideoSideBar';
import VideoPlayerBtns from '../components/VideoPlayerBtns';
import VideoDescription from '../components/VideoDescription';
import VideoCommentsPage from '../components/VideoCommentsPage';
import IframVideoPlayer from '../components/IframVideoPlayer';

const VideoPlayer = () => {
  const queryClient = useQueryClient();
  const [showDescription, setShowDescription] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const fullId = `${id}${location.search}`;

  const {
    mutate,
    isLoading,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: (id) => findByIdVideoPlay({ id }),
    onSuccess: (data, variables) => {
      // Store in cache for optional later use
      queryClient.setQueryData(['video', variables], data);
    },
  });

  useEffect(() => {
    if (fullId) {
      mutate(fullId);
    }
  }, [fullId, mutate]);

  const handleRefetch = () => {
    mutate(fullId);
  };

  if (isLoading) {
    return <div className=' m-0 sm:ml-22 font-bold text-2xl uppercase text-center p-10'>Loading...</div>;
  }

  if (isError) {
    return <div className=' m-0 sm:ml-22 font-bold text-2xl uppercase text-center p-10'>Error: {error.message}</div>;
  }

  if (!data) {
    return <div className=' m-0 sm:ml-22 font-bold text-2xl uppercase text-center p-10'>No data yet</div>;
  }

  const {
    title,
    channelId,
    dislikes,
    likes,
    views,
    description,
    subscribers,
    uploadDate,
    comments,
    thumbnailUrl,
  } = data?.data;


  return (
    <div className=' ml-0 sm:ml-21.5  transition-all ease-linear flex gap-3'>
      <div className="w-full px-2  sm:px-6 md:px-1 transition-all ease-linear mt-1">
        <IframVideoPlayer />
        <TitlePage title={title} />
        <VideoPlayerBtns item={{ likes, dislikes, thumbnailUrl, channelId, subscribers, fullId }} fullId={fullId} />
        <VideoDescription item={{ showDescription, setShowDescription, views, description, uploadDate }} />
        <VideoCommentsPage item={comments} fullId={fullId} onCommentPosted={handleRefetch} />
      </div>
      <VideoSideBar />
    </div>
  );
};

export default VideoPlayer

const TitlePage = ({ title }) => <p className="text-xl font-semibold py-2 capitalize">
  {title}
</p>