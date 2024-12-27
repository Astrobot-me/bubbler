'use client'

import { messageSchema } from "@/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation"
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { useToast } from "@/hooks/use-toast";
import apiResponse from "@/types/apiResponse";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Navbar from '../../../components/Navbar'


export default function SendMessage() {

    const [isSent, setIsSent] = useState(false);
    const refer = useRef(null)


    const form = useForm<z.infer<typeof messageSchema>>({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            content: ""
        }
    })

    const param = useParams();
    const { toast } = useToast()



    const { username } = param

    const OnSubmit = async (data: z.infer<typeof messageSchema>) => {
        setIsSent(true)
        try {

            const response = await axios.post("/api/send-message", {
                username,
                message: data.content
            })

            toast({
                title: "Message Sent Successfully",
                description: `messeage sent to the @${username}`
            })

        } catch (error) {
            const axiosError = error as AxiosError<apiResponse>

            toast({
                title: "Error Occured",
                description: axiosError?.response?.data?.message,
                variant: "destructive"
            })

        }
        finally {
            setIsSent(false)
        }
    }

    const handleClearBox = () => {
        if(refer.current){
            refer.current.value = ""
        }
    }

    return <>
        <Navbar/>
        <main className="container flex flex-col items-center px-2 w-screen h-full">
            <h1 className="font-flux text-[50px] font-bold text-gray-900 text-center mt-4 ">Send Secret Messages in Bubbles</h1>
            <p className="font-flux w-[90%] text-center text-lg mb-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam fugiat dolore, blanditiis itaque voluptate nam quas suscipit alias necessitatibus recusandae nobis animi dolores quidem iure hic consequuntur illo? Id, a!</p>
            <section className="w-[90%]">
                <Form {...form}  >
                    <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-8 ">
                        <FormField
                            name="content"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel className="text-lg font-medium">Enter your anonymous message 🤫 </FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="This must be a secret, we will keep it secret" {...field}
                                            className="min-h-24 h-24"
                                            ref={refer}
                                        // onChange={()=>setIsSent(false)}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This message will go to the user
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className=" flex items-center gap-2">
                            <Button type="submit"
                                className="w-full md:w-auto py-4 bg-gray-900 text-white font-semibold px-8 rounded-lg" >
                                {isSent ? (
                                    <>
                                        {<Loader2 className="animate-spin" ></Loader2>} Please wait
                                    </>
                                ) : (<>
                                    Send Secret Bubble
                                </>)}
                            </Button>
                            <Button type="button"
                            onClick={handleClearBox}
                            variant="outline"
                                className="w-full md:w-auto py-4 bg-red-600 text-white font-semibold px-8 rounded-lg" >
                                {
                                    <Trash2 />
                                }
                            </Button>
                        </div>
                    </form>
                </Form>
            </section>
        </main>
    </>
}