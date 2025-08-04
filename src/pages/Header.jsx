import { useEffect, useState } from 'react';
import { Bell, CircleUser, Menu, Mic, Search, Video } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import youtubeHomeIcon from '../assets/youtubeHomeIcon.png';
import youtubeShortIcon from '../assets/youtubeShortIocn.png';
import { findBycategory, findBySearch, handleAuth } from '../api/api';
import { setVideos } from '../features/youtube/youtubeSlice';
import { setUser } from '../features/youtube/userSlice';

const IconsData = [
  { id: 1, text: 'Home', iconImageUrl: youtubeHomeIcon, path: '/' },
  { id: 2, text: 'Shorts', iconImageUrl: youtubeShortIcon, path: '/shorts' },
  { id: 3, text: 'Subscriptions', iconImageUrl: 'https://img.icons8.com/ios-glyphs/30/FFFFFF/video-playlist.png', path: '/Subscriptions' },
  { id: 4, text: 'You', iconImageUrl: 'https://img.icons8.com/ios/50/FFFFFF/user-male-circle--v1.png', path: '/profile' },
];

const Header = () => {
  const user = useSelector((state) => state.user.value);
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
    onSuccess: (res) => dispatch(setVideos(res)),
    onError: (err) => console.error('Search error:', err),
  });

  const HandleSearch = () => {
    if (input.search.trim() === '') return;
    mutate(input.search);
  };

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const checkAuth = async () => {
      const token = await handleAuth({ authToken });
      dispatch(setUser(token));
    };
    checkAuth();
  }, [authToken]);

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between bg-[#0f0f0f] px-4 h-[56px] text-white w-full">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebar(!sideBar)} className="hover:bg-[#333] p-2 rounded-full transition">
            <Menu size={24} />
          </button>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/YouTube_2024_%28white_text%29.svg/1200px-YouTube_2024_%28white_text%29.svg.png"
            alt="YouTube Logo"
            className="h-[16px] sm:h-[24px] cursor-pointer"
            onClick={() => navigate('/')}
          />
        </div>

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
          <button className="bg-[#222] hidden md:block p-2 rounded-full">
            <Mic size={20} />
          </button>
        </div>

        {user?.success ? <PrivateView /> : <PublicView />}
      </header>

      {currentPath === '/' && <FilterVideos />}
      <SideBarView sideBar={sideBar} onClose={() => setSidebar(false)} />
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
    onSuccess: (res) => dispatch(setVideos(res.data)),
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
    <nav className="element-with-scrollbar sticky top-14 -ml-2 sm:ml-18 bg-[#0f0f0f] h-[50px] flex items-center overflow-x-auto">
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

const SideBarView = ({ sideBar, onClose }) => {
  return (
    <aside className={`fixed z-40 top-[56px] left-0 h-full bg-[#0f0f0f] text-white overflow-hidden transition-all duration-300
      ${sideBar ? 'w-[240px]' : 'w-0 md:w-[84px]'} md:visible ${sideBar ? 'visible' : 'md:visible invisible'}`}>
      <nav className="flex flex-col gap-4 py-2">
        {IconsData.map((item) => (
          <SideBarIconCard key={item.id} sideBar={sideBar} data={item} />
        ))}
      </nav>
      {/* Close button for mobile */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:hidden bg-gray-800 text-white rounded-full p-1"
      >
        ✕
      </button>
    </aside>
  );
};

const SideBarIconCard = ({ sideBar, data }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(data.path)}
      className={`flex items-center h-[50px] rounded-lg ml-2 mr-2 hover:bg-[#1f1f1f] transition cursor-pointer
        ${sideBar ? 'flex-row gap-4 px-4 py-2' : 'flex-col justify-center gap-1 py-4'}`}
    >
      <img src={data.iconImageUrl} alt={data.text} className="w-6 h-6" />
      <span className={`text-sm ${sideBar ? 'block' : 'text-[10px]'}`}>{data.text}</span>
    </div>
  );
};

const PublicView = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => navigate('/signin')}
        className="flex items-center gap-2 px-3 min-w-[100px] py-2 border border-gray-600 rounded-full hover:bg-[#222] transition"
      >
        <CircleUser size={20} />
        <p>Sign in</p>
      </button>
    </div>
  );
};

const PrivateView = () => {
  const [status, Setstatus] = useState(false);
  const user = useSelector((state) => state.user.value);

  const handleClear = () => {
    localStorage.clear("authToken");
    window.location.reload();
  };

  const navigate = useNavigate();

  return (
    <div className="flex relative items-center gap-4">
      <span className="hover:bg-[#212121] min-w-[40px] w-[40px] h-[40px] flex items-center justify-center rounded-full">
        <Video size={30} />
      </span>
      <span className="hover:bg-[#212121] min-w-[40px] w-[40px] h-[40px] flex items-center justify-center rounded-full">
        <Bell size={28} />
      </span>
      <img
        onClick={() => Setstatus(!status)}
        src={user.userId?.avatar[0] || 'https://img.icons8.com/?size=100&id=bOXN3AZhMCek&format=png&color=000000'}
        alt="Avatar"
        className="w-[40px] h-[40px] object-cover rounded-full cursor-pointer"
      />

      <div
        className={`bg-gray-900 shadow-2xl w-[190px] rounded-md p-3 absolute right-0 top-14 transition-all duration-500 ease-in-out transform
          ${status ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}`}
      >
        <p className="text-center text-2xl capitalize font-bold">{user.userId?.username}</p>
        <p className="text-center text-sm py-2 font-bold">{user.userId?.email}</p>
        <div className=' flex items-center gap-2'>
        <button onClick={handleClear} className="w-full bg-white rounded-md h-[40px] text-black font-bold text-sm">
          Logout
        </button>
        <button onClick={()=>navigate('/profile')} className="w-full bg-white   rounded-md h-[40px] text-black font-bold text-sm">
          Profile
        </button>
        </div>
      </div>
    </div>
  );
};