"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"

export default function ProfilePictureTab() {
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 w-full">
      {/* Profile Image Section */}
      <div className="space-y-4">
        <label className="block text-lg font-medium text-gray-700">Profile Image</label>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage) || "/placeholder.svg"}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500">No Image</span>
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

      {/* Background Image Section */}
      <div className="space-y-4">
        <label className="block text-lg font-medium text-gray-700">Background Image</label>
        <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
          {backgroundImage ? (
            <img
              src={URL.createObjectURL(backgroundImage) || "/placeholder.svg"}
              alt="Background Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500">No Background Image</span>
          )}
        </div>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) setBackgroundImage(file)
          }}
        />
        <p className="text-sm text-gray-500">Recommended dimensions: 1200x300px</p>
      </div>
    </div>
  )
}
