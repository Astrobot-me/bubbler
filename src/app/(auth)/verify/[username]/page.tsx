'use client';

import React from "react";
import { Button } from '../../../../components/ui/button'
import * as z from 'zod'
import { verifySchema } from "@/schemas/verifySchema";
import axios, { AxiosError } from "axios";
import apiResponse from "@/types/apiResponse";
import { useToast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { useEffect, useState } from "react";



export default function SignIn() {

  const [username, setUsername] = useState("")
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: '',
      username: ""
    }
  })

  const params = useParams<{ username: string }>()
  console.log("username",params);
  
  
  if(params.username){
    
    // setUsername(params.username)
  }


  useEffect(() => {
    const checkVerified = async () => {
      if (params.username) {
        try {
          const response = await axios.get(`/api/getverification?username=${params.username}`)
          if (response.data.message) {
            router.push("/") // pushes to home
          }
         
        } catch (error) {
            toast({
              title:"Some Error Occured",
              variant:"destructive"
            })
            router.replace("/sign-in")
        }
        
      }
    }

    checkVerified()
    
  }, [params.username])


  const OnSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {

      const response = await axios.post("/api/verify-code", {
        verifyCode: data.code,
        username: params.username
      })

      toast({
        title: "User verification successfull",
        description: response.data.message
      })

      router.replace("/sign-in")

    } catch (error) {
      const axiosError = error as AxiosError<apiResponse>;
      console.log("AxiosError",axiosError);
      toast({
        title: "Some Error Occured",
        description: axiosError?.response?.data?.message,
        variant: "destructive"
      })

    }
  }

  return (
    <React.Fragment>
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
              Verify Your Account
            </h1>
            <p className="mb-4">Enter the verification code sent to your email</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-6">
              <FormField
                name="code"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-xl">Verification Code</FormLabel>
                    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Verify</Button>
            </form>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
}
