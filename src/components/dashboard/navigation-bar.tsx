"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, Globe } from "lucide-react";
import { Button } from "@/ui/button";
import React, { useState } from "react";
import { buttons } from "@/lib/content";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ProfileDropdown } from "./ProfileDropdown";

export const NavigationBar: React.FC = () => {
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(null);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleButtonClick = (index: number) => {
    setActiveButtonIndex(index);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="container flex items-center justify-between h-16 px-6 mx-auto">
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
          {buttons.map((button) => (
            <Button 
              key={button.index} 
              variant="ghost" 
              className={`text-sm px-4 py-2 transition-colors duration-200 ${activeButtonIndex === button.index ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`} 
              onClick={() => handleButtonClick(button.index)}
            >
              {button.label}
            </Button>
          ))}
        </div>

        <nav className="hidden md:flex items-center gap-4"> 
          <Link href="#" className="text-gray-700 hover:text-gray-900">
            <Heart className="w-6 h-6" />
          </Link>
          <Link href="#" className="text-gray-700 hover:text-gray-900">
            <Globe className="w-6 h-6" />
          </Link>
          <Link href="#" className="text-gray-700 hover:text-gray-900">
            <ShoppingCart className="w-6 h-6" />
          </Link>
          {isAuthenticated && user ? (
            <ProfileDropdown user={user} />
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="text-sm px-4 py-2 border-blue-600 text-blue-600 hover:bg-blue-100"
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
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
