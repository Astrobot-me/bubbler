'use client';


import React from "react";
import apiResponse from "@/types/apiResponse";
import { useDebounceCallback } from "usehooks-ts";
import { useEffect,useState } from "react";
import * as z from 'zod';
// import 
import { Button } from "@/components/ui/button";


export default function SignUp() {
  return (
    <React.Fragment>
      <div className="font-bold">this is a sign up page</div>
      <Button > this is button </Button>
    </React.Fragment>
  );
}
