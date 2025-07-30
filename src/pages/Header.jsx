import { useState } from 'react';
import { Bell, CircleUser, Menu, Mic, Search, Video } from 'lucide-react';
import youtubeHomeIcon from '../assets/youtubeHomeIcon.png';
import youtubeShortIcon from '../assets/youtubeShortIocn.png';
import { useLocation, useNavigate } from 'react-router-dom';

const IconsData = [
  {
    id: 1,
    text: 'Home',
    iconImageUrl: youtubeHomeIcon,
    path: '/',
  },
  {
    id: 2,
    text: 'Shorts',
    iconImageUrl: youtubeShortIcon,
    path: '/',
  },
  {
    id: 3,
    text: 'Subscriptions',
    iconImageUrl: 'https://img.icons8.com/ios-glyphs/30/FFFFFF/video-playlist.png',
    path: '/',
  },
  {
    id: 4,
    text: 'You',
    iconImageUrl: 'https://img.icons8.com/ios/50/FFFFFF/user-male-circle--v1.png',
    path: '/',
  },
];

const Header = () => {
  const [sideBar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between bg-[#0f0f0f] px-4 h-[56px]  text-white">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebar(!sideBar)}
            className="hover:bg-[#333] p-2 rounded-full transition"
          >
            <Menu size={24} />
          </button>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/YouTube_2024_%28white_text%29.svg/1200px-YouTube_2024_%28white_text%29.svg.png"
            alt="YouTube Logo"
            className="h-[24px] cursor-pointer"
            onClick={() => navigate('/')}
          />
        </div>

        {/* Middle Section (Search) */}
        <div className=" flex items-center justify-end flex-grow max-w-3xl gap-3 px-4">
          <div className=" hidden md:flex flex-grow  ">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4  py-2 bg-[#121212] text-white border border-[#303030] rounded-l-full focus:outline-none"
            />
            <button className="bg-[#222] px-4 rounded-r-full">
              <Search size={20} />
            </button>
          </div>
          <button className="bg-[#222] p-2 rounded-full">
            <Mic size={20} />
          </button>
        </div>


        {/* <div className=' flex items-center  gap-10  w-[15%] mt-2'>
          <span className=' hover:bg-[#212121] transition-all ease-linear min-w-[40px] w-[40px] h-[40px]  rounded-full flex items-center justify-center'>
            <Video size={30} />
          </span>
          <span className=' hover:bg-[#212121] transition-all ease-linear min-w-[40px] w-[40px] h-[40px]  rounded-full flex items-center justify-center'>
            <Bell size={28} />
          </span>
          <span className=' hover:bg-[#212121] transition-all ease-linear min-w-[40px] w-[40px] h-[40px]  rounded-full flex items-center justify-center'>
            <CircleUser size={30} />
          </span>
        </div> */}

        {/* Right Section */}
        <div className="flex items-center gap-4 ">
          <button onClick={() => navigate('/login')} className=" flex items-center gap-2 min-w-[100px]  px-3 py-2 border border-gray-600 rounded-full hover:bg-[#222] transition">
            <CircleUser size={20} />
            <span>Sign in</span>
          </button>
        </div>
      </header>
      {
        currentPath === '/' ? <FilterVideos /> : null
      }
      <SideBarView sideBar={sideBar} />
    </>
  );
};

export default Header;


const FilterVideos = () => {
  return (
    <nav className="element-with-scrollbar sticky top-14 ml-18 bg-[#0f0f0f] h-[40px] flex items-center overflow-x-auto">
      <ul className=" flex items-center gap-3 h-full px-4 whitespace-nowrap">
        {[
          "All", "Music", "Irshad Kamil", "CID", "Live", "Podcasts", "News",
          "Jukebox", "Tamil Cinema", "Gopal Bhar", "Gaming", "Indian soap operas",
          "All", "Music", "Irshad Kamil", "CID"
        ].map((item, index) => (
          <li
            key={index}
            className={`bg-[#212121] px-4 mb-2 h-[32px] mt-2 rounded-md flex items-center justify-center cursor-pointer
              ${index === 0 ? 'bg-white text-black' : 'text-white hover:bg-[#505050]'}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
};


const SideBarView = ({ sideBar }) => {
  return (
    <aside
      className={`fixed top-[56px] left-0 h-full bg-[#0f0f0f] text-white overflow-hidden transition-all duration-300 ${sideBar ? 'w-[240px]' : 'w-[72px]'
        }`}
    >
      <nav className="flex flex-col py-2">
        {IconsData.map((item) => (
          <SideBarIconCard key={item.id} sideBar={sideBar} data={item} />
        ))}
      </nav>
    </aside>
  );
};


const SideBarIconCard = ({ sideBar, data }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(data.path)}
      className={`flex items-center py-5 hover:bg-[#1f1f1f] transition cursor-pointer ${sideBar
        ? 'flex-row gap-4 px-4 py-2'
        : 'flex-col justify-center gap-1 py-4'
        }`}
    >
      <img src={data.iconImageUrl} alt={data.text} className="w-6 h-6" />
      <span className={`text-sm ${sideBar ? 'block' : 'text-[10px]'}`}>
        {data.text}
      </span>
    </div>
  );
};