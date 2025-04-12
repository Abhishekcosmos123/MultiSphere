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
import { showErrorToast, showSuccessToast } from "@/lib/utils/toast"
import { updateProfileRequest } from "@/store/slices/profileSlice"
import ProfileSettings from "@/components/profile/profile-settings-page"
import { Certification, EducationEntry, Experience } from "../../../types/profile"

interface Module {
  id: number;
  name: string;
}

type SocialLink = {
  id: string;
  value: string;
};

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

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [educationList, setEducationList] = useState<EducationEntry[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [biography, setBiography] = useState("");
  const [location, setLocation] = useState("")
  const [language, setLanguage] = useState("")
  const [website, setWebsite ]= useState("")
  const [profileImage, setProfileImage] = useState<File | null>(null)

  const normalizeSocialLinks = (rawLinks: Record<string, string | undefined>[]): SocialLink[] => {
    return rawLinks.flatMap(obj =>
      Object.entries(obj)
        .filter(([_, value]) => typeof value === "string")
        .map(([key, value]) => ({
          id: key,
          value: value as string,
        }))
    );
  };

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(
    normalizeSocialLinks((user?.social_links as Record<string, string | undefined>[]) || [])
  );

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
      setCountryCode(user.country_code || "");
      setBiography(user?.biography)
      setLocation(user?.user_location)
      setLanguage(user?.language)
      setWebsite(user?.website)
      setSocialLinks(normalizeSocialLinks(user?.social_links || []));
      setProfileImage(user?.profileImage || null)
      setSkills(user.skills)
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
      setIsEditing(false);
  
      const formattedSocialLinks = socialLinks.map(({ id, value }) => ({ [id]: value }));
  
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
      }));
    }
  
    if (successMessage?.error) {
      showErrorToast(successMessage.error);
    }
  }, [successMessage?.successMessage, successMessage?.error]);
  
  
  const handleSave = () => {
    if (user) {
      const formattedSocialLinks = socialLinks.map(({ id, value }) => ({ [id]: value }));
      const formData = new FormData();
  
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("country_code", countryCode);
      formData.append("biography", biography);
      formData.append("language", language);
      formData.append("user_location", location);
      formData.append("website", website);
      formData.append("social_links", JSON.stringify(formattedSocialLinks));
      formData.append("skills", JSON.stringify(skills));
      formData.append("education", JSON.stringify(educationList.map(({ logo, ...rest }) => rest)));
      formData.append("experience", JSON.stringify(experiences.map(({ logo, ...rest }) => rest)));
      formData.append("license_certificate", JSON.stringify(certifications.map(({ logo, ...rest }) => rest)));
      if (profileImage instanceof File) {
        formData.append("profileImage", profileImage);
      }
      dispatch(updateProfileRequest({ id: user.id, formData }));
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
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
            email={email}
            setEmail={setEmail}
            biography={biography}
            setBiography={setBiography}
            location={location}
            setLocation={setLocation}
            language={language}
            setLanguage={setLanguage}
            website={website}
            setWebsite={setWebsite}
            socialLinks={socialLinks}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            setSocialLinks={setSocialLinks}
            onSave={handleSave}
            skills={skills}
            setSkills={setSkills}
            educationList={educationList}
            setEducationList={setEducationList}
            experiences={experiences}
            setExperiences={setExperiences}
            certifications={certifications}
            setCertifications={setCertifications}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <ProfileHeader
              name={user?.name || "User Name"}
              title={user?.role === 'consumer' ? "Student" : "Teacher"}
              location={user?.user_location || ""}
              connections={500}
              profileImageUrl={user?.profileImage || null}
              backgroundImageUrl={"/background.jpeg"}
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
                    : "/certificate.jpg",
                }))}
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
                    image: "https://img-c.udemycdn.com/course/240x135/3600048_b195_20.jpg",
                  },
                  {
                    title: "The Complete SQL Bootcamp: Go from Zero to Hero",
                    platform: "Udemy",
                    details: "Become an expert at SQL!",
                    ratings: "4.7",
                    students: "207,000 students",
                    price: "₹1,499",
                    image: "https://img-c.udemycdn.com/course/240x135/5231088_b1e8_2.jpg",
                  },
                  {
                    title: "Python for Data Science and Machine Learning Bootcamp",
                    platform: "Udemy",
                    details: "Learn how to use NumPy, Pandas, Seaborn, Matplotlib...",
                    ratings: "4.6",
                    students: "418,658 students",
                    price: "₹4,999",
                    image: "https://img-c.udemycdn.com/course/240x135/5672302_cfed.jpg",
                  },
                  {
                    title: "The Complete Python Bootcamp From Zero to Hero",
                    platform: "Udemy",
                    details: "Learn Python like a Professional! Start from the basics and go...",
                    ratings: "4.6",
                    students: "1,551,258 students",
                    price: "₹1,499",
                    image: "https://img-c.udemycdn.com/course/240x135/5672302_cfed.jpg",
                  },
                  {
                    title: "The Complete SQL Bootcamp: Go from Zero to Hero",
                    platform: "Udemy",
                    details: "Become an expert at SQL!",
                    ratings: "4.7",
                    students: "207,000 students",
                    price: "₹1,499",
                    image: "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
                  },
                  {
                    title: "Python for Data Science and Machine Learning Bootcamp",
                    platform: "Udemy",
                    details: "Learn how to use NumPy, Pandas, Seaborn, Matplotlib...",
                    ratings: "4.6",
                    students: "418,658 students",
                    price: "₹4,999",
                    image: "https://img-c.udemycdn.com/course/240x135/5672302_cfed.jpg",
                  }
                ]}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
