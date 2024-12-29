'use client';
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRightToLine, AtSign, Loader, MessageCircleCode, Send } from "lucide-react";
import { useState } from "react";

export default function Navbar() {

    const { data: session, status } = useSession();
    const user: User = session?.user
    const [signInClicked, setSigninClicked] = useState(false)
    const [signOutClicked, setsignOutClicked] = useState(false)

    return <>

        <nav className="p-4 md:p-6 shadow-md font-semibold bg-white text-gray-900 ">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <Link href="/" className="text-[35px] font-bold mb-4 md:mb-0 font-flux  flex flex-row items-center justify-between gap-1">
                    <MessageCircleCode className="w-6 h-6 " /> Bubbler Messenger
                </Link>
                {session ? (
                    <>
                        <span className="mr-4 font-flux text-xl">
                            Welcome, {(user.username || user.email)?.toUpperCase()}
                        </span>
                        <Button onClick={() => {
                            signOut()
                            setSigninClicked(true)

                            }} className="w-full md:w-auto bg-slate-300 text-black font-flux" variant='outline'>
                            {signInClicked ? (
                                <>
                                    <Loader className="w-4 h-4 animate-spin" />
                                </>
                            ) : ("Log out")}
                        </Button>
                    </>
                ) : (
                    <div className="flex flex-row items-center justify-between gap-2">

                        <Link href="/sign-in">
                            <Button className="w-full md:w-auto py-4 border border-gray-900 text-gray-900 font-semibold px-8 rounded-lg  " variant={'outline'}

                                onClick={(e) => setSigninClicked(true)}
                            >
                                {signInClicked ? (
                                    <>
                                        <Loader className="w-4 h-4 animate-spin" />
                                    </>
                                ) : ("Sign in")}
                            </Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button className="w-full md:w-auto py-4 bg-gray-900 text-white font-semibold px-8 rounded-lg  " variant={'outline'}

                                onClick={(e) => setsignOutClicked(true)}
                            >
                                {signOutClicked ? (
                                    <>
                                        <Loader className="w-4 h-4 animate-spin" />
                                    </>
                                ) : (
                                    <>
                                        Sign Up
                                        <ArrowRightToLine />
                                    </>
                                )}
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>

    </>
}