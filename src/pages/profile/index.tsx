import ProfileHeader from "@/components/profile/profile-header"
import AboutSection from "@/components/profile/about-section"
import SkillsSection from "@/components/profile/skills-section"
import EducationSection from "@/components/profile/education-section"
import ExperienceSection from "@/components/profile/experience-section"
import CertificationsSection from "@/components/profile/certifications-section"
import CoursesSection from "@/components/profile/courses-section"
import { NavigationBar } from "@/components/dashboard/navigation-bar"
import { CRMButtons, ELearningButtons, RealEstateButtons, RestaurantButtons } from "@/lib/content"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { storage, StorageKeys } from "@/lib/utils/storage"
import { showSuccessToast } from "@/lib/utils/toast"
import { updateProfileRequest } from "@/store/slices/profileSlice"
import ProfileSettings from "@/components/profile/profile-settings-page"

interface Module {
  id: number;
  name: string;
}

export default function ProfilePage() {
  const reduxUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const [user, setUser] = useState(reduxUser);

  useEffect(() => {
    if (!reduxUser) {
      const storedUser = storage.getJson(StorageKeys.USER);
      if (storedUser) {
        setUser(storedUser);
      }
    } else {
      setUser(reduxUser);
    }
  }, [reduxUser]);

  const [selectedModule, setSelectedModule] = useState<Module>({
    id: 0,
    name: "E-learning",
  });

  const [isEditing, setIsEditing] = useState(false);
  const successMessage = useSelector((state: RootState) => state.profile);

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [countryCode, setCountryCode] = useState(user?.country_code || "");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
      setCountryCode(user.country_code || "");
    }
  }, [user]);

  useEffect(() => {
    const savedModule = storage.getJson(StorageKeys.SELECTED_MODULE);
    if (savedModule) {
      setSelectedModule(savedModule);
    }
  }, []);

  useEffect(() => {
    if (successMessage?.successMessage) {
      showSuccessToast(successMessage.successMessage);
    }
  }, [successMessage?.successMessage]);

  const handleSave = () => {
    if (user) {
      dispatch(updateProfileRequest({
        id: user.id,
        name,
        email,
        phone,
        country_code: countryCode,
        profile: user.profileImage || ""
      }));
      setIsEditing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {selectedModule && (
        <NavigationBar
          buttons={
            {
              "E-learning": ELearningButtons,
              "Real Estate": RealEstateButtons,
              "CRM Management": CRMButtons,
              Restaurants: RestaurantButtons,
            }[selectedModule.name]
          }
        />
      )}

      <div className="bg-white shadow-sm overflow-hidden">
        {isEditing ? (
          <ProfileSettings
            user={user}
            setName={setName}
            setPhone={setPhone}
            setEmail={setEmail}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <ProfileHeader
              name={user?.name || "User Name"}
              title={user?.role === 'consumer' ? "Student" : "Teacher"}
              location={"India"}
              connections={500}
              profileImageUrl={user?.profileImage ||"/profileImage.jpeg"}
              backgroundImageUrl={user?.cover_profile || "/background.jpeg"}
              university={user?.education?.[0]?.name || ""}
              setIsEditing={setIsEditing}
            />

            <div className="px-4 py-2">
              <AboutSection description={user?.biography || "No biography added"} />

              <SkillsSection
                skills={Array.isArray(user?.skills) ? user.skills : []}
              />

              <EducationSection
                educations={(user?.education || []).map((edu: any) => ({
                  institution: edu.name,
                  degree: edu.course_name,
                  years: edu.time_period,
                  location: edu.course_description,
                  logo: edu.logo ? `/${edu.logo.replace(/\\/g, '/')}` : "",
                }))}
              />

              <ExperienceSection
                experiences={(user?.experience || []).map((exp: any) => ({
                  role: exp.position,
                  company: exp.position,
                  type: exp.job_type,
                  duration: exp.time_period,
                  location: exp.location,
                  logo: exp.logo ? `/${exp.logo.replace(/\\/g, '/')}` : "",
                  skills: exp.skills ? exp.skills.split(",") : [],
                }))}
              />

              <CertificationsSection
                certifications={(user?.license_certificate || []).map((cert: any) => ({
                      title: cert.certificate_name,
                      issuer: cert.issuing_organization,
                      date: cert.issue_date,
                      credentialId: cert.credential_id,
                      logo: cert.logo
                        ? `/${cert.logo.replace(/\\/g, '/')}`
                        : "/default-logo.png",
                    }))                
                  }
              />

              <CoursesSection
                courses={[
                  {
                    title: "The Complete Python Bootcamp From Zero to Hero",
                    platform: "Udemy",
                    details: "Learn Python like a Professional! Start from the basics and go...",
                    ratings: "4.6",
                    students: "1,551,258 students",
                    price: "₹1,499",
                    image: "/placeholder.svg?height=120&width=160",
                  },
                  {
                    title: "The Complete SQL Bootcamp: Go from Zero to Hero",
                    platform: "Udemy",
                    details: "Become an expert at SQL!",
                    ratings: "4.7",
                    students: "207,000 students",
                    price: "₹1,499",
                    image: "/placeholder.svg?height=120&width=160",
                  },
                  {
                    title: "Python for Data Science and Machine Learning Bootcamp",
                    platform: "Udemy",
                    details: "Learn how to use NumPy, Pandas, Seaborn, Matplotlib...",
                    ratings: "4.6",
                    students: "418,658 students",
                    price: "₹4,999",
                    image: "/placeholder.svg?height=120&width=160",
                  },
                ]}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
