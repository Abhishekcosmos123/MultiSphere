import { useState } from "react"
import { Card } from "@/components/ui/card"

interface AboutSectionProps {
  description?: string | null
}

export default function AboutSection({ description }: AboutSectionProps) {

  if (!description || description === "null" || description === "undefined") return null;

  const [expanded, setExpanded] = useState(false)
  const MAX_LENGTH = 500

  const isLongText = description.length > MAX_LENGTH
  const displayText = expanded ? description : description.slice(0, MAX_LENGTH)

  return (
    <Card className="p-4 mb-4">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold mb-2">About</h2>
      </div>
      <p className="text-gray-700 text-sm">
        {displayText}
        {isLongText && !expanded && "... "}
        {isLongText && (
          <button
            onClick={() => setExpanded(prev => !prev)}
            className="text-blue-600 hover:underline inline ml-1"
          >
            {expanded ? "See Less" : "See More"}
          </button>
        )}
      </p>
    </Card>
  )
}
