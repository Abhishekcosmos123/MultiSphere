import { Card } from "@/components/ui/card"
import { PencilIcon } from "lucide-react"

interface SkillsSectionProps {
  skills: string[]
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <Card className="p-4 mb-4">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold mb-2">Skills</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <PencilIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
            {skill}
          </span>
        ))}
      </div>
    </Card>
  )
}
