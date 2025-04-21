import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

import ProfileHeader from "@/components/profile/profile-header";
import AboutSection from "@/components/profile/about-section";
import SkillsSection from "@/components/profile/skills-section";
import EducationSection from "@/components/profile/education-section";
import ExperienceSection from "@/components/profile/experience-section";
import CertificationsSection from "@/components/profile/certifications-section";
import { CourseCarousel } from "../dashboard/course-carousel";

interface UserProfileProps {
  user: any;
  name: string;
  setIsEditing: (value: boolean) => void;
  selected: string | null;
  readonly?: boolean;
}

export const UserProfile = ({
  user,
  name,
  setIsEditing,
  selected,
  readonly,
}: UserProfileProps) => {
  const { contentUrl } = useSelector((state: RootState) => state.profile);
  const [moduleContent, setModuleContent] = useState<any>(null);

  useEffect(() => {
    const fetchContent = async () => {
      if (!contentUrl) return;
      try {
        const isAbsolute = /^https?:\/\//.test(contentUrl);
        const url = isAbsolute ? contentUrl : `${window.location.origin}${contentUrl}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setModuleContent(data);
      } catch (err) {
        console.error("Failed to load module content", err);
      }
    };

    fetchContent();
  }, [contentUrl]);

  const heroTitle = moduleContent?.popularCourses?.carouselTitle || "Recommended Courses";
  const heroCourses = moduleContent?.popularCourses?.popularCourses || [];

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
        readonly={readonly}
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
          title={heroTitle}
          courses={heroCourses}
          module={selected || ""}
          profile={true}
        />
      </div>
    </>
  );
};
