'use client'

import { messageSchema } from "@/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation"
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTimeout } from "usehooks-ts";
import * as z from "zod"
import { useToast } from "@/hooks/use-toast";
import apiResponse from "@/types/apiResponse";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, SparklesIcon, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Navbar from '../../../components/Navbar'
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";


export default function SendMessage() {

    const [isSent, setIsSent] = useState(false);

    const messages = [
        "If you could instantly master any skill in the world, what would it be and how would you use it to spread joy?",
        "What's the most unexpectedly delightful thing that happened to you this week?",
        "What's the silliest thing you've ever done to make someone smile",
        "If you could instantly teleport to anywhere , where would you go ?"
    ];

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
                description: response.data.message
            })
            form.reset()
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

    const Clearfields = () => {
        console.log("clearing..");
        form.reset()
    }

    const timeoutRef = useTimeout(Clearfields, 700);

    return <>
        <Navbar />
        <main className="flex flex-col items-center  px-2 w-full  h-auto">
            <h1 className="font-flux text-[50px] font-bold text-gray-900 text-center mt-4 ">Send Secret Messages in Bubbles</h1>
            <p className="font-flux sm:w-[90%] w-[96%] text-center sm:text-lg text-sm mb-4">Sometimes the fear of judgment holds us back from genuine communication. Our platform removes these barriers, creating a space where honest conversations can flourish. Receive authentic feedback, engage in real discussions, and discover truths that might otherwise remain unspoken.</p>
            <section className="w-[90%] mb-2">
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
                        <div className=" flex items-center w-full gap-2">
                            <Button type="submit"
                                className="w-full md:w-auto py-4 bg-black text-white font-semibold px-8 rounded-lg"  >
                                {isSent ? (
                                    <>
                                        {<Loader2 className="animate-spin" ></Loader2>} Please wait
                                    </>
                                ) : (<>
                                    Send Secret Bubble
                                </>)}
                            </Button>
                            <Button type="button"
                                onClick={() => form.reset()}
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
            <section className="flex flex-row sm:flex-col items-center  px-2 w-full  sm:h-screen h-auto mb-12 mt-10">
                <div className="p-2 w-[94%]  mx-auto border rounded-lg shadow-lg bg-white">
                    <div className="flex sm:flex-row flex-col gap-3 items-center sm:justify-between mb-6 py-4 px-2">
                        <h2 className="text-3xl sm:w-[60%]  font-bold sm:text-left text-center font-flux">Auto Suggest Messeges</h2>
                        <p className="text-sm italic sm:w-[33%] w-full sm:text-left text-center" >**This features is yet to be fully implemented </p>
                        <Button className="w-full sm:w-[40%] flex items-center gap-2" disabled>
                            <SparklesIcon className="w-4 h-4" />
                            Suggest Message
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        {messages.map((message, index) => (
                            <Card
                                key={index}
                                className="transition-all duration-300 hover:shadow-lg border-2 hover:border-4"
                            >
                                <CardContent className="pt-6">
                                    <p className="text-gray-800">
                                        {message}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </main>

        <Footer />
    </>
}