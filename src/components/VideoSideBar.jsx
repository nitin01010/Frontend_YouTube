import { useSelector } from "react-redux";

const VideoSideBar = () => {
     const youtubeAllVideo = useSelector((state) => state.youtubeSlice.value);
    function formatUploadDate(isoString) {
        const date = new Date(isoString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }
    return (
        <div className='hidden transition-all ease-linear lg:block rounded-lg mr-2 bg-[#5757576c] p-1 w-[500px]'>
            {
                youtubeAllVideo?.map((item, index) => {
                    return (
                        <div
                            key={item._id || index}
                            className='flex gap-5 hover:bg-[#5757576c]  min-w-[334px] rounded-md px-1 mt-2 items-center h-[96px]'
                        >
                            <img
                                src={item?.thumbnailUrl}
                                className='w-[168px] h-[90px] rounded-md'
                                alt={item.title}
                            />
                            <div className='w-[226px] h-[95px]'>
                                <p className='text-sm'>{item.title}</p>
                                <p className='text-sm font-bold'>{item.channelId}</p>
                                <p className='text-sm'>{item.views}</p>
                                <p className='text-sm'>{formatUploadDate(item.uploadDate)}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default VideoSideBar
