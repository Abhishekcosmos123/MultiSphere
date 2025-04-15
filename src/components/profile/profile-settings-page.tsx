"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ProfileTab from "../profileSettings/profile-tab"
import EducationTab from "../profileSettings/education-tab"
import ExperienceTab from "../profileSettings/experience-tab"
import CertificationsTab from "../profileSettings/certifications-tab"
import { Certification, EducationEntry } from "../../../types/profile"
import { Experience } from "../../../types/profile"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { Spinner } from "../ui/spinner"

export interface ProfileSettingsProps {
  user: any
  name: string;
  setName: (val: string) => void
  phone: string
  setPhone: (val: string) => void
  email: string
  setEmail: (val: string) => void
  biography: string
  setBiography: (val: string) => void
  location: string
  setLocation: (val: string) => void
  language: string
  setLanguage: (val: string) => void
  website: string
  setWebsite: (val: string) => void
  socialLinks: { id: string; value: string }[]
  setSocialLinks: React.Dispatch<React.SetStateAction<{ id: string; value: string }[]>>
  profileImage: File | null
  setProfileImage: (file: File | null) => void
  onSave: () => void
  skills: string[]
  setSkills: (val: string[]) => void
  educationList: EducationEntry[]
  setEducationList: (list: EducationEntry[]) => void
  experiences: Experience[]
  setExperiences: (list: Experience[]) => void
  certifications: Certification[]
  setCertifications: (list: Certification[]) => void
  onCancel: () => void
}

export default function ProfileSettings({
  user,
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  biography,
  setBiography,
  location,
  setLocation,
  language,
  setLanguage,
  website,
  setWebsite,
  socialLinks,
  setSocialLinks,
  onSave,
  skills,
  setSkills,
  profileImage,
  setProfileImage,
  educationList,
  setEducationList,
  experiences,
  setExperiences,
  certifications,
  setCertifications,
  onCancel,
}: ProfileSettingsProps) {
  const [activeSubTab, setActiveSubTab] = useState("profile")
  const successMessage = useSelector((state: RootState) => state.profile)

  const tabs = [
    { value: "profile", label: "Profile" },
    { value: "education", label: "Education" },
    { value: "experience", label: "Experience" },
    { value: "certifications", label: "Licenses & Certifications" },
  ]

  useEffect(() => {
    if (user?.education?.length && educationList.length === 0) {
      setEducationList(
        user.education.map((edu: any) => ({
          name: edu.name || "",
          course_name: edu.course_name || "",
          time_period: edu.time_period || "",
          course_description: edu.course_description || "",
        }))
      )
    }

    if (user?.experience?.length && experiences.length === 0) {
      setExperiences(
        user.experience.map((exp: any) => ({
          position: exp.position || "",
          companyName: exp.companyName || "",
          job_type: exp.job_type || "",
          time_period: exp.time_period || "",
          location: exp.location || "",
          work_mode: exp.work_mode || "",
          skills: exp.skills || "",
        }))
      )
    }

    if (user?.license_certificate?.length && certifications.length === 0) {
      setCertifications(
        user.license_certificate.map((cert: any) => ({
          logo: null,
          certificate_name: cert.certificate_name || "",
          issuing_organization: cert.issuing_organization || "",
          issue_date: cert.issue_date || "",
          credential_id: cert.credential_id || "",
        }))
      )
    }
  }, [])

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
            name={name}
            phone={phone}
            email={email}
            countryCode={user?.countryCode}
            setName={setName}
            setPhone={setPhone}
            setEmail={setEmail}
            biography={biography}
            setBiography={setBiography}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            skills={skills}
            location={location}
            setSkills={setSkills}
            setLocation={setLocation}
            language={language}
            setLanguage={setLanguage}
            website={website}
            setWebsite={setWebsite}
            socialLinks={socialLinks}
            setSocialLinks={setSocialLinks}
          />
        )}

        {activeSubTab === "education" && <EducationTab education={user.education} educationList={educationList} setEducationList={setEducationList} />}
        {activeSubTab === "experience" && <ExperienceTab experience={user.experience} experiences={experiences} setExperiences={setExperiences} />}
        {activeSubTab === "certifications" && <CertificationsTab certification={user.license_certificate} certifications={certifications} setCertifications={setCertifications} />}
      </div>

      {/* Buttons */}
      <div className="mt-10 flex flex-wrap justify-end gap-4 max-w-6xl mx-auto">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          className="bg-purple-500 hover:bg-purple-600 text-white flex items-center gap-2"
          onClick={onSave}
          disabled={successMessage.loading}
        >
          {successMessage.loading && <Spinner size={20} />}
          {successMessage.loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  )
}
