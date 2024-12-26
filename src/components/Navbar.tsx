'use client';
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import Link from "next/link";
import { AtSign, Send } from "lucide-react";

export default function Navbar() {

    const { data: session, status } = useSession();
    const user: User = session?.user
    return <>

        <nav className="p-4 md:p-6 shadow-md font-semibold bg-white text-gray-900 ">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <a href="#" className="text-[35px] font-bold mb-4 md:mb-0 font-flux  flex flex-row items-center gap-1">
                   <AtSign className="w-6 h-6"/> Bubbler Messenger
                </a>
                {session ? (
                    <>
                        <span className="mr-4">
                            Welcome, {user.username || user.email}
                        </span>
                        <Button onClick={() => signOut()} className="w-full md:w-auto bg-slate-300 text-black font-flux" variant='outline'>
                            Logout
                        </Button>
                    </>
                ) : (
                    <Link href="/sign-in">
                        <Button className="w-full md:w-auto py-4 bg-indigo-600 text-white font-semibold px-8 rounded-lg  " variant={'outline'}>Login</Button>
                    </Link>
                )}
            </div>
        </nav>

    </>
}