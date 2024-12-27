'use client';

import { Message } from "@/models/User";
import React from "react";
import axios ,{AxiosError} from "axios";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import apiResponse from "@/types/apiResponse";
import dayjs from 'dayjs';

type Messageprops = {
    content: Message,
    onMessageDelete: (messageId: string) => void

}

export default function Messagecard({ content, onMessageDelete }: Messageprops) {

    const {toast} = useToast()

    const handleContinueDelete = async ()=> {
        try {
            const response = await axios.delete<apiResponse>(`/api/delete-message/${content._id}`)

            toast({
                title:"Message Deleted",
                description:response.data.message

            })
            onMessageDelete(content._id as string)
            
        } catch (error) {
            const axiosError = error as AxiosError<apiResponse>
            toast({
                title:"Some error occured!",
                description:axiosError.response?.data.message,
                variant:"destructive"

            })
        }

        

    }

    return <React.Fragment>

        <Card>
            <CardHeader>
                {/* <CardTitle>Card Title</CardTitle> */}
                <CardDescription>Sent at {dayjs(content.timestamp).format('MMM D, YYYY h:mm A')}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{content?.content}</p>
            </CardContent>
            <CardFooter>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline" className="bg-red-500" > <X className="h-5 w-5" /> Delete </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this and remove this from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={()=> handleContinueDelete()}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>


    </React.Fragment>
}