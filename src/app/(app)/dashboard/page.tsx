'use client'

import { Message } from "@/models/User"
import { useState,useEffect } from "react"


export default function Dashboard(){

    const [messages,setMessages] = useState<Message[]>([])
    const [isCheckAcceptMessage,setIsCheckAcceptgMessage] = useState(false)
    const [isCheckingMessage,setIsCheckingMessage] = useState(false)

    

    return <>
        <div>This is dashboard</div>
    </>
}