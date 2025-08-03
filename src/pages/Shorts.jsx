
const Shorts = () => {
  return (
    <div className="px-4 pt-4 w-full flex justify-center">
      <div className="flex flex-col gap-4 w-full max-w-[516px]">
        {[1,2,3].map((_, index) => (
          <video
            key={index}
            controls
            autoPlay
            loop
            muted
            className="w-full h-[600px] sm:h-[600px] md:h-[700px] lg:h-[750px] rounded-lg bg-amber-50 object-cover"
          >
            <source src="https://cdn.pixabay.com/video/2024/08/30/228847_tiny.mp4" type="video/mp4" />
            <source src="https://cdn.pixabay.com/video/2024/08/30/228847_tiny.mp4" type="video/ogg" />
          </video>
        ))}
      </div>
    </div>
  );
};

export default Shorts;
