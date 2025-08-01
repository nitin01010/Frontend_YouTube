import { useEffect, useState } from 'react';
import { Bell, CircleUser, Menu, Mic, Search, Video } from 'lucide-react';
import youtubeHomeIcon from '../assets/youtubeHomeIcon.png';
import youtubeShortIcon from '../assets/youtubeShortIocn.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { findBycategory, findBySearch } from '../api/api';
import { setVideos } from '../features/youtube/youtubeSlice';

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
    path: '/shorts',
  },
  {
    id: 3,
    text: 'Subscriptions',
    iconImageUrl: 'https://img.icons8.com/ios-glyphs/30/FFFFFF/video-playlist.png',
    path: '/Subscriptions',
  },
  {
    id: 4,
    text: 'You',
    iconImageUrl: 'https://img.icons8.com/ios/50/FFFFFF/user-male-circle--v1.png',
    path: '/',
  },
];

const Header = () => {
  const dispatch = useDispatch();
  const [sideBar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [input, setInput] = useState({ search: '' });
  const HandleInput = (e) => {
    const { name, value } = e.target;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const { mutate } = useMutation({
    mutationFn: (searchText) => findBySearch({ search: searchText }),
    onSuccess: (res) => {
      dispatch(setVideos(res));
    },
    onError: (err) => {
      console.error('Search error:', err);
    },
  });

  const HandleSearch = () => {
    if (input.search.trim() === '') return;
    mutate(input.search);
  };


  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between bg-[#0f0f0f] px-4 h-[56px] text-white">
        {/* Left */}
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
            className="h-[16px] sm:h-[24px] cursor-pointer"
            onClick={() => navigate('/')}
          />
        </div>

        {/* Middle (Search) */}
        <div className="flex items-center justify-end flex-grow max-w-3xl gap-3 px-4">
          <div className="hidden md:flex flex-grow">
            <input
              type="text"
              name="search"
              value={input.search}
              onChange={HandleInput}
              placeholder="Search"
              className="w-full px-4 py-2 bg-[#121212] text-white border border-[#303030] rounded-l-full focus:outline-none"
            />
            <button onClick={HandleSearch} className="bg-[#222] px-4 rounded-r-full">
              <Search size={20} />
            </button>
          </div>
          <button className="bg-[#222] p-2 rounded-full">
            <Mic size={20} />
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/signin')}
            className="flex items-center gap-2 px-3 min-w-[100px] py-2 border border-gray-600 rounded-full hover:bg-[#222] transition"
          >
            <CircleUser size={20} />
            <p>Sign in</p>
          </button>
        </div>
      </header>

      {/* Render Filtered Videos on Home Page */}
      {currentPath === '/' && <FilterVideos />}

      {/* Sidebar */}
      <SideBarView sideBar={sideBar} />
    </>
  );
};

export default Header;


const FilterVideos = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.youtubeSlice.value);

  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  const { mutate } = useMutation({
    mutationFn: (category) => findBycategory({ category }),
    onSuccess: (res) => {
      dispatch(setVideos(res.data));
    },
  });

  useEffect(() => {
    mutate("all");
  }, []);

  useEffect(() => {
    if (categories.length === 0 && videos.length > 0) {
      const uniqueCats = Array.from(new Set(videos.map(v => v.category).filter(Boolean)));
      setCategories(["all", ...uniqueCats]);
    }
  }, [videos]);

  return (
    <nav className="element-with-scrollbar sticky top-14 ml-18 bg-[#0f0f0f] h-[50px] flex items-center overflow-x-auto">
      <ul className="flex items-center gap-3 h-full px-4 whitespace-nowrap">
        {categories.map((tab, i) => (
          <li
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              mutate(tab);
            }}
            className={`px-5 mb-2 h-[35px] mt-2 rounded-md cursor-pointer flex items-center justify-center
              ${activeTab === tab ? "bg-white text-black" : "bg-[#212121] text-white hover:bg-[#505050]"}
              ${i === 0 ? "ml-2" : ""}`}
          >
            {tab}
          </li>
        ))}
      </ul>
    </nav>
  );
};

const SideBarView = ({ sideBar }) => {
  return (
    <aside
      className={`fixed border-r-1 z-50 border-gray-600 top-[56px] left-0 h-full bg-[#0f0f0f] text-white overflow-hidden transition-all duration-300 ${sideBar ? 'w-[240px]' : 'w-[84px]'
        }`}
    >
      <nav className="flex flex-col gap-4 py-2">
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
      className={`flex items-center  h-[50px]  rounded-lg ml-2 mr-2  hover:bg-[#1f1f1f] transition cursor-pointer ${sideBar
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