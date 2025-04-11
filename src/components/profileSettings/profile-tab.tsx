"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bold, Italic } from "lucide-react"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import '@/styles/phone-input.css'
import { SkillInput } from "../ui/skill-input"
import SocialLinks from "./SocialLinks"
import ProfileImageUploader from "./ProfileImageUploader"

interface ProfileTabProps {
  name: string
  phone: string
  email: string
  countryCode: string
  biography: string
  profileImage: File | null
  setName: (val: string) => void
  setPhone: (val: string) => void
  setEmail: (val: string) => void
  setBiography: (val: string) => void
  setProfileImage: (file: File | null) => void
  skills: string[]
  location: string
  setSkills: (val: string[]) => void
  setLocation: (val: string) => void
  language: string
  setLanguage: (val: string) => void
  website: string
  setWebsite: (val: string) => void
  socialLinks: { id: string; value: string }[]
  setSocialLinks: React.Dispatch<React.SetStateAction<{ id: string; value: string }[]>>
}

export default function ProfileTab({
  name,
  phone,
  email,
  countryCode,
  profileImage,
  setName,
  setPhone,
  setEmail,
  biography,
  setBiography,
  setProfileImage,
  skills,
  location,
  setSkills,
  setLocation,
  language,
  setLanguage,
  website,
  setWebsite,
  socialLinks,
  setSocialLinks
}: ProfileTabProps) {
  useEffect(() => {
    if (website && !socialLinks.some(link => link.id === "website")) {
      setSocialLinks(prev => [...prev, { id: "website", value: website }]);
    }
  }, [website]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 w-full">
      {/* Left Column */}
      <div className="space-y-6">
        <ProfileImageUploader
          profileImage={profileImage}
          setProfileImage={setProfileImage}
        />

        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-gray-300"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-gray-300"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-gray-700">Phone</label>
          <div className="mt-1">
            <PhoneInput
              country={'us'}
              value={countryCode}
              onChange={(value) => setPhone(value)}
              inputClass="w-full"
              containerClass="phone-input-container"
              buttonClass="phone-input-button"
              dropdownClass="phone-input-dropdown"
              searchClass="phone-input-search"
              placeholder="Enter mobile number"
            />
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <SkillInput skills={skills} setSkills={setSkills} />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label htmlFor="location" className="block text-gray-700">Location</label>
          <Input
            id="location"
            placeholder="e.g., Remote, New York, etc."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border-gray-300"
          />
        </div>

        {/* Biography */}
        <div className="space-y-2">
          <label htmlFor="biography" className="block text-gray-700">Biography</label>
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <div className="flex items-center gap-2 border-b border-gray-300 p-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <Bold className="h-4 w-4" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Italic className="h-4 w-4" />
              </button>
            </div>
            <textarea
              id="biography"
              className="w-full p-3 min-h-[150px] outline-none resize-none"
              placeholder="Tell us about yourself..."
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
            />
          </div>
          <p className="text-xs text-gray-500">
            Your bio should reflect your Credibility, Empathy, Passion, and Personality. Minimum 50 words. No links or codes.
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <SocialLinks
          socialLinks={socialLinks}
          setSocialLinks={setSocialLinks}
          website={website}
          setWebsite={setWebsite}
        />

        {/* Language */}
        <div className="space-y-2">
          <label htmlFor="language" className="block text-gray-700">Language</label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-full border-gray-300">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english-us">English (US)</SelectItem>
              <SelectItem value="english-uk">English (UK)</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
