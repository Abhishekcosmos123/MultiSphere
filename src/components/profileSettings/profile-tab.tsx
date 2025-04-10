"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bold, Italic } from "lucide-react"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import '@/styles/phone-input.css'
import { SkillInput } from "../ui/skill-input"

interface ProfileTabProps {
  name: string
  phone: string
  email: string
  countryCode: string
  profileImage: File | null
  setName: (val: string) => void
  setPhone: (val: string) => void
  setEmail: (val: string) => void
  setProfileImage: (file: File | null) => void
  skills: string[]
  location: string
  setSkills: (val: string[]) => void
  setLocation: (val: string) => void
  about: string
  language: string
  setLanguage: (val: string) => void
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
  setProfileImage,
  skills,
  location,
  setSkills,
  setLocation,
  about,
  language,
  setLanguage,
  socialLinks,
  setSocialLinks
}: ProfileTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 w-full">
      <div className="space-y-6">
        {/* Profile Image */}
        <div className="space-y-2">
          <label className="block text-gray-700">Profile Image</label>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {profileImage ? (
                <img
                  src={typeof profileImage === 'object' ? URL.createObjectURL(profileImage) : "/profileImage.jpeg"}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-sm">No Image</span>
              )}
            </div>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) setProfileImage(file)
              }}
              className="w-auto"
            />
          </div>
          <p className="text-sm text-gray-500">Max size 5MB. JPG or PNG recommended.</p>
        </div>

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

        {/* Headline */}
        <div className="space-y-2">
          <label htmlFor="headline" className="block text-gray-700">Headline</label>
          <div className="relative">
            <Input id="headline" defaultValue="Instructor at Udemy" className="w-full border-gray-300 pr-12" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">60</div>
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
              value={about}
              onChange={() => {}}
            />
          </div>
          <p className="text-xs text-gray-500">
            Your bio should reflect your Credibility, Empathy, Passion, and Personality. Minimum 50 words. No links or codes.
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <SocialLinks socialLinks={socialLinks} setSocialLinks={setSocialLinks} />

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

function SocialLinks({
  socialLinks,
  setSocialLinks
}: {
  socialLinks: { id: string; value: string }[]
  setSocialLinks: React.Dispatch<React.SetStateAction<{ id: string; value: string }[]>>
}) {
  const platforms = [
    { label: "Website", id: "website", placeholder: "URL" },
    { label: "Facebook", id: "facebook", prefix: "facebook.com/", placeholder: "Username" },
    { label: "Instagram", id: "instagram", prefix: "instagram.com/", placeholder: "Username" },
    { label: "LinkedIn", id: "linkedin", prefix: "linkedin.com/", placeholder: "Profile URL" },
    { label: "TikTok", id: "tiktok", prefix: "tiktok.com/", placeholder: "@Username" },
    { label: "X", id: "x", prefix: "x.com/", placeholder: "Username" },
    { label: "YouTube", id: "youtube", prefix: "youtube.com/", placeholder: "Username" },
  ];

  const handleChange = (id: string, value: string) => {
    setSocialLinks((prev: any[]) => {
      const updated = [...prev];
      const index = updated.findIndex(link => link.id === id);
      if (index !== -1) {
        updated[index].value = value;
      } else {
        updated.push({ id, value });
      }
      return updated;
    });
  };

  return (
    <>
      {platforms.map(({ label, id, prefix, placeholder }) => {
        const currentValue = socialLinks.find(link => link.id === id)?.value || "";
        return (
          <div key={id} className="space-y-2">
            <label htmlFor={id} className="block text-gray-700">{label}</label>
            <div className="flex">
              {prefix && (
                <div className="bg-gray-100 border border-gray-300 border-r-0 rounded-l-md px-3 py-2 text-gray-500 text-sm">
                  {prefix}
                </div>
              )}
              <Input
                id={id}
                placeholder={placeholder}
                className={`w-full ${prefix ? "rounded-l-none" : ""} border-gray-300`}
                value={currentValue}
                onChange={(e) => handleChange(id, e.target.value)}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
