'use client'
import Image from "next/image";
import facegif from "../../../resources/thinkingface2.gif"
import { ArrowBigLeftIcon, ArrowLeftRightIcon, ArrowRightIcon, ArrowRightLeftIcon, Hand } from "lucide-react";
import { useSession } from "next-auth/react";
import Features from "@/components/Features";

export default function Home() {

  const {data:session, status} = useSession()

  return (
    <>
      <section className="w-full h-auto flex flex-col sm:px-14 px-2 ">
        <p className="mt-7 font-flux text-xl text-gray-950">
          Let anyone ask you some Interesting questions
        </p>
        <div className="flex w-full h-full mt-4 sm:flex-row flex-col">
          <div className="flex flex-col sm:w-[60%] w-full">
            <div className="sm:text-[80px] text-[75px] w-full font-bold font-montserrat text-slate-950 " style={{lineHeight:1.2}}>
              Send Mysterious <br /> <span className="text-slate-900">Bubble</span> <br/>  Messages
            </div>
            <p className="text-gray-900 sm:w-[80%] w-full p-1 mt-14 text-md italic ">
            Express yourself without hesitation. Our platform lets you share your thoughts, feelings, and feedback while maintaining complete privacy. Whether it's heartfelt confessions, honest feedback, or just playful banter - say what's on your mind without revealing who you are.
            </p>
            <div
             
              
              className="sm:mt-10 mt-2 flex flex-row items-center justify-center  gap-1 sm:w-[30%] w-[50%] h-12 rounded-full bg-black text-white cursor-pointer"
            >
              <p className=" font-montserrat">{
                
                session && session?.user? (<a href="/dashboard">Dashboard</a>):(
                 <a href="/sign-up">Sign Up</a>
                )
                
                }</p>
              <ArrowRightIcon/>
            </div>
            
          </div>
          <div className="flex flex-col h-auto sm:w-[40%] w-full justify-start">
            <Image src={facegif} alt={`Smile :)`} className="w-[100%] hero-image duration-700 ease-in-out" unoptimized={true} />
            
          </div>
        </div>
      </section>
      <Features/>
    </>
  );
}
