import { QuoteIcon } from "lucide-react"
import Link from "next/link"

interface TestimonialSectionProps {
  testimonials: { id: number; text: string; author: string; course: string }[]
}

export function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  return (
    <div className="py-8 bg-white"> {/* Reduced padding from py-16 to py-8 */}
      <div className="px-4 mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center text-gray-900">See what others are achieving through learning</h2>

        <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => {
            const initials = testimonial.author
              .split(" ")
              .map((name) => name[0])
              .join("")
              .toUpperCase()

            return (
              <div key={testimonial.id} className="flex flex-col p-4 bg-white border border-gray-200 rounded-lg"> {/* Reduced padding from p-6 to p-4 */}
                <QuoteIcon className="w-8 h-8 mb-4 text-black transform rotate-180" />
                
                <p className="flex-1 text-gray-700">{testimonial.text}</p>
                
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
          })}
        </div>
      </div>
    </div>
  )
}
