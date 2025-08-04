import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { handleCreateChannle } from '../api/api';
import confetti from 'canvas-confetti';
import { toast } from 'react-toastify';

const YourProfile = () => {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [channelCreated, setChannelCreated] = useState(
    user?.userId?.channels?.length === 1
  );

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, channelName }) => handleCreateChannle({ id, channelName }),
    onSuccess: (res) => {
      toast.success(res?.message || 'Channel created successfully!');
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });

      const createdChannel = res?.user?.channels?.[0]?.channelName;
      if (createdChannel) {
        setChannelCreated(true);
        setShowModal(false);
        setChannelName('');
        navigate(`/in/${createdChannel}`);
      } else {
        toast.error('Please refresh');
      }
    },
    onError: (err) => {
      const message = err?.response?.data?.message || 'Something went wrong.';
      toast.error(message);
    },
  });

  useEffect(() => {
    if (!user?.auth) {
      navigate('/signin');
    }
  }, [navigate, user?.auth]);

  if (!user?.auth) return null;

  const { email, username, _id, avatar } = user?.userId || {};
  const userChannel = user?.userId?.channels?.[0]?.channelName;

  const handleChannelCreate = () => {
    if (!channelName.trim()) {
      toast.warning('Channel name cannot be empty.');
      return;
    }
    mutate({ channelName, id: _id });
  };

  return (
    <div className="mt-28 bg-[#0f0f0f] flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#0f0f0f] shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-2xl text-center">
        <div className="flex justify-center mb-4">
          <img
            src={
              avatar?.[0] ||
              `https://img.icons8.com/?size=100&id=bOXN3AZhMCek&format=png&color=000000`
            }
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover border-1"
          />
        </div>
        <h2 className="text-2xl font-semibold text-white mb-1 capitalize">{username}</h2>
        <p className="text-gray-400 mb-4 capitalize py-2 ml-4">{email}</p>

        {channelCreated && userChannel ? (
          <button
            onClick={() => navigate(`/in/${userChannel}`)}
            className="mt-6 px-4 py-2 bg-white uppercase ml-4 text-black font-bold rounded-full transition"
          >
            View your channel
          </button>
        ) : (
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 px-4 py-2 bg-white uppercase ml-4 text-black font-bold rounded-full transition"
          >
            Create Your Channel
          </button>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full sm:w-[90%] md:w-[70%] lg:w-[50%] h-[90%] sm:h-[550px] text-black rounded-2xl shadow-2xl p-4 sm:p-6 relative overflow-y-auto">
            <p className="flex cursor-pointer justify-end" onClick={() => setShowModal(false)}>
              <X size={30} />
            </p>
            <h2 className="text-2xl font-semibold mb-4 text-center uppercase">
              Create Your Channel <small>🎉🍾🎊🎁</small>
            </h2>

            <div className="mb-4">
              <label className="block mb-1 font-bold text-lg px-2 uppercase text-black">
                Channel Name
              </label>
              <input
                type="text"
                value={channelName.toUpperCase()}
                onChange={(e) => setChannelName(e.target.value)}
                className="w-full px-4 sm:px-5 py-3 bg-gray-50 rounded-md text-black mt-2 border-none outline-none"
                placeholder="Enter your channel name"
              />

              <label className="block mb-1 font-bold text-lg px-2 mt-5 uppercase text-black">
                Email
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 sm:px-5 py-3 bg-gray-50 rounded-md text-black mt-3 border-none outline-none capitalize"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleChannelCreate}
                disabled={isLoading}
                className="w-full py-4 text-lg bg-black text-white rounded-full font-semibold mt-4 sm:mt-8"
              >
                {isLoading ? 'Creating...' : `CREATE @${channelName.toUpperCase()}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourProfile;