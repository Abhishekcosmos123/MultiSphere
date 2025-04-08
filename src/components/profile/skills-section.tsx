import { Card } from "@/components/ui/card"

interface SkillsSectionProps {
  skills: string[]
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <Card className="p-4 mb-4">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold mb-2">Skills</h2>
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
