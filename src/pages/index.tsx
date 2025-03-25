import { featuredCourses, popularCourses, luxuryHomes, testimonials } from "@/lib/content"
import { Footer } from "@/components/dashboard/footer"
import { TestimonialSection } from "@/components/dashboard/testimonial-section"
import { CTASection } from "@/components/dashboard/cta-section"
import { PropertySection } from "@/components/dashboard/property-section" 
import { TrustedSection } from "@/components/dashboard/trusted-section"
import { CategorySection } from "@/components/dashboard/category-section"
import { HeroSection } from "@/components/dashboard/hero-section"
import { NavigationBar } from "@/components/dashboard/navigation-bar"
import { CourseCarousel } from "@/components/dashboard/course-carousel"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <main>
        <HeroSection />
        <CategorySection />
        <TrustedSection />
       <CourseCarousel title="Learners are viewing" courses={popularCourses} />
        <PropertySection title="Featured Properties" location="All Locations" properties={luxuryHomes} />
        <TestimonialSection testimonials={testimonials} />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

