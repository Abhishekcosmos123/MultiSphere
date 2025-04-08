import { Card } from "@/components/ui/card"

interface AboutSectionProps {
  description: string
}

export default function AboutSection({ description }: AboutSectionProps) {
  return (
    <Card className="p-4 mb-4">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold mb-2">About</h2>
      </div>
      <p className="text-gray-700 text-sm">{description}</p>
    </Card>
  )
}
