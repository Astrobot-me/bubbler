'use client';

import React from "react";
import apiResponse from "@/types/apiResponse";
import { userValidator } from "@/schemas/userValidator";
import { useDebounceCallback } from "usehooks-ts";
import { useEffect, useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import Link from "next/link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Check, CheckCheck, CircleX, Loader2 } from "lucide-react";


export default function SignUp() {

  const [username, setUsername] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [usernameMessage, setUsernameMessage] = useState("")

  const { toast } = useToast()
  const router = useRouter()
  const debounce = useDebounceCallback(setUsername, 500)

  const form = useForm<z.infer<typeof userValidator>>({
    resolver: zodResolver(userValidator),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  })

  useEffect(() => {
    const checkUniqueUsername = async () => {
      setUsernameMessage("")
      if (username) {
        setIsChecking(true)
        try {
          const response = await axios.get<apiResponse>(`/api/verify-unique-user?username=${username}`)
          console.log("response : ", response);
          setUsernameMessage(response.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<apiResponse>
          setUsernameMessage(axiosError.response?.data.message ?? 'Error cheking Username')
        }
        setIsChecking(false)
      }
    }

    //calling the function
    checkUniqueUsername();


  }, [username])


  const OnSubmit = async (data: z.infer<typeof userValidator>) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post("/api/sign-up", data)

      // Handle more cases for toast
      toast({
        title: "Successfull ",
        description: "User Registered! Please verify"
      })
      router.replace(`/api/verify-code/${data.username}`)
      setIsSubmitting(false)

    } catch (error) {
      const axiosError = error as AxiosError<apiResponse>;
      let errorMessage = axiosError?.response?.data.message

      toast({
        title: "Some Error Occured",
        description: errorMessage,
        variant: "destructive"
      })
      setIsSubmitting(false)
    }
    finally {
      setIsChecking(false)
    }

  }

  return (
    <React.Fragment>
      <div className="flex justify-center items-center min-h-screen bg-gray-800">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">

            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
              Join Bubbler Message
            </h1>

            <p className="mb-4">Sign up to start your anonymous conversations</p>

            <Form {...form}>
              
                <form onSubmit={form.handleSubmit(OnSubmit)}
                  className="space-y-5">
                  <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start">
                        <FormLabel className="ml-3">Username</FormLabel>
                        
                          <Input placeholder="username" {...field} onChange={
                            (e) => {
                              field.onChange(e);
                              debounce(e.target.value)

                            }} />

                          {isChecking &&
                            <div className="flex flex-row space-x-2"><Loader2 className="animate-spin" /> checking </div>
                          }

                          {usernameMessage && <div className={
                            ` flex flex-row gap-1 items-center text-sm ${usernameMessage === "Username is unique" ? `text-green-500 ` : `text-red-500 `} `
                          }>
                            {usernameMessage === "Username is unique" ? (
                              <CheckCheck></CheckCheck>
                            ) : (
                              <CircleX></CircleX>
                            )}{usernameMessage} 

                          </div>}
                        
                        <FormDescription className="ml-3">
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className=" flex flex-col items-start ">
                        <FormLabel className="ml-3">Email</FormLabel>
                        <Input {...field} name="email" placeholder="xyz@bubbler.com" />
                        <p className='text-muted text-gray-600 text-sm ml-3'>We will send you a verification code</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start">
                        <FormLabel className="ml-3">Password</FormLabel>
                        <Input type="password" {...field} name="password" placeholder="1-9 A-z etc" />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isSubmitting}>

                    {
                      isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin w-4 h-4" /> 'Please wait'
                        </>
                      ) : ('Sign Up')
                    }

                  </Button>
                </form>
              
            </Form>

            <div className="text-center mt-4">
              <p>
                Already a member?{' '}
                <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
                  Sign in
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
