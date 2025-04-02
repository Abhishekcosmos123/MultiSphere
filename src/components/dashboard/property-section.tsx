"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { PropertyCard } from "./property-card"
import CourseSection from "./course-section"
import { courses } from "@/lib/content"

interface Property {
  id: string | number
  price: number
  beds: number
  baths: number
  sqft: number
  address: string
  city: string
  state: string
  zip: string
  type: string
  image: string
  new: boolean
}

interface Module {
  id: number;
  name: string;
}

interface PropertySectionProps {
  title: string
  location: string
  properties: Property[]
  selectedModule: Module
}

export function PropertySection({ title, location, properties, selectedModule }: PropertySectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      })

      setScrollPosition(scrollTo)
    }
  }

  return (
    <div className="py-6 bg-white">
      <div className="px-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="mt-1 text-sm text-gray-600">View all in {location}</p>
          </div>
        </div>

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
            {selectedModule?.name === "Real Estate" ? (
              properties.map((property) => (
                <div key={property.id} className="w-64 flex-shrink-0">
                  <PropertyCard
                    price={property.price}
                    beds={property.beds}
                    baths={property.baths}
                    sqft={property.sqft}
                    address={property.address}
                    city={property.city}
                    state={property.state}
                    zip={property.zip}
                    type={property.type}
                    image={property.image}
                    new={property.new}
                  />
                </div>
              ))
            ) : (
              courses.map((course, index) => (
                <div key={index} className="w-64 flex-shrink-0">
                  <CourseSection {...course} />
                </div>
              ))
            )}
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
