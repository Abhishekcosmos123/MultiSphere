"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PrivacySettingsTab() {
  return (
    <div className="max-w-xl space-y-6">
      <div>
        <label className="block text-gray-700 mb-2">Profile Visibility</label>
        <Select defaultValue="public">
          <SelectTrigger className="w-full border-gray-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="private">Private</SelectItem>
            <SelectItem value="friends">Friends Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="block text-gray-700">Email Notifications</label>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-purple-500" /> Updates & Announcements
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-purple-500" defaultChecked /> New Messages
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-purple-500" /> Promotions
          </label>
        </div>
      </div>
    </div>
  )
}
