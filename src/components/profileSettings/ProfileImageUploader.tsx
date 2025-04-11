"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"

interface Props {
  profileImage: File | string | null
  setProfileImage: (file: File | null) => void
}

export default function ProfileImageUploader({ profileImage, setProfileImage }: Props) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (profileImage instanceof File) {
      const objectUrl = URL.createObjectURL(profileImage)
      setImagePreviewUrl(objectUrl)
  
      return () => URL.revokeObjectURL(objectUrl)
    } else if (typeof profileImage === 'string') {
      setImagePreviewUrl(profileImage)
    } else {
      setImagePreviewUrl(null)
    }
  }, [profileImage])

  return (
    <div className="space-y-2">
      <label className="block text-gray-700">Profile Image</label>
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {imagePreviewUrl ? (
            <img src={imagePreviewUrl} alt="Profile Preview" className="w-full h-full object-cover" />
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
  )
}
