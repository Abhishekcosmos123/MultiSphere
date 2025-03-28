import { testimonial } from "@/lib/content";
import { QuoteIcon } from "lucide-react"
import Link from "next/link"

interface Testimonial {
  id: number;
  text: string;
  author: string;
  course: string;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[]
}

export function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  return (
    <div className="py-6 bg-white">
      <div className="px-4 mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center text-gray-900">{testimonial}</h2>

        <div className="grid grid-cols-1 gap-8 pt-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.length > 0 ? (
            testimonials.map((testimonial) => {
              const initials = testimonial.author
                .split(" ")
                .map((name) => name[0])
                .join("")
                .toUpperCase()

              return (
                <div key={testimonial.id} className="flex flex-col p-4 bg-white border border-gray-200 rounded-lg cursor-pointer">
                  <QuoteIcon className="w-8 h-8 mb-4 text-black transform rotate-180" />
                  
                  <p className="flex-1 text-gray-700 line-clamp-3">{testimonial.text}</p>
                  
                  <div className="flex items-center mt-6">
                    <div className="flex items-center justify-center w-10 h-10 text-sm font-bold text-white bg-gray-700 rounded-full">
                      {initials}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{testimonial.author}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <Link href="#" className="text-xs text-blue-500 hover:underline">
                      View the {testimonial.course} ›
                    </Link>
                  </div>
                </div>
              )
            })
          ) : (
            <p className="text-center text-gray-500">No testimonials available at this time.</p>
          )}
        </div>
      </div>
    </div>
  )
}
