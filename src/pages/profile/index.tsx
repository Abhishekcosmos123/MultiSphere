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
            name={name}
            phone={phone}
            email={email}
            countryCode={countryCode}
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
              title="Software Developer"
              location="India"
              connections={500}
              profileImageUrl="/profileImage.jpeg"
              backgroundImageUrl="/background.jpeg"
              university="Devi Ahilya Vishwavidyalaya"
              setIsEditing={setIsEditing}
            />

            <div className="px-4 py-2">
              <AboutSection description="5 years of strong experience as a Full-Stack web developer..." />

              <SkillsSection
                skills={[
                  "Android Development",
                  "Mobile Application Development",
                  "Web Development",
                  "Web Design",
                  "Logo Design",
                  "Back Development",
                ]}
              />

              <EducationSection
                educations={[
                  {
                    institution: "Devi Ahilya Vishwavidyalaya",
                    degree: "B.E in IT, Computer Programming, Specific Applications",
                    years: "2012 - 2016",
                    location: "Indore, IN",
                  },
                ]}
              />

              <ExperienceSection
                experiences={[
                  {
                    role: "Software Engineer",
                    company: "YenDigital",
                    type: "Full-time",
                    duration: "Oct 2023 - Present · 1 yr 7 mos",
                    location: "Gurugram, Haryana, India · Hybrid",
                    logo: "/placeholder.svg?height=48&width=48",
                  },
                  {
                    role: "Senior Web Developer",
                    company: "Superourcing",
                    type: "Full-time",
                    duration: "Apr 2022 - Oct 2023 · 1 yr 7 mos",
                    location: "Indore, Madhya Pradesh, India · On-site",
                    logo: "/placeholder.svg?height=48&width=48",
                    skills: ["Web Accessibility", "Cascading Style Sheets (CSS)", "+26 skills"],
                  },
                  {
                    role: "React Developer",
                    company: "EngineerBabu",
                    type: "Full-time",
                    duration: "Apr 2020 - Oct 2023 · 3 yrs 7 mos",
                    location: "Indore, Madhya Pradesh, India",
                    logo: "/placeholder.svg?height=48&width=48",
                    additionalInfo: "I helped me get this job",
                    skills: ["GIT", "Web Accessibility", "+25 skills"],
                  },
                ]}
              />

              <CertificationsSection
                certifications={[
                  {
                    title: "The Bits and Bytes of Computer Networking",
                    issuer: "Google",
                    date: "Issued Apr 2020",
                    credentialId: "YXBE3R4DXWGR",
                    logo: "/placeholder.svg?height=48&width=48",
                  },
                  {
                    title: "Machine Learning",
                    issuer: "Stanford Online",
                    date: "Issued Sep 2018",
                    credentialId: "CBKPNDZS-BY",
                    logo: "/placeholder.svg?height=48&width=48",
                  },
                ]}
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
