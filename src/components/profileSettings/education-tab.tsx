"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { EducationEntry } from "../../../types/profile"

export default function EducationTab() {
  const [educationList, setEducationList] = useState<EducationEntry[]>([
    {
      universityLogo: null,
      universityName: "",
      courseName: "",
      timePeriod: "",
      courseDescription: "",
    },
  ])

  return (
    <div className="space-y-8 w-full">
      {educationList.map((edu, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full border p-4 rounded-lg bg-gray-50 relative"
        >
          {/* Delete Button */}
          <button
            onClick={() => {
              const updated = educationList.filter((_, i) => i !== index)
              setEducationList(
                updated.length
                  ? updated
                  : [
                      {
                        universityLogo: null,
                        universityName: "",
                        courseName: "",
                        timePeriod: "",
                        courseDescription: "",
                      },
                    ],
              )
            }}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 text-gray-500 hover:text-red-500"
            aria-label="Delete education entry"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>

          {/* University Logo */}
          <div className="space-y-2">
            <label className="block text-gray-700">University Logo</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null
                const updated = [...educationList]
                updated[index].universityLogo = file
                setEducationList(updated)
              }}
            />
            {edu.universityLogo && (
              <img
                src={URL.createObjectURL(edu.universityLogo) || "/placeholder.svg"}
                alt="University Logo"
                className="w-24 h-24 mt-2 object-contain border rounded"
              />
            )}
          </div>

          {/* University Name */}
          <div className="space-y-2">
            <label className="block text-gray-700">University Name</label>
            <Input
              value={edu.universityName}
              onChange={(e) => {
                const updated = [...educationList]
                updated[index].universityName = e.target.value
                setEducationList(updated)
              }}
              className="w-full border-gray-300"
            />
          </div>

          {/* Course Name */}
          <div className="space-y-2">
            <label className="block text-gray-700">Course Name</label>
            <Input
              value={edu.courseName}
              onChange={(e) => {
                const updated = [...educationList]
                updated[index].courseName = e.target.value
                setEducationList(updated)
              }}
              className="w-full border-gray-300"
            />
          </div>

          {/* Time Period */}
          <div className="space-y-2">
            <label className="block text-gray-700">Time Period</label>
            <Input
              value={edu.timePeriod}
              onChange={(e) => {
              const updated = [...educationList]
              updated[index].timePeriod = e.target.value
              setEducationList(updated)
               }}
              placeholder="e.g. 2019 - 2023"
              className="w-full border-gray-300"
            />
          </div>

          {/* Course Description */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-gray-700">Course Description</label>
            <textarea
              value={edu.courseDescription}
              onChange={(e) => {
                const updated = [...educationList]
                updated[index].courseDescription = e.target.value
                setEducationList(updated)
              }}
              className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md resize-none"
              placeholder="Briefly describe what you studied..."
            />
          </div>
        </div>
      ))}

      {/* Add More Button */}
      <Button
        onClick={() =>
          setEducationList([
            ...educationList,
            {
              universityLogo: null,
              universityName: "",
              courseName: "",
              timePeriod: "",
              courseDescription: "",
            },
          ])
        }
        className="bg-purple-500 hover:bg-purple-600 text-white"
      >
        Add More
      </Button>
    </div>
  )
}
