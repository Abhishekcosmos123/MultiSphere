"use client"

import { Input } from "@/components/ui/input"

interface SocialLinksProps {
  socialLinks: { id: string; value: string }[]
  setSocialLinks: React.Dispatch<React.SetStateAction<{ id: string; value: string }[]>>
  website?: string
  setWebsite?: (val: string) => void
}

export default function SocialLinks({ socialLinks, setSocialLinks, website, setWebsite }: SocialLinksProps) {
  const platforms = [
    { label: "Website", id: "website", placeholder: "URL" },
    { label: "Facebook", id: "facebook", prefix: "facebook.com/", placeholder: "Username" },
    { label: "Instagram", id: "instagram", prefix: "instagram.com/", placeholder: "Username" },
    { label: "LinkedIn", id: "linkedin", prefix: "linkedin.com/", placeholder: "Profile URL" },
    { label: "TikTok", id: "tiktok", prefix: "tiktok.com/", placeholder: "@Username" },
    { label: "X", id: "x", prefix: "x.com/", placeholder: "Username" },
    { label: "YouTube", id: "youtube", prefix: "youtube.com/", placeholder: "Username" },
  ]

  const handleChange = (id: string, value: string) => {
    setSocialLinks((prev) => {
      const updated = [...prev]
      const index = updated.findIndex(link => link.id === id)
      if (index !== -1) {
        updated[index].value = value
      } else {
        updated.push({ id, value })
      }
      return updated
    })

    if (id === "website" && setWebsite) setWebsite(value)
  }

  return (
    <>
      {platforms.map(({ label, id, prefix, placeholder }) => {
        const currentValue =
          socialLinks.find(link => link.id === id)?.value ||
          (id === "website" && typeof website === "string" ? website : "") ||
          ""

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
        )
      })}
    </>
  )
}
