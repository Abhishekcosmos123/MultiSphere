import { Card } from "@/components/ui/card"
import { MapPinIcon } from "lucide-react"
import Image from "next/image"

interface Education {
  institution: string
  degree: string
  years: string
  location: string
}

interface EducationSectionProps {
  educations: Education[]
}

export default function EducationSection({ educations }: EducationSectionProps) {
  return (
    <Card className="p-4 mb-4">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold mb-2">Education</h2>
      </div>

      {educations.map((education, index) => (
        <div key={index} className="flex mt-4">
          <div className="mr-4">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Image src="/dav.png" alt={education.institution} width={32} height={32} />
            </div>
          </div>

          <div>
            <h3 className="font-semibold">{education.institution}</h3>
            <p className="text-sm text-gray-700">{education.degree}</p>
            <p className="text-sm text-gray-500">{education.years}</p>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <MapPinIcon className="h-4 w-4 mr-1" />
              <span>{education.location}</span>
            </div>
          </div>
        </div>
      ))}
    </Card>
  )
}
