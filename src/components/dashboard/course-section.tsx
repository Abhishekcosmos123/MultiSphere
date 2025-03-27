import { Star } from "lucide-react";
import Image from "next/image";
interface Course {
  image: string;
  title: string;
  description: string;
  instructors: string;
  rating: number;
  ratingsCount: number;
  totalHours: number;
  lectures: number;
  level: string;
  price: number;
  originalPrice: number;
}

const CourseSection = ({
  image,
  title,
  description,
  instructors,
  rating,
  ratingsCount,
  totalHours,
  lectures,
  level,
  price,
  originalPrice,
}: Course) => {
  return (
    <div className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="relative aspect-[4/3]">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://via.placeholder.com/600x400/eeeeee/999999?text=Course+Image";
          }}
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600 text-sm">{description}</p>
        <p className="text-gray-500 text-xs mt-1">{instructors}</p>
        
        <div className="flex items-center space-x-2 mt-2 text-gray-700 text-sm">
          <span className="bg-gray-100 px-2 py-1 rounded-md">Course</span>
          <span className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500" /> {rating}
          </span>
          <span>{ratingsCount} ratings</span>
        </div>

        <div className="flex flex-wrap gap-2 mt-3 text-gray-700 text-sm">
          <span className="bg-gray-100 px-2 py-1 rounded-md">{totalHours} total hours</span>
          <span className="bg-gray-100 px-2 py-1 rounded-md">{lectures} lectures</span>
          <span className="bg-gray-100 px-2 py-1 rounded-md">{level}</span>
        </div>

        <div className="mt-4 flex items-center space-x-2">
          <span className="text-xl font-bold">₹{price}</span>
          <span className="text-gray-400 line-through">₹{originalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseSection;
