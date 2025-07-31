import React from 'react'

const Shorts = () => {
    return (
        <div className=' ml-21.5 '>
            <div className=' flex flex-col gap-2 outline-none border-none w-full  md:w-[60%] m-auto'>
                {
                    [1].map((item) => {
                        return (
                            <video width="320" height="240" controls autoPlay className=' text-black   w-[516px] h-[750px]  m-auto rounded bg-amber-50  '>
                                <source src="https://cdn.pixabay.com/video/2024/08/30/228847_tiny.mp4" type="video/mp4" />
                                <source src="https://cdn.pixabay.com/video/2024/08/30/228847_tiny.mp4" type="video/ogg" />
                            </video>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Shorts
