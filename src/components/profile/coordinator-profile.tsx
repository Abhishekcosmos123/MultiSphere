"use client"

import type React from "react"
import { User, Mail, Globe, Phone, Edit, Save, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import "react-phone-input-2/lib/bootstrap.css"

interface ProfileFieldProps {
  label: string
  value?: string
  icon: React.ReactNode
}

const ProfileField = ({ label, value, icon }: ProfileFieldProps) => (
  <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
    <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full">{icon}</div>
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-base font-semibold text-gray-800 dark:text-white">{value || "—"}</p>
    </div>
  </div>
)

interface CoordinatorProfileProps {
  user: any
  name: string
  phone: string
  email: string
  countryCode: string
  contactConsent: boolean
  setContactConsent: (value: boolean) => void
  isEditing: boolean
  handleSave: () => void
  setIsEditing: (value: boolean) => void
  handleLogout: () => void
  setName: (value: string) => void
  setEmail: (value: string) => void
  setPhone: (value: string) => void
}

export const CoordinatorProfile = ({
  user,
  name,
  phone,
  email,
  countryCode,
  contactConsent,
  setContactConsent,
  isEditing,
  handleSave,
  setIsEditing,
  handleLogout,
  setName,
  setEmail,
  setPhone,
}: CoordinatorProfileProps) => {
  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-8 md:p-10 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">
        Profile Overview
      </h1>

      <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
        {isEditing ? (
          <div className="w-full space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <Label htmlFor="name" className="w-32 shrink-0">
                Name*
              </Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <Label htmlFor="email" className="w-32 shrink-0">
                Email*
              </Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <Label htmlFor="phone" className="w-32 shrink-0">
                Mobile Number*
              </Label>
              <PhoneInput
                country={"in"}
                value={phone}
                onChange={(value) => setPhone(value)}
                inputClass="!w-full !pl-14 !py-2 !border-2 !border-indigo-200 focus:!border-indigo-500 rounded-md"
                buttonClass="!bg-white dark:!bg-gray-900"
                dropdownClass="dark:!bg-gray-800"
                placeholder="Enter mobile number"
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="consent"
                checked={contactConsent}
                onCheckedChange={(checked) => setContactConsent(checked as boolean)}
              />
              <Label htmlFor="consent" className="text-sm">
                I agree to be contacted via WhatsApp, phone, email, etc.
              </Label>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-3xl mt-6 grid gap-4 sm:grid-cols-2">
            <ProfileField label="Full Name" value={name} icon={<User size={22} className="text-indigo-600" />} />
            <ProfileField label="Email" value={email} icon={<Mail size={22} className="text-indigo-600" />} />
            <ProfileField
              label="Country Code"
              value={countryCode}
              icon={<Globe size={22} className="text-indigo-600" />}
            />
            <ProfileField label="Phone" value={phone} icon={<Phone size={22} className="text-indigo-600" />} />
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {isEditing ? (
            <>
              <Button
                onClick={handleSave}
                disabled={!contactConsent}
                className="bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="mr-2" size={18} />
                Save Profile
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="mr-2" size={18} />
                Edit Profile
              </Button>
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="mr-2" size={18} />
                Log Out
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
