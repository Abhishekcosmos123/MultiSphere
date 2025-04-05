"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart, Globe, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type React from "react"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { ProfileDropdown } from "./ProfileDropdown"

interface Button {
  index: number;
  label: string;
}

export const NavigationBar: React.FC<{ buttons?: Button[] }> = ({ buttons = [] }) => {
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(null)
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleButtonClick = (index: number) => {
    setActiveButtonIndex(index)
    setIsMenuOpen(false)  
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Close menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const renderIcons = () => (
    <div className="hidden sm:flex items-center">
      <Link href="#" className="p-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-200 h-10 w-10 flex items-center justify-center">
        <Heart className="w-5 h-5" />
        <span className="sr-only">Wishlist</span>
      </Link>
      <div className="mx-1" />  
      <Link href="#" className="p-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-200 h-10 w-10 flex items-center justify-center">
        <Globe className="w-5 h-5" />
        <span className="sr-only">Language</span>
      </Link>
      <div className="mx-1" />  
      <Link href="#" className="p-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition duration-200 h-10 w-10 flex items-center justify-center">
        <ShoppingCart className="w-5 h-5" />
        <span className="sr-only">Cart</span>
      </Link>
    </div>
  );

  const renderAuthButtons = () => (
    <div className="flex items-center space-x-1 sm:space-x-2">
      <Link href="/login">
        <Button
          variant="outline"
          size="sm"
          className="text-xs sm:text-sm border-blue-600 text-blue-600 hover:bg-blue-100"
        >
          Log in
        </Button>
      </Link>
      <Link href="/signup">
        <Button variant="outline" size="sm" className="text-xs sm:text-sm border-blue-600 text-blue-600 hover:bg-blue-100">
          Sign up
        </Button>
      </Link>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200 w-full">
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4">
        {/* Desktop navigation */}
        <div className="flex items-center justify-between h-16 relative">
          {/* Logo and mobile menu button */}
          <div className="flex items-center shrink-0">
            <button
              className="md:hidden flex items-center justify-center mr-2"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
            </button>
            <Link href="/" className="flex items-center shrink-0">
              <Image src="/logo.png" alt="Logo" width={50} height={40} className="h-8 w-auto" />
            </Link>
          </div>

          {/* Navigation links - desktop only */}
          <nav className="hidden md:flex items-center space-between flex-1 mx-4 overflow-x-auto">
            <div className="flex items-center space-x-1">
              {buttons.length > 0 && buttons.map((button) => (
                <Button
                  key={button.index}
                  variant="ghost"
                  className={`text-sm px-2 lg:px-3 py-1 whitespace-nowrap transition-colors duration-200 ${
                    activeButtonIndex === button.index ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => handleButtonClick(button.index)}
                >
                  {button.label}
                </Button>
              ))}
            </div>
          </nav>

          <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
            {renderIcons()}
            {isAuthenticated && user ? (
              <ProfileDropdown user={{ name: user.name , profileImage: user.profileImage }} />
            ) : (
              renderAuthButtons()
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-16 bg-white border-b border-gray-200 shadow-lg z-50">
            <div className="flex flex-col p-4 space-y-4">
              <div className="flex flex-col space-y-2">
                {buttons.length > 0 && buttons.map((button) => (
                  <Button
                    key={button.index}
                    variant="ghost"
                    className={`text-sm px-4 py-1 justify-start transition-colors duration-200 ${
                      activeButtonIndex === button.index ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => handleButtonClick(button.index)}
                  >
                    {button.label}
                  </Button>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {renderIcons()}
                </div>

                {isAuthenticated && user && user.email ? (
                  <div className="py-2">
                    <ProfileDropdown user={{ name: user.name, profileImage: user.profileImage }} />
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {renderAuthButtons()}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
