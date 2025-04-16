import ProfileHeader from "@/components/profile/profile-header"
import AboutSection from "@/components/profile/about-section"
import SkillsSection from "@/components/profile/skills-section"
import EducationSection from "@/components/profile/education-section"
import ExperienceSection from "@/components/profile/experience-section"
import CertificationsSection from "@/components/profile/certifications-section"
import { ModuleName, moduleContentMap } from "@/pages"
import { CourseCarousel } from "../dashboard/course-carousel"

interface UserProfileProps {
  user: any
  name: string
  setIsEditing: (value: boolean) => void
  selected: string | null
}

export const UserProfile = ({
  user,
  name,
  setIsEditing,
  selected,
}: UserProfileProps) => {
  const selectedModule = { id: 0, name: selected };
  const content = moduleContentMap[selectedModule.name as ModuleName] || {}

  return (
    <>
      <ProfileHeader
        name={user?.name || "User Name"}
        title={user?.role === "consumer" ? "Student" : "Teacher"}
        location={user?.location || ""}
        connections={500}
        profileImageUrl={user?.profileImage || "/profileImage.jpeg"}
        backgroundImageUrl="/background.jpeg"
        university={user?.education?.[0]?.name || ""}
        setIsEditing={setIsEditing}
        selected={selected}
      />

      <div className="px-4 py-2">
        <AboutSection description={user?.biography || "No biography added"} />
        {selected !== "Restaurants" && selected !== "Real Estate" && (
          <>
            <SkillsSection skills={Array.isArray(user?.skills) ? user.skills : []} />

            <EducationSection
              educations={(user?.education || []).map((edu: any) => ({
                institution: edu.name || "N/A",
                degree: edu.course_name || "N/A",
                years: edu.time_period || "N/A",
                location: edu.course_description || "N/A",
                logo: edu.logo ? `/${edu.logo.replace(/\\/g, "/")}` : "/avatar.png",
              }))}
            />
          </>
        )}

        <ExperienceSection
          experiences={(user?.experience || []).map((exp: any) => ({
            role: exp.position,
            company: exp.company || exp.position,
            type: exp.job_type,
            duration: exp.time_period,
            location: exp.location,
            logo: exp.logo ? `/${exp.logo.replace(/\\/g, "/")}` : "/avatar.png",
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

        <CourseCarousel
          title={content.carouselTitle || "Recommended Courses"}
          courses={content.courses || []}
          module={selected || ""}
          profile={true}
        />
      </div>
    </>
  );
};
