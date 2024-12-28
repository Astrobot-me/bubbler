'use client'

import Image from "next/image"
import Privacy from '../../resources/privacy.png';
import Easy from '../../resources/chatbot.png';
import Instant from '../../resources/instant.png';


export default function Features() {
    return <>
        <div className="w-full h-auto flex flex-col items-center mt-3  mb-8">
            <div className="flex flex-col items-center w-full text-center">
                <p className="sm:text-5xl text-xl font-semibold font-flux text-black">
                Break Free from Social Barriers
                </p>
                <div className="border-b-2 rounded mt-1 sm:w-[10%] w-[40%] border-slate-950" />
            </div>
            <div className="w-[95%] h-auto flex flex-wrap justify-evenly p-1 pt-10 mb-2">
                {/* Cards  */}
                <div className="sm:w-[400px] w-[95%] h-auto bg-black shadow flex flex-col justify-evenly items-center p-2 rounded-2xl text-center hover:scale-105 hover:duration-500 hover:linear mb-10">
                    <Image className="w-56" src={Privacy} alt="img"  />
                    <div className="text-3xl font-semibold font-flux text-white">Privacy at Our Core</div>
                    <p className=" text-gray-600 mt-1 mb-3 p-2 font-medium">
                    We've built this platform with your privacy as our top priority. No registration required for sending messages, and no way to trace messages back to their senders. What happens in the anonymous space, stays in the anonymous space.
                    </p>
                </div>
                <div className="sm:w-[400px] w-[95%] h-auto bg-black shadow flex flex-col justify-evenly items-center p-2 rounded-2xl text-center hover:scale-105 hover:duration-500 hover:linear mb-10">
                    <Image className="w-56" src={Instant} alt="img"  />
                    <div className="text-3xl font-semibold font-flux text-white">One Link, Endless Possibilities</div>
                    <p className=" text-gray-600 mt-1 mb-3 p-2 font-medium">
                    Every user gets their unique, shareable link - your personal channel for receiving anonymous messages. Share it on your social media, add it to your bio, or send it directly to friends. The power to hear unfiltered thoughts from your circle is just one link away.
                    </p>
                </div>
                <div className="sm:w-[400px] w-[95%] h-auto bg-black shadow flex flex-col justify-evenly items-center p-2 rounded-2xl text-center hover:scale-105 hover:duration-500 hover:linear mb-10">
                    <Image className="w-56 " src={Easy} alt="img"  />
                    <div className="text-3xl font-semibold font-flux text-white">Easy as 1-2-3</div>
                    <p className=" text-gray-600 mt-1 mb-3 p-2 font-medium">
                    Create your unique receiving link in seconds
                    ,Share it with your world,Start receiving anonymous messages
                    </p>
                </div>
                
               
            </div>
            <div className=" py-3 mt-2  font-flux sm:w-full w-[85%] text-center align-middle sm:text-6xl text-3xl text-black italic font-bold m-2"> Ready to Experience? , Sign up Now!</div>
        </div>


    </>
}