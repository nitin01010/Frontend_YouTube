import { useParams } from "react-router-dom";

const IframVideoPlayer = () => {
    const { id } = useParams();
    return (
        <div className="relative w-full  h-[400px] sm:h-0 pb-[56.25%] rounded-md overflow-hidden">
            <iframe
                src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=0`}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
            ></iframe>
        </div>
    )
}

export default IframVideoPlayer
