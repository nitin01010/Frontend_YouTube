import confetti from 'canvas-confetti';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ChannelPage = () => {
  const [sub, setSub] = useState(false);
  const { channelName } = useParams();
  const user = useSelector((state) => state.user.value);
  const [activeTab, setActiveTab] = useState('Home');
  const tabs = ['Home', 'Videos'];

  const handleSub = () => {
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
    setSub(!sub);
  };

  const videos = user?.userId?.channels?.[0]?.videos || [];

  return (
    <div className='m-0 sm:ml-22 p-2 min-h-screen text-white bg-[#0f0f0f]'>
      {/* Banner */}
      <img
        src='https://yt3.googleusercontent.com/cfIB1l6wxNuO5UCjpo4hWLjkGlCcMjq2mfQA6CY5VkgzjGYcEQy7Y0tpNwWMpHVlGP-ibsCm-Q=w1138-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj'
        className='h-[200px] w-full object-cover rounded-md'
        alt='Banner'
      />

      {/* Channel Info */}
      <div className='flex flex-col md:flex-row gap-6 mt-4'>
        <img
          src='https://yt3.googleusercontent.com/cfIB1l6wxNuO5UCjpo4hWLjkGlCcMjq2mfQA6CY5VkgzjGYcEQy7Y0tpNwWMpHVlGP-ibsCm-Q=w1138-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj'
          className='w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full object-cover'
          alt='Profile'
        />

        <div className='flex-1'>
          <h1 className='text-2xl capitalize py-2'>{channelName}</h1>
          <div className='flex flex-wrap items-center gap-2 text-sm text-gray-300'>
            <span>@{channelName}</span>
            <span>0 subscribers</span>
            <span>{videos.length} Videos</span>
          </div>
          <p className='py-2 text-sm text-gray-200'>Hi! Welcome to my channel</p>
          <button
            onClick={handleSub}
            className={` w-full ${sub === true ? 'bg-white' : 'bg-black text-white font-bold'} transition-all ease-linear sm:w-[130px] mt-2 capitalize text-sm  rounded-full text-black h-[36px]`}>
            {sub ? 'subscriber' : 'subscriberd'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className='flex gap-4 border-b border-gray-600 mt-6 h-[48px]'>
        {tabs.map((item) => (
          <div
            key={item}
            onClick={() => setActiveTab(item)}
            className={`cursor-pointer relative px-3 flex items-center justify-center text-sm
              ${activeTab === item ? 'text-white font-semibold' : 'text-gray-400'}`}
          >
            {item}
            {activeTab === item && (
              <div className='absolute bottom-0 left-0 right-0 h-[1px] bg-white' />
            )}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div className='py-4'>
        {activeTab === 'Home' && (
          <div>
            <h3 className='font-bold px-1 py-3'>Videos</h3>
            {/* <div className='flex flex-col sm:flex-row sm:flex-wrap gap-4'>
              <div className='w-full sm:w-[250px]'>
                <img
                  src='https://i.ytimg.com/vi/j6VfSQ2S9Lk/hqdefault.jpg'
                  alt='Sample Video'
                  className='rounded-md w-full'
                />
                <p className='mt-2 text-sm'>KNIFE ??? OPENING SPECTRUM CASES!</p>
              </div>
            </div> */}
          </div>
        )}

        {activeTab === 'Videos' && (
          <div>
            <h3 className='font-bold px-1 py-3'>Videos</h3>
            {videos.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {videos.map((item, index) => (
                  <div key={index} className='w-full'>
                    <img
                      src={item?.thumbnail || 'https://i.ytimg.com/vi/j6VfSQ2S9Lk/hqdefault.jpg'}
                      alt={item?.title || 'Video Thumbnail'}
                      className='rounded-md w-full'
                    />
                    <p className='text-sm mt-1'>{item?.title || 'Untitled Video'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-sm text-gray-400 px-2 py-2'>This channel has no videos.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelPage;