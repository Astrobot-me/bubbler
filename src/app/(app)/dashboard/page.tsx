'use client'

import { Message } from "@/models/User"
import { useState,useEffect, useCallback } from "react"
import axios,{ AxiosError} from "axios"
import { useToast } from "@/hooks/use-toast"
import apiResponse from "@/types/apiResponse"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { isAcceptingSchema } from "@/schemas/isAcceptingSchema"
import { useSession } from "next-auth/react"
import { User } from "next-auth"
import {usePathname} from 'next/navigation'
import Messagecard from "@/components/MessageCard"
import { Loader2, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function UserDashboard(){

    const [messages,setMessages] = useState<Message[]>([])
    const [isCheckAcceptMessage,setIsCheckAcceptMessage] = useState(false)
    const [isCheckingMessage,setIsCheckingMessage] = useState(false)

    const {toast} = useToast()

    const {data:session,status} = useSession();
    
    
    const {register,setValue,handleSubmit,watch} = useForm({
        resolver:zodResolver(isAcceptingSchema),
    })


    const acceptMessage = watch("acceptMessages")

    const fetchUserMessages = useCallback(async (refresh:boolean = false)=>{
        setIsCheckingMessage(true)
        try {
            const response = await axios.get("/api/get-messages")
            setMessages(response.data.messages || [])

            if(refresh){
                toast({
                    title:"Refreshed Messages",
                    description:"Showing Latest Messages"
                })
            }

        } catch (error) {
            const axiosError = error as AxiosError<apiResponse>
            toast({
                title:"Some Error Occured",
                description:axiosError.response?.data.message,
                variant:"destructive"
            })
        }
        finally{
            setIsCheckingMessage(false)
        }
    },[setMessages,setIsCheckingMessage,toast])


    const fetchAcceptStatus = useCallback(async () => {
        setIsCheckAcceptMessage(true)
        try {
            const response = await axios.get("/api/accept-message")
            setValue("acceptMessages",response.data.isAcceptingMessage)
        } catch (error) {
            const axiosError = error as AxiosError<apiResponse>
            toast({
                title:"Some Error Occured",
                description:axiosError.response?.data.message,
                variant:"destructive"
            })
        }finally{
            setIsCheckAcceptMessage(false)
        }
    },[setValue,toast])


    const handleChangeAcceptMessage = async () => {
        try {
            const response = await axios.post("/api/accept-message",
                {
                    acceptMessage:!acceptMessage
                }
            )
            setValue('acceptMessages',!acceptMessage)
            toast({
                title:response.data.message,
                variant:'default'
            })

        } catch (error) {
            const axiosError = error as AxiosError<apiResponse>
            // console.log("Axios Error",axiosError);
            toast({
                title:"Failed to updated Accepting Status",
                description:axiosError.response?.data.message,
                variant:"destructive"
            })
        }
    }

    

    const handleDeleteMessage = (messageId:string) =>{
       const result = messages.filter((message)=> message._id !== messageId)
       setMessages(result)
    }

    useEffect(()=>{
        if (!session || !session.user) return;
        fetchAcceptStatus()
        fetchUserMessages();


    },[session,setValue,fetchAcceptStatus,fetchUserMessages,toast ])



    if (!session || !session.user) return <></>;

    const user : User = session?.user as User
    const {username} = user

    const baseURI = window.location.origin
    const route = usePathname()

    const profileURI = `${baseURI}/u/${username}`

    const copyToClipBoard = () =>{
        
        navigator.clipboard.writeText(profileURI)

        toast({
            title:"URL Copied! ",
            description:"Profile Link copied to clipboard"

        })

    }

    return (<>
        <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
        <div className="flex items-center">
          <input
            type="text"
            value={profileURI}
            disabled
            className="input input-bordered w-full p-2 mr-2"
          />
          <Button onClick={copyToClipBoard}>Copy</Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register('acceptMessages')}
          checked={acceptMessage}
          onCheckedChange={handleChangeAcceptMessage}
          disabled={isCheckAcceptMessage}
        />
        <span className="ml-2">
          Accept Messages: {acceptMessage ? 'On' : 'Off'}
        </span>
      </div>
      <Separator />

      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchUserMessages(true);
        }}
      >
        {isCheckingMessage ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <Messagecard
              key={message._id as string}
              content={message as Message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
    </>)
}