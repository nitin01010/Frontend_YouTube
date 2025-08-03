import { ArrowDownToLine, EllipsisVertical, Forward, Pen, ThumbsDown, ThumbsUp, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { createComments, DeleteComments, findByIdVideoPlay, handleLikeVideo, UpdateComments } from '../api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

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
        <VideoPage id={id} />
        <TitlePage title={title} />
        <ButtonsPages item={{ likes, dislikes, thumbnailUrl, channelId, subscribers, fullId }} fullId={fullId} />
        <DescriptionPage item={{ showDescription, setShowDescription, views, description, uploadDate }} />
        <CommentPage item={comments} fullId={fullId} onCommentPosted={handleRefetch} />
      </div>
      <div className='hidden transition-all ease-linear lg:block rounded-lg bg-[#5757576c] p-1 w-[500px]' />
    </div>
  );
};

export default VideoPlayer

const VideoPage = ({ id }) => {
  return (
    <div className="relative w-full  h-[400px] sm:h-0 pb-[56.25%] rounded-md overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=0`}
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  )
}

const TitlePage = ({ title }) => <p className="text-xl font-semibold py-2 capitalize">
  {title}
</p>

const ButtonsPages = (props) => {
  const { thumbnailUrl, channelId, subscribers, dislikes } = props?.item;
  const initialLikes = props?.item?.likes || 0;
  const videoId = props.fullId;

  const user = useSelector((state) => state.user.value);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(
    user?.userId?.likedVideos?.includes(videoId) ?? false
  );

  const { mutate } = useMutation({
    mutationFn: ({ userId, videoId }) => handleLikeVideo({ userId, videoId }),
    onSuccess: (res) => {
      toast(res.message);
      if (res.message === "Video liked successfully") {
        setLikesCount((prev) => prev + 1);
        setIsLiked(true);
      } else if (res.message === "Video unliked successfully") {
        setLikesCount((prev) => Math.max(0, prev - 1));
        setIsLiked(false);
      }
    },
    onError: (err) => {
      const message = err?.response?.data?.message || 'Something went wrong.';
      toast(message);
    },
  });

  const handleLikeEvent = () => {
    mutate({
      userId: user?.userId?._id,
      videoId,
    });
  };


  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-2 gap-4 w-full">
      {/* Channel Info and Subscribe Button */}
      <div className="flex items-center justify-between w-full md:w-auto gap-4">
        <div className="flex items-center gap-3">
          <img
            src={thumbnailUrl}
            className="object-cover w-10 h-10 rounded-full border outline-none"
            alt="channel avatar"
          />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <p className="font-semibold">{channelId}</p>
            <p className="text-xs text-gray-300">{subscribers ?? 0} subscribers</p>
          </div>
        </div>
        <button className="ml-auto w-[130px] h-[40px] text-black text-base bg-white rounded-full">
          Subscribe
        </button>
      </div>

      {/* Action Buttons in One Row */}
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 w-full md:w-auto">
        {/* Like Button */}
        <button
          onClick={handleLikeEvent}
          className="flex items-center justify-center px-4 rounded-full bg-[#575757] text-white h-[40px]"
        >
          {isLiked ? (
            <ThumbsUp fill="white" stroke="white" />
          ) : (
            <ThumbsDown />
          )}
          <span className="ml-2">{likesCount}</span>
        </button>

        {/* Share Button */}
        <button className="flex items-center justify-center gap-2 px-4 h-[40px] bg-[#575757] text-white rounded-full">
          <Forward />
          <span>Share</span>
        </button>

        {/* Download Button */}
        <button className="flex items-center justify-center gap-2 px-4 h-[40px] bg-[#575757] text-white rounded-full">
          <ArrowDownToLine />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
};

const DescriptionPage = ({ item }) => {
  const { setShowDescription, showDescription, views, description, uploadDate } = item;
  const date = new Date(uploadDate);
  const hour = date.getHours();

  return (
    <div className={`bg-[#575757] h-[80px] text-sm p-2 relative mt-5 rounded-sm overflow-hidden transition-all duration-300 ${showDescription ? 'h-screen' : ''}`}>
      <p className="text-white leading-relaxed">
        {views} views • {hour} hour <br />
        <strong>{description}</strong> <br />
      </p>
      <div className="flex justify-end mt-2">
        <button
          onClick={() => setShowDescription(!showDescription)}
          className="text-white bg-[#676767] absolute px-4 py-1 top-2 right-2 rounded-full cursor-pointer hover:bg-[#7a7a7a] transition"
        >
          {showDescription ? 'Show Less ....' : 'More....'}
        </button>
      </div>
    </div>
  );
};

const CommentPage = (props) => {
  const user = useSelector((state) => state.user.value);
  const [input, setInput] = useState({ comment: '' });
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const navigate = useNavigate();

  const toggleMenu = (index) => {
    setActiveMenuIndex(prev => prev === index ? null : index);
  };

  const handleEdit = (item, idx) => {
    setEditIndex(idx);
    setEditText(item.text);
    setActiveMenuIndex(null);
  };

  const { mutate } = useMutation({
    mutationFn: (val) => createComments(val),
    onSuccess: (res) => {
      toast(res.message);
      if (props.onCommentPosted) {
        props.onCommentPosted()
      }
    },
    onError: (err) => {
      toast(err?.response?.data?.message);
      navigate('/signin');
    },
  });

  const handleComments = () => {
    const { comment } = input;
    const authToken = localStorage.getItem("authToken");
    mutate({ comments: comment, authToken, videoId: props?.fullId });
    setInput({ comment: '' });
  };

  const { mutate: mutate1 } = useMutation({
    mutationFn: DeleteComments,
    onSuccess: (res) => {
      toast(res.message)
      if (props.onCommentPosted) {
        props.onCommentPosted()
      }
    },
    onError: (err) => toast(err?.response?.data?.message),
  });

  const handleDelete = (item) => {
    const { userId, _id: commentId } = item;
    const videoId = props?.fullId;
    const authToken = localStorage.getItem("authToken");
    mutate1({ userId, videoId, commentId, authToken });
    setActiveMenuIndex(null);
  };

  const { mutate: updateCommentMutation } = useMutation({
    mutationFn: UpdateComments,
    onSuccess: (res) => {
      toast(res.message);
      if (props.onCommentPosted) {
        props.onCommentPosted()
      }
      setEditIndex(null);
    },
    onError: (err) => toast(err?.response?.data?.message),
  });

  const handleUpdate = (item) => {
    console.log(item);
    const authToken = localStorage.getItem("authToken");
    updateCommentMutation({
      commentId: item._id,
      updatedText: editText,
      authToken,
      videoId: props?.fullId,
      userId: item.userId
    });
  };

  return (
    <div className='rounded-sm'>
      <h2 className='py-2 mb-2 font-bold text-xl'>{props?.item?.length} Comments</h2>

      <div className='flex gap-3 items-center'>
        <img
          src='https://yt3.ggpht.com/a/default-user=s48-c-k-c0x00ffffff-no-rj'
          className='w-[40px] h-[40px] rounded-full object-contain'
        />
        <textarea
          className='w-full h-[30px] resize-none outline-none border-b border-[#575757] text-sm px-2 py-1'
          rows={1}
          value={input.comment}
          onChange={(e) => setInput({ ...input, comment: e.target.value })}
        />
      </div>

      <div className='flex justify-end mt-2'>
        <button
          disabled={input.comment === ''}
          onClick={handleComments}
          className={`w-[120px] h-[36px] text-sm rounded-full 
            ${input.comment === '' ? 'bg-[#575757] text-gray-400 cursor-not-allowed' : 'bg-blue-400 hover:bg-blue-700'} 
            transition-colors duration-200 text-black`}
        >
          Comment
        </button>
      </div>

      {props?.item?.slice().reverse().map((item, idx) => {
        const { text, timestamp, userName } = item;
        const date = new Date(timestamp);
        const formatted = date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });

        const isEditing = editIndex === idx;

        return (
          <div
            key={idx}
            className='flex items-start relative mt-4 hover:bg-[#5757576c] transition duration-700 p-2 rounded-lg gap-5'
          >
            <img
              src='https://yt3.ggpht.com/a/default-user=s48-c-k-c0x00ffffff-no-rj'
              className='w-[42px] h-[42px] rounded-full object-cover'
            />
            <div className='w-full'>
              <div className='flex items-center gap-5 text-gray-300'>
                <h2 className='capitalize text-sm'>@{userName}</h2>
                <p className='text-sm'>{formatted}</p>
              </div>

              {isEditing ? (
                <>
                  <textarea
                    className='w-full text-sm mt-2  text-white p-2 rounded border border-[#575757]'
                    value={editText}
                    rows={2}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <div className='flex gap-3 mt-2'>
                    <button
                      className='text-sm bg-blue-500 px-3 py-1 rounded hover:bg-blue-700'
                      onClick={() => handleUpdate(item)}
                    >
                      Save
                    </button>
                    <button
                      className='text-sm bg-gray-500 px-3 py-1 rounded hover:bg-gray-600'
                      onClick={() => setEditIndex(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <p className='text-sm py-2'>{text}</p>
              )}
            </div>


            {item?.userName === user?.userId?.username ? <EllipsisVertical
              onClick={() => toggleMenu(idx)}
              className='cursor-pointer'
            /> : null
            }


            {activeMenuIndex === idx && (
              <div className='absolute flex justify-around items-center w-[131px] bg-[#414141] right-1 top-14 p-2 h-[40px] rounded-md z-10'>
                <Pen
                  size={20}
                  onClick={() => handleEdit(item, idx)}
                  className='cursor-pointer hover:text-blue-500'
                />
                <Trash
                  size={20}
                  onClick={() => handleDelete(item)}
                  className='cursor-pointer hover:text-blue-500'
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};