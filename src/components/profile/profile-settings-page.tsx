"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ProfileTab from "../profileSettings/profile-tab"
import ProfilePictureTab from "../profileSettings/profile-picture-tab"
import EducationTab from "../profileSettings/education-tab"
import ExperienceTab from "../profileSettings/experience-tab"
import CertificationsTab from "../profileSettings/certifications-tab"

interface ProfileSettingsProps {
  name: string
  phone: string
  email: string
  countryCode: string
  setName: (val: string) => void
  setPhone: (val: string) => void
  setEmail: (val: string) => void
  setCountryCode: (val: string) => void
  onSave: () => void
  onCancel: () => void
}

export default function ProfileSettings({
  name,
  phone,
  email,
  countryCode,
  setName,
  setPhone,
  setEmail,
  setCountryCode,
  onSave,
  onCancel,
}: ProfileSettingsProps) {
  const [activeSubTab, setActiveSubTab] = useState("profile")

  const tabs = [
    { value: "profile", label: "Profile" },
    { value: "profile-picture", label: "Profile picture" },
    { value: "education", label: "Education" },
    { value: "experience", label: "Experience" },
    { value: "certifications", label: "Licenses & Certifications" },
  ]

  return (
    <div className="container py-8 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Profile & Settings</h1>

      {/* Sub Tabs */}
      <div className="mb-8 border-b border-gray-300">
        <div className="flex flex-wrap gap-6">
          {tabs.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setActiveSubTab(value)}
              className={`pb-2 transition ${
                activeSubTab === value
                  ? "text-gray-900 border-b-2 border-gray-900 font-medium"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Container - Consistent Width */}
      <div className="w-full max-w-6xl mx-auto">
        {activeSubTab === "profile" && (
          <ProfileTab
            name={name}
            email={email}
            phone={phone}
            countryCode={countryCode}
            setName={setName}
            setEmail={setEmail}
            setPhone={setPhone}
            setCountryCode={setCountryCode}
          />
        )}

        {activeSubTab === "profile-picture" && <ProfilePictureTab />}
        {activeSubTab === "education" && <EducationTab />}
        {activeSubTab === "experience" && <ExperienceTab />}
        {activeSubTab === "certifications" && <CertificationsTab />}
      </div>

      {/* Buttons */}
      <div className="mt-10 flex flex-wrap justify-end gap-4 max-w-6xl mx-auto">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="bg-purple-500 hover:bg-purple-600 text-white" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  )
}
