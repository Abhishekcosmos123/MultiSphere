import { Card } from "@/components/ui/card"
import Image from "next/image"

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
  return (
    <Card className="p-4 mb-4">
      <h2 className="text-xl font-bold mb-4">My courses (86)</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((course, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="relative h-32">
              <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
            </div>

            <div className="p-3">
              <h3 className="font-medium text-sm line-clamp-2">{course.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{course.details}</p>

              <div className="flex items-center mt-2">
                <span className="text-xs font-medium">{course.ratings}</span>
                <div className="flex text-yellow-400 ml-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xs">
                      ★
                    </span>
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
