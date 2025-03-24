import {
  featuredCourses,
  popularCourses,
  luxuryHomes,
  testimonials,
} from "@/lib/content";
import { Footer } from "./_components/dashboard/footer";
import { TestimonialSection } from "./_components/dashboard/testimonial-section";
import { CTASection } from "./_components/dashboard/cta-section";
import { PropertySection } from "./_components/dashboard/property-section";
import { TrustedSection } from "./_components/dashboard/trusted-section";
import { CategorySection } from "./_components/dashboard/category-section";
import { HeroSection } from "./_components/dashboard/hero-section";
import { NavigationBar } from "./_components/dashboard/navigation-bar";
import { CourseCarousel } from "./_components/dashboard/course-carousel";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <main>
        <HeroSection />
        <CategorySection />
        <TrustedSection />
        <CourseCarousel title="Learners are viewing" courses={popularCourses} />
        <PropertySection
          title="Luxury Homes"
          location="Spokane, WA"
          properties={luxuryHomes}
        />
        <TestimonialSection testimonials={testimonials} />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
