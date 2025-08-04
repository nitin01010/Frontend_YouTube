import { useNavigate } from "react-router-dom"

const VideoCard = ({ data }) => {
    const navigate = useNavigate();
    const { videoId, thumbnailUrl, views, uploadDate, channelId } = data;

    const isoString = uploadDate;
    const date = new Date(isoString);
    const hour = date.getHours();

    function formatViews(views) {
        if (views >= 1_000_000) {
            return (views / 1_000_000).toFixed(1) + 'M';
        } else if (views >= 1_000) {
            return (views / 1_000).toFixed(1) + 'K';
        } else {
            return views.toString();
        }
    }

    const formattedViews = formatViews(views);

    return (
        <div onClick={() => navigate(`/watch/${videoId}`)} className=" overflow-hidden cursor-pointer  h-[343.61px] ml-2 py-2 ">
            <img src={thumbnailUrl} className="object-cover w-full  sm:w-[393.99px] h-[221.61px] rounded-md" />
            <div className=" flex py-1 gap-3 h-[122px] mt-2">
                <img src={data?.thumbnailUrl} className="object-cover  bg-[#f2f2f2] border-none w-[36px]   rounded-full h-[36px] min-w-[36px] " />
                <div>
                    <p>{data?.title}</p>
                    <h2 className=" text-gray-200 text-sm py-1">{channelId}</h2>
                    <span className=" flex gap-3 py-1">
                        <p className=" text-gray-200 text-sm">{formattedViews} views .</p>
                        <p className=" text-gray-200 text-sm">{hour} Hours ago</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default VideoCard