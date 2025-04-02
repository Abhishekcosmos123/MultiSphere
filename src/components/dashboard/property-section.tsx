"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import CourseSection from "./course-section"

interface Module {
  id: number;
  name: string;
}

interface PropertySectionProps {
  title: string
  location: string
  properties: any[]
  selectedModule: Module
}

export function PropertySection({ title, location, properties, selectedModule }: PropertySectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
      setScrollPosition(scrollTo)
    }
  }

  return (
    <div className="py-6 bg-white">
      <div className="px-4 mx-auto max-w-7xl">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="mt-1 text-sm text-gray-600">View all in {location}</p>
          </div>
        </header>

        <div className="relative flex items-center mt-4">
          <button
            className="absolute left-0 z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md"
            onClick={() => scroll("left")}
            disabled={scrollPosition <= 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
          >
            {properties.map((item, index) => (
              <div key={index} className="w-64 flex-shrink-0">
                <CourseSection {...item} selectedModuleName={selectedModule?.name} />
              </div>
            ))}
          </div>

          <button
            className="absolute right-0 z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}
