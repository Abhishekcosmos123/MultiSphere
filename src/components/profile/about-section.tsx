import { Card } from "@/components/ui/card"
import { PencilIcon } from "lucide-react"

interface AboutSectionProps {
  description: string
}

export default function AboutSection({ description }: AboutSectionProps) {
  return (
    <Card className="p-4 mb-4">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold mb-2">About</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <PencilIcon className="h-5 w-5" />
        </button>
      </div>
      <p className="text-gray-700 text-sm">{description}</p>
    </Card>
  )
}
