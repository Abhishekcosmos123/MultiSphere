"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, Globe } from "lucide-react";
import { Button } from "@/ui/button";
import React, { useState } from "react";

export const NavigationBar: React.FC = () => {
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(null);

  const handleButtonClick = (index: number) => {
    setActiveButtonIndex(index);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={40}
              className="h-8"
            />
          </Link>
          <Button 
            variant="ghost" 
            className={`text-sm px-4 py-2 ${activeButtonIndex === 0 ? 'bg-blue-200 text-dark-blue' : ''}`} 
            onClick={() => handleButtonClick(0)}
          >
            My Learnings
          </Button>
          <Button 
            variant="ghost" 
            className={`text-sm px-4 py-2 ${activeButtonIndex === 1 ? 'bg-blue-200 text-dark-blue' : ''}`} 
            onClick={() => handleButtonClick(1)}
          >
            Live Classes
          </Button>
          <Button 
            variant="ghost" 
            className={`text-sm px-4 py-2 ${activeButtonIndex === 2 ? 'bg-blue-200 text-dark-blue' : ''}`} 
            onClick={() => handleButtonClick(2)}
          >
            Teach on CU
          </Button>
          <Button 
            variant="ghost" 
            className={`text-sm px-4 py-2 ${activeButtonIndex === 3 ? 'bg-blue-200 text-dark-blue' : ''}`} 
            onClick={() => handleButtonClick(3)}
          >
            Pricing & Subscriptions
          </Button>
          <Button 
            variant="ghost" 
            className={`text-sm px-4 py-2 ${activeButtonIndex === 4 ? 'bg-blue-200 text-dark-blue' : ''}`} 
            onClick={() => handleButtonClick(4)}
          >
            Trainings & Certificates
          </Button>
          <Button 
            variant="ghost" 
            className={`text-sm px-4 py-2 ${activeButtonIndex === 5 ? 'bg-blue-200 text-dark-blue' : ''}`} 
            onClick={() => handleButtonClick(5)}
          >
            Contact Us
          </Button>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <Link href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            <Heart className="w-5 h-5" />
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            <Globe className="w-5 h-5" />
          </Link>
          <Link href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            <ShoppingCart className="w-5 h-5" />
          </Link>
          <Link href="/login">
            <Button
              variant="outline"
              className="text-sm px-4 py-2 border-blue-600 text-blue-600"
            >
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              variant="primary"
              className="rounded-md"
            >
              Sign up
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavigationBar;
