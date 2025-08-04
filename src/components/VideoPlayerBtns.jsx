import React, { useState } from 'react'
import { handleLikeVideo } from '../api/api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { ArrowDownToLine, Forward, ThumbsDown, ThumbsUp } from 'lucide-react';
import confetti from 'canvas-confetti';

const VideoPlayerBtns = (props) => {
  const [sub, setSub] = useState(true);
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

    if (!user?.userId?._id) {
      toast("Please create an account to like this video.");
      return;
    }

    if (!videoId) {
      toast("Video not found.");
      return;
    }
    mutate({
      userId: user?.userId?._id,
      videoId,
    });
  };

  const handleSub = () => {
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
      setSub(!sub);
    }

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
         <button
            onClick={handleSub}
            className={`  ${sub === true ? 'bg-white' : 'bg-black text-white font-bold'} transition-all ease-linear w-[130px] mt-2 capitalize text-sm  rounded-full text-black h-[36px]`}>
            {sub ? 'subscriber' : 'subscriberd'}
          </button>
      </div>

      {/* Action Buttons in One Row */}
      <div className="flex flex-row overflow-hidden items-center justify-center space-x-4 w-full">
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
  )
}

export default VideoPlayerBtns
