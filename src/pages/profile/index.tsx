import ProfileHeader from "@/components/profile//profile-header"
import AboutSection from "@/components/profile//about-section"
import SkillsSection from "@/components/profile//skills-section"
import EducationSection from "@/components/profile//education-section"
import ExperienceSection from "@/components/profile//experience-section"
import CertificationsSection from "@/components/profile//certifications-section"
import CoursesSection from "@/components/profile/courses-section"
import { NavigationBar } from "@/components/dashboard/navigation-bar"
import { CRMButtons, ELearningButtons, RealEstateButtons, RestaurantButtons } from "@/lib/content"
import { useState } from "react"

interface Module {
    id: number;
    name: string;
}

export default function ProfilePage() {
	const [selectedModule, setSelectedModule] = useState<Module>({
        id: 0,
        name: "E-learning",
    });
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
    <div className="mx-auto bg-white shadow-sm overflow-hidden">
      <ProfileHeader
        name="Abhijeet A"
        title="Software Developer"
        location="India"
        connections={500}
        profileImageUrl="/profileImage.jpeg"
        backgroundImageUrl="/background.jpeg"
        university="Devi Ahilya Vishwavidyalaya"
      />

      <div className="px-4 py-2">
        <AboutSection description="5 years of strong experience as a Full-Stack web developer with a solid understanding of front-end technologies, MVC frameworks, RESTful web services, and Data Base designing. Strong knowledge in MEAN/MERN Stack with vast experience in building Web Applications, used React.js/Next.js for client-side, Node.js/Express for server-side, and MongoDB, SQL Server for the database. Involved in Various Projects (Ecommerce, Health... See more" />

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
    </div>
	</div>
  )
}
