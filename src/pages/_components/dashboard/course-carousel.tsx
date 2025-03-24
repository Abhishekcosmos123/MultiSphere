"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CourseCard } from "../../_components/dashboard/course-card"
import { Button } from "@/ui/button"

interface CourseCarouselProps {
  title: string
  courses: any[]
}

export function CourseCarousel({ title, courses }: CourseCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      })

      setScrollPosition(scrollTo)
    }
  }

  return (
    <div className="py-8">
      <div className="px-2 mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

        <div className="relative flex items-center mt-6">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md"
            onClick={() => scroll("left")}
            disabled={scrollPosition <= 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <div
            ref={scrollRef}
            className="flex gap-4 px-12 overflow-x-auto scrollbar-hide scroll-smooth"
            onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
          >
            {courses.map((course) => (
              <div key={course.id} className="w-64 flex-shrink-0">
                <CourseCard
                  title={course.title}
                  instructors={course.instructors}
                  rating={course.rating}
                  reviewCount={course.reviewCount}
                  students={course.students}
                  price={course.price}
                  originalPrice={course.originalPrice}
                  image={course.image}
                  bestseller={course.bestseller}
                />
              </div>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
