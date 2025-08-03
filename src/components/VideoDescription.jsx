import React from 'react'

const VideoDescription = ({ item }) => {
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
    )
}

export default VideoDescription
