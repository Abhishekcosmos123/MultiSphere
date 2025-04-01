import Image from "next/image"
import { Star } from "lucide-react"

interface CourseCardProps {
  title: string
  instructors: string
  rating: number
  reviewCount: string
  students: string
  price: number
  originalPrice: number
  image: string
  bestseller?: boolean
}

export function CourseCard({
  title,
  instructors,
  rating,
  reviewCount,
  students,
  price,
  originalPrice,
  image,
  bestseller = false,
}: CourseCardProps) {
  return (
    <div className="flex flex-col overflow-hidden bg-white border border-gray-200 rounded-lg">
      <div className="relative aspect-video">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = "https://via.placeholder.com/600x400/eeeeee/999999?text=Course+Image"
          }}
        />
      </div>

      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-bold text-gray-900 line-clamp-2">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{instructors}</p>

        <div className="flex items-center mt-1">
          <span className="mr-1 font-bold text-amber-700">{rating}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? "text-red-500 fill-red-500" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="ml-1 text-xs text-gray-600">({reviewCount})</span>
        </div>

        <p className="mt-1 text-xs text-gray-600">{students} students</p>

        <div className="flex items-center mt-auto">
          <span className="font-bold text-gray-900">${price}</span>
          <span className="ml-2 text-sm text-gray-500 line-through">${originalPrice}</span>
        </div>

        {bestseller && (
          <div className="absolute top-2 left-2 px-2 py-1 text-xs font-bold text-white bg-yellow-500">Bestseller</div>
        )}
      </div>
    </div>
  )
}

