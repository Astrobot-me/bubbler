import Image from "next/image";
import facegif from "../../../resources/thinkingface2.gif"
import { ArrowBigLeftIcon, ArrowLeftRightIcon, ArrowRightIcon, ArrowRightLeftIcon, Hand } from "lucide-react";


export default function Home() {
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
            <p className="text-slate-500 sm:w-[80%] w-full p-1 text-md ">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur
              excepturi numquam debitis magni, expedita provident et odio laboriosam
              consequuntur quos.
            </p>
            <a
              href=""
              
              className="sm:mt-20 mt-10 flex flex-row items-center justify-center  gap-1 sm:w-[30%] w-[50%] h-12 rounded-full bg-gray-900 text-white cursor-pointer"
            >
              <p className="font-normal font-montserrat">Dashboard</p>
              <ArrowRightIcon/>
            </a>
            
          </div>
          <div className="flex flex-col h-auto sm:w-[40%] w-full justify-start">
            <Image src={facegif} alt={`Smile :)`} className="w-[100%] hero-image duration-700 ease-in-out" unoptimized={true} />
            
          </div>
        </div>
      </section>

    </>
  );
}
