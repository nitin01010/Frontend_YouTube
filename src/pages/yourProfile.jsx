import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const YourProfile = () => {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [channelName, setChannelName] = useState('');

  useEffect(() => {
    if (!user?.auth) {
      navigate('/signin');
    }
  }, [user, navigate]);

  if (!user?.auth) return null;

  const { email, username, _id, avatar } = user?.userId || {};

  const handleCreate = () => {
    setShowModal(true);
  };

  const handleChannelCreate = () => {
    if (!channelName.trim()) return alert("Channel name can't be empty");
    console.log('Creating channel:', channelName);
    // Here you could call an API or dispatch Redux action
    setShowModal(false);
    setChannelName('');
  };

  const closeModal = () => {
    setShowModal(false);
    setChannelName('');
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-6">
      <div className="bg-[#0f0f0f] shadow-2xl rounded-2xl p-8 w-full max-w-md text-center border border-gray-700">
        <div className="flex justify-center mb-4">
          <img
            src={avatar[0] || `https://ui-avatars.com/api/?name=${username}`}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          />
        </div>
        <h2 className="text-2xl font-semibold text-white mb-1">{username}</h2>
        <p className="text-gray-400 mb-4">{email}</p>
        <div className="text-sm text-gray-500">
          <p><strong>User ID:</strong> {_id}</p>
        </div>
        <button
          onClick={handleCreate}
          className="mt-6 px-4 py-2 bg-white uppercase text-black font-bold rounded-full transition"
        >
          Create Your Channel
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0  bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className=" bg-white w-[50%] h-[550px] backdrop-blur-lg border border-white/20 text-black rounded-2xl shadow-2xl   p-6 relative">

            <h2 className="text-2xl font-semibold mb-4 text-center uppercase">Create Your Channel <small>🎉🍾🎊🎁</small></h2>

            <div className="mb-4 ">
              <label className="block mb-1 font-bold  text-lg px-2 uppercase text-black">Channel Name</label>
              <input
                type="text"
                value={channelName.toLocaleUpperCase()}
                onChange={(e) => setChannelName(e.target.value)}
                className="w-full px-5 py-3 bg-gray-50 rounded-md text-black mt-2 border-none outline-none"
                placeholder="Enter your channel name"
              />
              <label className="block mb-1 font-bold  text-lg px-2 mt-5 uppercase text-black">Email</label>
              <input
                type="text"
                value={email}
                disabled
                onChange={(e) => setChannelName(e.target.value)}
                className="w-full px-5 py-3 bg-gray-50 rounded-md text-black mt-3 border-none outline-none"
                placeholder="Enter your channel name"
              />
            
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleChannelCreate}
                className="flex-1 py-4 text-lg bg-black text-white rounded-full font-semibold mt-8"
              >
                CREATE {`@${channelName.toLocaleUpperCase()}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourProfile;
