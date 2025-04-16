"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import type { RootState } from "@/store"
import { storage, StorageKeys } from "@/lib/utils/storage"
import { showSuccessToast } from "@/lib/utils/toast"
import { updateProfileRequest, updateUserRequest } from "@/store/slices/profileSlice"
import { logoutRequest } from "@/store/slices/authSlice"
import { withAuth } from "@/hooks/middleware"
import type { ModuleName } from ".."
import { NavigationBar } from "@/components/dashboard/navigation-bar"
import { CRMButtons, ELearningButtons, RealEstateButtons, RestaurantButtons } from "@/lib/content"
import LoaderWithLabel from "@/ui/loader-with-label"
import { CoordinatorProfile } from "@/components/profile/coordinator-profile"
import { UserProfile } from "@/components/profile/user-profile"
import { ProfileSettings } from "@/components/profile/profile-settings"
import type { Certification, EducationEntry, Experience } from "../../../types/profile"
import { Footer } from "@/components/dashboard/footer"
import { fetchCurrentModuleRequest } from "@/store/slices/ superAdmin/currentModuleSlice"

type SocialLink = {
  id: string
  value: string
}

interface Module {
  id: number
  name: string
}

function ProfilePage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { userProfile } = useSelector((state: RootState) => state.profile)
  const successMessage = useSelector((state: RootState) => state.profile)
  const { currentModule: selected } = useSelector((state: RootState) => state.currentModule)

  const [user, setUser] = useState(userProfile)
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [countryCode, setCountryCode] = useState("")
  const [educationList, setEducationList] = useState<EducationEntry[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [biography, setBiography] = useState("")
  const [location, setLocation] = useState("")
  const [language, setLanguage] = useState("")
  const [website, setWebsite] = useState("")
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [contactConsent, setContactConsent] = useState(false)

  const normalizeSocialLinks = (rawLinks: Record<string, string | undefined>[]): SocialLink[] => {
    return rawLinks.flatMap((obj) =>
      Object.entries(obj)
        .filter(([_, value]) => typeof value === "string")
        .map(([key, value]) => ({
          id: key,
          value: value as string,
        })),
    )
  }

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(
    normalizeSocialLinks((user?.social_links as Record<string, string | undefined>[]) || []),
  )

  useEffect(() => {
    if (userProfile) {
      setUser(userProfile)
    } else {
      const storedUser = storage.getJson(StorageKeys.USER)
      if (storedUser) {
        setUser(storedUser)
      }
    }
  }, [userProfile])

  useEffect(() => {
    if (selected && typeof selected === "string") {
      setSelectedModule({ id: 0, name: selected as ModuleName })
    }
  }, [selected])

  useEffect(() => {
    dispatch(fetchCurrentModuleRequest())
  }, [])

  useEffect(() => {
    if (user?.id) {
      dispatch(updateUserRequest(user.id))
    }
  }, [user?.id])

  useEffect(() => {
    if (user) {
      setName(user.name || "")
      setPhone(user.phone || "")
      setEmail(user.email || "")
      setCountryCode(user.country_code || "")
      setBiography(user?.biography)
      setLocation(user?.user_location)
      setLanguage(user?.language)
      setWebsite(user?.website)
      setSocialLinks(normalizeSocialLinks(user?.social_links || []))
      setProfileImage(user?.profileImage || null)
      setSkills(user.skills)
    }
  }, [user])

  useEffect(() => {
    if (successMessage?.successMessage) {
      showSuccessToast(successMessage.successMessage)
      setIsEditing(false)

      const formattedSocialLinks = socialLinks.map(({ id, value }) => ({ [id]: value }))

      setUser((prevUser: any) => ({
        ...prevUser,
        name,
        phone,
        email,
        country_code: countryCode,
        biography,
        language,
        location,
        website,
        social_links: formattedSocialLinks,
        skills,
        education: educationList,
        experience: experiences,
        license_certificate: certifications,
        profileImage: profileImage || prevUser?.profileImage,
      }))
    }
  }, [successMessage?.successMessage, successMessage?.error])

  const handleSave = () => {
    if (user) {
      const formattedSocialLinks = socialLinks.map(({ id, value }) => ({ [id]: value }))
      const formData = new FormData()

      formData.append("name", name)
      formData.append("email", email)
      // formData.append("phone", phone)
      // formData.append("country_code", countryCode)
      formData.append("biography", biography)
      formData.append("language", language)
      formData.append("user_location", location)
      formData.append("website", website)
      formData.append("social_links", JSON.stringify(formattedSocialLinks))
      formData.append("skills", JSON.stringify(skills))
      formData.append("education", JSON.stringify(educationList.map(({ logo, ...rest }) => rest)))
      formData.append("experience", JSON.stringify(experiences.map(({ logo, ...rest }) => rest)))
      formData.append("license_certificate", JSON.stringify(certifications.map(({ logo, ...rest }) => rest)))
      if (profileImage instanceof File) {
        formData.append("profileImage", profileImage)
      }
      dispatch(updateProfileRequest({ id: user.id, formData }))
    }
  }

  const handleLogout = () => {
    const token = typeof window !== "undefined" ? storage.get(StorageKeys.TOKEN) : null

    dispatch(logoutRequest({ refreshToken: token ? String(token) : undefined }))
    storage.remove(StorageKeys.TOKEN)
    storage.remove(StorageKeys.USER)
    router.push("/login")
    showSuccessToast("Logged out Successfully")
  }

  const profileProps = {
    user,
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    countryCode,
    biography,
    location,
    language,
    website,
    socialLinks,
    profileImage,
    skills,
    educationList,
    experiences,
    certifications,
    contactConsent,
    setContactConsent,
    setIsEditing,
    handleLogout,
    selected,
  }

  const settingsProps = {
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
    profileImage,
    setProfileImage,
    setSocialLinks,
    onSave: handleSave,
    skills,
    setSkills,
    educationList,
    setEducationList,
    experiences,
    setExperiences,
    certifications,
    setCertifications,
    onCancel: () => setIsEditing(false),
    selected,
  }

  const renderNavigation = () =>
    selectedModule ? (
      <NavigationBar
        buttons={
          {
            "E-learning": ELearningButtons,
            "Real Estate": RealEstateButtons,
            "CRM Management": CRMButtons,
            "Restaurants": RestaurantButtons,
          }[selectedModule.name]
        }
      />
    ) : (
      <LoaderWithLabel label="Loading your personalized experience..." />
    )

  if (user?.role === "coordinator") {
    return (
      <div className="flex flex-col min-h-screen">
        {renderNavigation()}
        <div className="bg-white shadow-sm overflow-hidden">
          <CoordinatorProfile {...profileProps} isEditing={isEditing} handleSave={handleSave} />
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {renderNavigation()}
      <div className="bg-white shadow-sm overflow-hidden">
        {isEditing ? <ProfileSettings {...settingsProps} /> : <UserProfile {...profileProps} />}
      </div>
      <Footer />
    </div>
  )
}

export default withAuth(ProfilePage, "/login")
