import { X } from "lucide-react"
import { useState } from "react"

export function SkillInput({ skills, setSkills }: { skills: string[], setSkills: (val: string[]) => void }) {
  const [input, setInput] = useState("")

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault()
      if (!skills.includes(input.trim())) {
        setSkills([...skills, input.trim()])
        setInput("")
      }
    } else if (e.key === "Backspace" && input === "" && skills.length) {
      setSkills(skills.slice(0, -1))
    }
  }

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-1">
      <label htmlFor="skills" className="block text-gray-700">Skills</label>
      <div className="flex flex-wrap items-center gap-2 border border-gray-300 rounded-md p-2 min-h-[48px]">
        {(skills || []).map((skill, i) => (
          <span key={i} className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-1">
            {skill}
            <button
              onClick={() => removeSkill(i)}
              className="text-gray-600 hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </span>
        ))}
        <input
          id="skills"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow focus:outline-none border-none text-sm"
          placeholder="Type a skill and press Enter"
        />
      </div>
    </div>
  )
}
