"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/ui/button";

export const NavigationBar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg"
              alt="Udemy Logo"
              className="h-8"
            />
          </Link>
          <Button variant="outline" className="text-sm px-4 py-2">
            My Learnings
          </Button>
          <Link href="/restaurant">
            <Button variant="outline" className="text-sm px-4 py-2">
              Restaurant
            </Button>
          </Link>
          <Button variant="outline" className="text-sm px-4 py-2">
            Contact Us
          </Button>
        </div>

        <nav className="hidden md:flex items-center gap-4">
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
