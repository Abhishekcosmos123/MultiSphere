import { Card } from "@/components/ui/card"
import { PencilIcon, MapPinIcon } from "lucide-react"
import Image from "next/image"

interface Experience {
  role: string
  company: string
  type: string
  duration: string
  location: string
  logo: string
  skills?: string[]
  additionalInfo?: string
}

interface ExperienceSectionProps {
  experiences: Experience[]
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <Card className="p-4 mb-4">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold mb-2">Experience</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <PencilIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-6">
        {experiences.map((experience, index) => (
          <div key={index} className="flex">
            <div className="mr-4">
              <div className="h-12 w-12 bg-white border border-gray-200 rounded flex items-center justify-center">
                <Image src={experience.logo || "/placeholder.svg"} alt={experience.company} width={32} height={32} />
              </div>
            </div>

            <div>
              <h3 className="font-semibold">{experience.role}</h3>
              <p className="text-sm text-gray-700">
                {experience.company} · {experience.type}
              </p>
              <p className="text-sm text-gray-500">{experience.duration}</p>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPinIcon className="h-4 w-4 mr-1" />
                <span>{experience.location}</span>
              </div>

              {experience.additionalInfo && <p className="text-sm text-gray-700 mt-2">{experience.additionalInfo}</p>}

              {experience.skills && (
                <div className="mt-2">
                  {experience.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="inline-flex items-center mr-2 text-sm text-blue-600">
                      <span className="mr-1">•</span> {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
