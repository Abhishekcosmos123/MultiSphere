"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ProfileTab from "../profileSettings/profile-tab"
import EducationTab from "../profileSettings/education-tab"
import ExperienceTab from "../profileSettings/experience-tab"
import CertificationsTab from "../profileSettings/certifications-tab"

interface ProfileSettingsProps {
  user: any
  setName: (val: string) => void
  setPhone: (val: string) => void
  setEmail: (val: string) => void
  onSave: () => void
  onCancel: () => void
}

export default function ProfileSettings({
  user,
  setName,
  setPhone,
  setEmail,
  onSave,
  onCancel,
}: ProfileSettingsProps) {
  const normalizeSocialLinks = (rawLinks: Record<string, string>[]): { id: string; value: string }[] => {
    return rawLinks.flatMap(obj =>
      Object.entries(obj).map(([key, value]) => ({
        id: key,
        value
      }))
    );
  };
  
  const [activeSubTab, setActiveSubTab] = useState("profile")
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [skills, setSkills] = useState<string[]>([])
  const [location, setLocation] = useState("")
  const [language, setLanguage] = useState("")
  const [socialLinks, setSocialLinks] = useState(
    normalizeSocialLinks(user?.social_links || [])
  );

  const tabs = [
    { value: "profile", label: "Profile" },
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
              className={`pb-2 transition ${activeSubTab === value
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
            name={user?.name}
            phone={user?.phone}
            email={user?.email}
            countryCode={user?.countryCode}
            profileImage={user?.profieImage}
            setName={setName}
            setPhone={setPhone}
            setEmail={setEmail}
            setProfileImage={setProfileImage}
            skills={user?.skills}
            location={location}
            setSkills={setSkills}
            setLocation={setLocation}
            about={user?.biography}
            language={user?.language}
            setLanguage={setLanguage}
            socialLinks={socialLinks}
            setSocialLinks={setSocialLinks}
          />
        )}

        {activeSubTab === "education" && <EducationTab education={user.education} />}
        {activeSubTab === "experience" && <ExperienceTab experience={user.experience} />}
        {activeSubTab === "certifications" && <CertificationsTab certification={user.license_certificate} />}
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
