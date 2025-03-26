"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { fetchCourses, Course } from "@/lib/api"
import { Badge } from "@/ui/badge"
import { Button } from "@/ui/button"
import { categories, popularTopics } from "@/lib/content"

export function CategorySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Data Science")
  const [selectedTopic, setSelectedTopic] = useState<string>("Data Science")
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true)
      try {
        const data = await fetchCourses(selectedCategory, selectedTopic)
        setCourses(data)
      } catch (error) {
        console.error("Failed to fetch courses:", error)
      } finally {
        setLoading(false)
      }
    }
    loadCourses()
  }, [selectedCategory, selectedTopic])

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-6 md:py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">All the skills you need in one place</h1>
        <p className="text-lg text-gray-600 mt-2">
          From critical skills to technical topics, Cosmostaker supports your professional development.
        </p>
      </section>

      {/* Category Tabs */}
      <section className="container mx-auto px-4 border-b border-gray-200 py-4">
        <div className="flex overflow-x-auto pb-2 gap-8 scrollbar-hide">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`whitespace-nowrap pb-2 px-1 font-medium hover:text-gray-900 ${category === selectedCategory ? "border-b-2 border-gray-900 text-gray-900" : "text-gray-700"
                }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Popular Topics */}
      <section className="container mx-auto px-4 py-4">
        <div className="relative">
          <div className="flex overflow-x-auto gap-2 pb-3 scrollbar-hide">
            {popularTopics.map((topic, index) => (
              <div
                key={index}
                className={`flex-shrink-0 rounded-full px-3 py-1.5 border cursor-pointer ${topic.name === selectedTopic ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                onClick={() => setSelectedTopic(topic.name)}
              >
                <div className="font-medium">{topic.name}</div>
                <div className="text-xs">{topic.count}</div>
              </div>
            ))}
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 shadow-md rounded-full">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="container mx-auto px-4 py-4">
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="relative">
            {courses.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
                <p className="text-gray-600 mt-2">Try selecting a different category or topic</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {courses.map((course: Course) => (
                  <Card key={course.id} className="relative overflow-hidden border border-gray-200">
                    {/* Badge for New Courses */}
                    {course.isNew && (
                      <Badge className="absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white bg-blue-500">
                        New
                      </Badge>
                    )}
                    <div className="aspect-video relative">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-bold text-gray-900 line-clamp-2">{course.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{course.instructors}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-amber-500 font-bold">{course.rating}</span>
                        <div className="flex ml-1">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(course.rating)
                                    ? "text-amber-500 fill-amber-500"
                                    : "text-gray-300 fill-gray-300"
                                  }`}
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                              </svg>
                            ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">({course.reviews.toLocaleString()})</span>
                      </div>
                      <div className="mt-2">
                        <span className="font-bold">₹{course.price}</span>
                        <span className="text-gray-500 line-through ml-2">₹{course.originalPrice}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 pt-0 flex gap-2">
                      {course.badges.map((badge, index) => (
                        <Badge
                          key={index}
                          className={`${badge === "Premium"
                              ? "bg-indigo-600 hover:bg-indigo-700"
                              : "bg-teal-100 text-teal-800 hover:bg-teal-200"
                            }`}
                        >
                          {badge}
                        </Badge>
                      ))}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
            {courses.length > 0 && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 shadow-md rounded-full">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  )
}