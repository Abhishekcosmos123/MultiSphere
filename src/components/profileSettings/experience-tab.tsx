"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Experience } from "../../../types/profile"

export default function ExperienceTab() {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      logo: null,
      position: "",
      companyName: "",
      jobType: "",
      timePeriod: "",
      location: "",
      workMode: "",
      skills: "",
    },
  ])

  return (
    <div className="space-y-8 w-full">
      {experiences.map((exp, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full border p-4 rounded-lg bg-gray-50 relative"
        >
          {/* Delete Button */}
          <button
            onClick={() => {
              const updated = experiences.filter((_, i) => i !== index)
              setExperiences(
                updated.length
                  ? updated
                  : [
                      {
                        logo: null,
                        position: "",
                        companyName: "",
                        jobType: "",
                        timePeriod: "",
                        location: "",
                        workMode: "",
                        skills: "",
                      },
                    ],
              )
            }}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 text-gray-500 hover:text-red-500"
            aria-label="Delete experience entry"
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

          {/* Company Logo */}
          <div className="space-y-2">
            <label className="block text-gray-700">Company Logo</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null
                const updated = [...experiences]
                updated[index].logo = file
                setExperiences(updated)
              }}
            />
            {exp.logo && (
              <img
                src={URL.createObjectURL(exp.logo) || "/placeholder.svg"}
                alt="Logo Preview"
                className="w-20 h-20 mt-2 object-contain border rounded"
              />
            )}
          </div>

          {/* Position */}
          <div className="space-y-2">
            <label className="block text-gray-700">Position</label>
            <Input
              value={exp.position}
              onChange={(e) => {
                const updated = [...experiences]
                updated[index].position = e.target.value
                setExperiences(updated)
              }}
            />
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <label className="block text-gray-700">Company Name</label>
            <Input
              value={exp.companyName}
              onChange={(e) => {
                const updated = [...experiences]
                updated[index].companyName = e.target.value
                setExperiences(updated)
              }}
            />
          </div>

          {/* Job Type */}
          <div className="space-y-2">
            <label className="block text-gray-700">Job Type</label>
            <Input
              value={exp.jobType}
              onChange={(e) => {
                const updated = [...experiences]
                updated[index].jobType = e.target.value
                setExperiences(updated)
              }}
            />
          </div>

          {/* Time Period */}
          <div className="space-y-2">
            <label className="block text-gray-700">Time Period</label>
            <Input
              value={exp.timePeriod}
              onChange={(e) => {
                const updated = [...experiences]
                updated[index].timePeriod = e.target.value
                setExperiences(updated)
              }}
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="block text-gray-700">Location</label>
            <Input
              value={exp.location}
              onChange={(e) => {
                const updated = [...experiences]
                updated[index].location = e.target.value
                setExperiences(updated)
              }}
            />
          </div>

          {/* Work Mode */}
          <div className="space-y-2">
            <label className="block text-gray-700">Work Mode</label>
            <Input
              value={exp.workMode}
              onChange={(e) => {
                const updated = [...experiences]
                updated[index].workMode = e.target.value
                setExperiences(updated)
              }}
            />
          </div>

          {/* Skills */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-gray-700">Skills</label>
            <Input
              value={exp.skills}
              onChange={(e) => {
                const updated = [...experiences]
                updated[index].skills = e.target.value
                setExperiences(updated)
              }}
            />
          </div>
        </div>
      ))}

      {/* Add More Button */}
      <Button
        onClick={() =>
          setExperiences([
            ...experiences,
            {
              logo: null,
              position: "",
              companyName: "",
              jobType: "",
              timePeriod: "",
              location: "",
              workMode: "",
              skills: "",
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
