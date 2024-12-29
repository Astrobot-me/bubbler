'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { signinSchema } from "@/schemas/signinSchema";
import * as z from "zod";
import { signIn, SignInResponse } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, Loader2 } from "lucide-react";


export default function SignIn() {

    const [isClicked,setIsClicked] = useState(false)

    const router = useRouter()
    const form = useForm<z.infer<typeof signinSchema>>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            identifier: "",
            password: ""
        }
    })

    const { toast } = useToast();


    const OnSubmit = async (data: z.infer<typeof signinSchema>) => {
        const result  = await signIn('credentials', {
            redirect: false,
            identifier: data.identifier.toLowerCase(),
            password: data.password
        }) 

        // console.log("Result object ::",result);

        if(!result){
            setIsClicked(false)
            toast({
                title: 'Login Failed',
                description: 'Some Internal Error Occured, Please Try again later ! ',
                variant: 'destructive',
            });
        }
        

        if (result?.error) {
            setIsClicked(false)
            if (result.error === 'CredentialsSignin') {
                toast({
                    title: 'Login Failed',
                    description: 'Incorrect username or password',
                    variant: 'destructive',
                });
            } else {
                toast({
                    title: 'Error',
                    description: result.error,
                    variant: 'destructive',
                });
            }
        }

        if (result && (result.url || result.ok)) {
            toast({
                title:"Sign In Successful!"
            })
            router.replace('/dashboard');
        }
    }

    return (
        <React.Fragment>

            <div className="flex justify-center items-center min-h-screen bg-gray-800">
                <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                            Welcome Back to Bubbler Messenger
                        </h1>
                        <p className="mb-4">Sign in to continue your secret conversations</p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-6">
                            <FormField
                                name="identifier"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email/Username</FormLabel>
                                        <Input {...field} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <Input type="password" {...field} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className='w-full' type="submit" onClick={()=>setIsClicked(true)}>

                            {isClicked ? (
                                    <>
                                        {<Loader2 className="animate-spin" ></Loader2>} Please wait
                                    </>
                                ) : (<>
                                    Sign In
                                </>)}
                            </Button>
                        </form>
                    </Form>
                    <div className="text-center flex flex-col items-center gap-2 mt-4">
                        <p>
                            Not a member yet?{' '}
                            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
                                Sign up
                            </Link>
                        </p>
                        <p className="flex flex-row gap-1">
                            Go to Home{' '}
                            <Link href="/" className="text-blue-600 hover:text-blue-800">
                                <Home></Home>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}