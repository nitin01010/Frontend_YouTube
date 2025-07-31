import { useNavigate } from "react-router-dom"

const VideoCard = () => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/watch/asjajallsjlajlajlsajlajs`)} className=" cursor-pointer w-[100%] h-[343.61px] ml-2 py-2">
            <img src="https://i.ytimg.com/vi/zrRmXrDoqjI/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCI1ADINYKAJHgSFuC80j_rz6I1mA" className="object-cover w-[393.99px] h-[221.61px] rounded-md" />
            <div className=" flex py-1 gap-3 h-[122px] mt-2">
                <img src="https://yt3.ggpht.com/SaUtXvCyWjXaaJMcOWrF8j-1xP-qrJZCD4vn3s6azlt5L6e_DwdVnU-THPXhBqTttiCikc8P=s68-c-k-c0x00ffffff-no-rj" className="object-cover  bg-[#f2f2f2] border-none w-[36px]   rounded-full h-[36px] min-w-[36px] " />
                <div>
                    <p>40 Min chat a Room In Japan  Girl in Tokyo in jp</p>
                    <h2 className=" text-gray-200 text-sm py-1">On Road indian</h2>
                    <span className=" flex gap-3 py-1">
                        <p className=" text-gray-200 text-sm">2.9k views .</p>
                        <p className=" text-gray-200 text-sm">4 Hours ago</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default VideoCard
