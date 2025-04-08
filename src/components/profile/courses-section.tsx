import { useRef } from "react"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

interface Course {
  title: string
  platform: string
  details: string
  ratings: string
  students: string
  price: string
  image: string
}

interface CoursesSectionProps {
  courses: Course[]
}

export default function CoursesSection({ courses }: CoursesSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
    }
  }

  return (
    <Card className="p-4 mb-4 relative">
      <h2 className="text-xl font-bold mb-4">My courses (86)</h2>

      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-[50%] transform -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-[50%] transform -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
      >
        <FaChevronRight />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
      >
        {courses.map((course, index) => (
          <div
            key={index}
            className="w-1/4 min-w-[220px] border border-gray-200 rounded-lg overflow-hidden flex-shrink-0 bg-white"
          >
            <div className="relative h-40 w-full">
              <Image
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-3">
              <h3 className="font-medium text-sm line-clamp-2">{course.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{course.details}</p>

              <div className="flex items-center mt-2">
                <span className="text-xs font-medium">{course.ratings}</span>
                <div className="flex text-yellow-400 ml-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xs">★</span>
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1">({course.students})</span>
              </div>

              <p className="font-bold text-sm mt-2">{course.price}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
