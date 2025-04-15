import ProfileHeader from "@/components/profile/profile-header"
import AboutSection from "@/components/profile/about-section"
import SkillsSection from "@/components/profile/skills-section"
import EducationSection from "@/components/profile/education-section"
import ExperienceSection from "@/components/profile/experience-section"
import CertificationsSection from "@/components/profile/certifications-section"
import CoursesSection from "@/components/profile/courses-section"

interface UserProfileProps {
  user: any
  name: string
  setIsEditing: (value: boolean) => void
}

export const UserProfile = ({ user, name, setIsEditing }: UserProfileProps) => {
  return (
    <>
      <ProfileHeader
        name={user?.name || "User Name"}
        title={user?.role === "consumer" ? "Student" : "Teacher"}
        location={user?.user_location || ""}
        connections={500}
        profileImageUrl={user?.profileImage || null}
        backgroundImageUrl={"/background.jpeg"}
        university={user?.education?.[0]?.name || ""}
        setIsEditing={setIsEditing}
      />

      <div className="px-4 py-2">
        <AboutSection description={user?.biography || "No biography added"} />

        <SkillsSection skills={Array.isArray(user?.skills) ? user.skills : []} />

        <EducationSection
          educations={(user?.education || []).map((edu: any) => ({
            institution: edu.name,
            degree: edu.course_name,
            years: edu.time_period,
            location: edu.course_description,
            logo: edu.logo ? `/${edu.logo.replace(/\\/g, "/")}` : "",
          }))}
        />

        <ExperienceSection
          experiences={(user?.experience || []).map((exp: any) => ({
            role: exp.position,
            company: exp.position,
            type: exp.job_type,
            duration: exp.time_period,
            location: exp.location,
            logo: exp.logo ? `/${exp.logo.replace(/\\/g, "/")}` : "",
            skills: exp.skills ? exp.skills.split(",") : [],
          }))}
        />

        <CertificationsSection
          certifications={(user?.license_certificate || []).map((cert: any) => ({
            title: cert.certificate_name,
            issuer: cert.issuing_organization,
            date: cert.issue_date,
            credentialId: cert.credential_id,
            logo: cert.logo ? `/${cert.logo.replace(/\\/g, "/")}` : "/certificate.jpg",
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
              students: "418,658 student",
              price: "₹4,999",
              image: "https://img-c.udemycdn.com/course/240x135/5672302_cfed.jpg",
            },
          ]}
        />
      </div>
    </>
  )
}
