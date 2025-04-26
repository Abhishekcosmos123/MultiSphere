"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { CourseCard } from "@/components/dashboard/course-card"
import { Button } from "@/components/ui/button"
import { AddProductModal, type ProductField } from "./add-product-modal"
import { StorageKeys, storage } from "@/lib/utils/storage"
import { createProductRequest } from "@/store/slices/productSlice"
import { useDispatch } from "react-redux"

interface Course {
  id: string | number
  title: string
  instructors: string[]
  rating: number
  reviewCount: number
  students: number
  price: number
  originalPrice: number
  image: string
  bestseller?: boolean
}

interface CourseCarouselProps {
  title: string
  courses: Course[]
  module: string
  profile?: boolean
  productDetailsFields: ProductField[]
  productInformation: ProductField[]
}

export function CourseCarousel({
  title,
  courses,
  module,
  profile,
  productDetailsFields,
  productInformation,
}: CourseCarouselProps) {
  const dispatch = useDispatch();
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }

    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [isModalOpen])

  const storedUser = storage.getJson(StorageKeys.USER)

  const handleAddProduct = (formData: FormData) => {
    const courseData = {
      title: (formData.get("title") as string),
      short_Description: formData.get("shortDescription") as string,
      rating: parseFloat(formData.get("ratings") as string),
      courseLength: formData.get("courseLength") as string,
      courseChapters: parseInt(formData.get("courseChapters") as string),
      image:
        formData.get("image") instanceof File
          ? URL.createObjectURL(formData.get("image") as File)
          : (formData.get("image") as string) || "/placeholder.svg?height=200&width=300",
      price: parseFloat(formData.get("price") as string),
      originalPrice: parseFloat(formData.get("price") as string),
      postedBy: formData.get("postedBy") as string,
      category: formData.get("category") as string,
      topic: formData.get("topic") as string,
      media: formData.get("media") as string,
      postedDate: formData.get("postedDate") as string,
      language: formData.get("language") as string,
      totalRatings: parseInt(formData.get("totalRatings") as string),
      totalLearners: parseInt(formData.get("totalLearners") as string),
      learnings: formData.get("learnings") as string,
      skills: formData.get("skills") as string,
      inclusions: formData.get("inclusions") as string,
      courseContent: formData.get("courseContent") as string,
      prerequisites: formData.get("prerequisites") as string,
      longDescription: formData.get("longDescription") as string,
      reviews: formData.get("reviews") as string,
      moreFromTrainer: formData.get("moreFromTrainer") as string,
      similarCourses: formData.get("similarCourses") as string,
      practiceQuiz: formData.get("practiceQuiz") as string,
      reviewCount: 0,
      students: 0,
    };

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value instanceof File ? `File: ${value.name}` : value)
    }

    const formDataToSend = new FormData();
      Object.entries(courseData).forEach(([key, value]) => {
        formDataToSend.append(key, value as string);
      });

dispatch(createProductRequest(formDataToSend));


    // dispatch(createProductRequest(courseData))
    setIsModalOpen(false)
  }

  return (
    <div className="py-6">
      <div className={`px-2 mx-auto ${profile ? "" : "max-w-7xl"}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{profile ? title.replace("Trending", "My") : title}</h2>
          <Button
            variant="secondary"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 text-gray-700 hover:text-black"
          >
            <Plus className="w-5 h-5" /> Add New Product
          </Button>
        </div>

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
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
          >
            {courses.map((course) => (
              <div key={course.id} className="w-64 flex-shrink-0 cursor-pointer">
                <CourseCard
                  title={course.title}
                  instructors={course.instructors.join(", ")}
                  rating={course.rating}
                  reviewCount={course.reviewCount.toString()}
                  students={course.students.toString()}
                  price={course.price}
                  originalPrice={course.originalPrice}
                  image={course.image}
                  bestseller={course.bestseller}
                  module={module}
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

      {/* {storedUser.role === "producer" && ( */}
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProduct={handleAddProduct}
        productDetailsFields={productDetailsFields}
        productInformation={productInformation}
      />
      {/* )} */}
    </div>
  )
}
