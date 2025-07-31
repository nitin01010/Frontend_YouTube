import { ArrowDownToLine, Forward, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const VideoPlayer = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [input, setInput] = useState({ comment: '' });
  const { id } = useParams();

  return (
    <div className=' ml-21.5 p-2  transition-all ease-linear flex gap-3 '>

      <div className="w-full px-4 sm:px-6 md:px-8 transition-all ease-linear">
        <div className="relative w-full pb-[56.25%] rounded-md overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/0WD6vxQz5-I?si=0Wr1Edj1D1U5Dksb"
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        <p className="text-xl font-semibold py-2 capitalize">
          Nonstop Mashup 2025 | Talha Anjum, Talwiinder, Atif Aslam ft. Taimour Baig | Jukebox | AWAID & AWAIS
        </p>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-2 gap-4 md:gap-0">
          {/* Left section */}
          <div className="flex gap-4 items-center">
            <img
              src="https://yt3.ggpht.com/SaUtXvCyWjXaaJMcOWrF8j-1xP-qrJZCD4vn3s6azlt5L6e_DwdVnU-THPXhBqTttiCikc8P=s68-c-k-c0x00ffffff-no-rj"
              className="w-10 h-10 rounded-full"
              alt="channel avatar"
            />
            <div className="flex flex-col">
              <p className="font-semibold">AWAVD & AWSIS</p>
              <p className="text-xs text-gray-300">151K subscribers</p>
            </div>
            <button className="ml-2 min-w-[130px] w-[130px] h-[40px] text-black text-base bg-white rounded-full">
              Subscribe
            </button>
          </div>

          {/* Right section */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Like/Dislike */}
            <div className="flex">
              <button className="flex items-center justify-center w-[80px] rounded-l-full bg-[#575757] text-white h-[40px]">
                <ThumbsUp />
                <span className="ml-2">10k</span>
              </button>
              <button className="flex items-center justify-center w-[80px] rounded-r-full bg-[#575757] text-white h-[40px]">
                <ThumbsDown />
                <span className="ml-2">1k</span>
              </button>
            </div>

            {/* Share */}
            <button className="flex items-center gap-2 justify-center bg-[#575757] text-white w-[100px] h-[40px] rounded-full">
              <Forward />
              <span>Share</span>
            </button>

            {/* Download */}
            <button className="flex items-center gap-2 bg-[#575757] text-white w-[140px] h-[40px] rounded-full">
              <ArrowDownToLine className="ml-3" />
              <span>Download</span>
            </button>
          </div>
        </div>

        <div
          className={`bg-[#575757] h-[80px] text-sm p-2 relative mt-5 rounded-sm overflow-hidden transition-all duration-300 ${showDescription ? 'h-screen' : null
            }`}
        >
          <p className="text-white leading-relaxed">
            752K views • 6 months ago <br />
            <strong>Let Her Go 😢</strong> Viral Hits 2025 ~ Depressing Songs Playlist 2025 That Will Make You Cry 💔<br />
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
        <br />

        <div className='rounded-sm'>
          <h2 className='py-2 mb-2 rounded-sm font-bold text-xl '>698 Comments</h2>
          <div className='flex gap-3 items-center'>
            <img
              src='https://yt3.ggpht.com/SaUtXvCyWjXaaJMcOWrF8j-1xP-qrJZCD4vn3s6azlt5L6e_DwdVnU-THPXhBqTttiCikc8P=s68-c-k-c0x00ffffff-no-rj'
              className='object-contain w-[40px] h-[40px] rounded-full'
            />
            <textarea
              className='w-full h-[30px] resize-none outline-none border-b border-[#575757] overflow-hidden text-sm px-2 py-1'
              rows={1}
              value={input.comment}
              onChange={(e) => setInput({ ...input, comment: e.target.value })}
            />
          </div>
          <div className='flex justify-end mt-2'>
            <button
              disabled={input.comment === ''}
              className={`w-[120px] h-[36px] text-sm rounded-full 
      ${input.comment === '' ? 'bg-[#575757] text-gray-400  cursor-not-allowed' : 'bg-blue-400 hover:bg-blue-700'} 
       transition-colors duration-200 text-black`}
            >
              Comment
            </button>
          </div>
          {
            [1, 2, 3, 4, 5, 5, 6, 6, 7, 7, 8, 8, 8, 8,].map((item) => {
              return (
                <div className='flex  mt-4 hover:bg-[#5757576c] transition duration-700 ease-in-out p-1   rounded-lg py-2 items-start gap-5'>
                  <img
                    src='https://yt3.ggpht.com/SaUtXvCyWjXaaJMcOWrF8j-1xP-qrJZCD4vn3s6azlt5L6e_DwdVnU-THPXhBqTttiCikc8P=s68-c-k-c0x00ffffff-no-rj'
                    className='w-[42px] h-[42px] rounded-full object-cover  shrink-0'
                  />
                  <div className='w-full'>
                    <div className='flex items-center gap-5 text-gray-300'>
                      <h2 className='capitalize text-sm'>@channelName</h2>
                      <p className='text-sm'>9 days ago</p>
                    </div>
                    <p className='text-sm py-2'>
                      So good..Yarr!! 🖤🦋 Please add sahiba also 😩🤞🏻So good..Yarr!!
                    </p>
                  </div>
                </div>
              )
            })
          }

        </div>
        <br />
        <br />
      </div>

      <div className=' hidden transition-all ease-linear lg:block rounded-lg bg-[#5757576c] p-1 w-[500px] '>
      </div>
    </div>
  )
}

export default VideoPlayer
