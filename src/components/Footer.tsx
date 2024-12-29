'use client'
import React from 'react';
import { Github , Twitter, Linkedin, Heart, Mail, MessageSquare,AtSign, Copyright } from 'lucide-react';
import Link from 'next/link';

export default function Footer(){
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Logo and App Name Section */}
        <div className="flex items-center justify-center mb-6">
          <AtSign className="h-8 w-8 text-white mr-2" />
          <span className="text-2xl font-bold font-flux bg-white bg-clip-text text-transparent">
            Bubbler Messenger
          </span>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-6">
          <Link href="https://github.com/astrobot-me" className="text-white transition-colors duration-300"  target='_blank' prefetch={true}>
            <Github className="h-6 w-6" />
          </Link>
          <Link href="https://x.com/astrobot_me" className="text-white transition-colors duration-300" target='_blank' prefetch={true}>
            <Twitter className="h-6 w-6" />
          </Link>
          <Link href="https://linkedin.com/in/astro-adityaraj" className="text-white transition-colors duration-300" target='_blank' prefetch={true}>
            <Linkedin className="h-6 w-6" />
          </Link>
          <Link href="mailto:autobot268@gmail.com" className="text-white transition-colors duration-300" target='_blank' prefetch={true}>
            <Mail className="h-6 w-6" />
          </Link>
        </div>

        {/* Links Section */}
        

        {/* Made with Love Section */}
        <div className="flex items-center justify-center text-sm text-gray-400">
          <span>Made with</span>
          <Heart className="h-4 w-4 mx-1 text-red-500 fill-current" />
          <span>by</span>
          <Link 
            href="https://github.com/astrobot-me" 
            className="ml-1 font-medium text-white transition-colors duration-300"
          >
            Aditya (Astrobot)
          </Link>
        </div>
        <div className="flex items-center justify-center text-sm mt-1 text-gray-400">
          
          <Copyright className="h-4 w-4 mx-1 " />
          <span>All Copyrights reserved 2024</span>
          
        </div>
      </div>
    </footer>
  );
};

