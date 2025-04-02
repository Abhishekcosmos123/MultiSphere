import { popularCourses, testimonials, ctaContent, propertyDetails, RealEstateButtons, ELearningButtons, ElearningHeroSection, RealEstateHeroSection, categories, popularTopics, Course, realEstatePopularTopics, realEstateCategories, popularProperties, realEstatectaContent, RestaurantButtons, RestaurantHeroSection, restaurantCategories, restaurantPopularTopics } from "@/lib/content";
import { Footer } from "@/components/dashboard/footer";
import { TestimonialSection } from "@/components/dashboard/testimonial-section";  
import { CTASection } from "@/components/dashboard/cta-section";
import { PropertySection } from "@/components/dashboard/property-section";
import { TrustedSection } from "@/components/dashboard/trusted-section";
import { CategorySection } from "@/components/dashboard/category-section";
import { HeroSection } from "@/components/dashboard/hero-section";
import { NavigationBar } from "@/components/dashboard/navigation-bar";
import { CourseCarousel } from "@/components/dashboard/course-carousel";
import { useEffect, useState } from 'react';

interface Module {
  id: number;
  name: string;
}

export default function Home() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  useEffect(() => {
    const savedModule = localStorage.getItem('selectedModule');
    if (savedModule) {
      setSelectedModule(JSON.parse(savedModule));
    }
  }, []);

  // Show Real Estate related components
  if (selectedModule?.name === "Real Estate") {
    return (
      <div className="flex flex-col min-h-screen">
        <NavigationBar buttons={RealEstateButtons} />
        <main>
          <HeroSection title={RealEstateHeroSection.title} options={RealEstateHeroSection.buttons} imageSrc={RealEstateHeroSection.imageSrc} />
          <CategorySection categories={realEstateCategories} popularTopics={realEstatePopularTopics} module={selectedModule?.name} />
          <TrustedSection />
          <CourseCarousel title="Trending Properties" courses={popularProperties} />
          <PropertySection
            title={propertyDetails.name}
            location={propertyDetails.location}
            properties={propertyDetails.properties}
            selectedModule={selectedModule}
          />
          <TestimonialSection testimonials={testimonials} />
          <CTASection
            heading={realEstatectaContent.heading}
            backgroundImage={realEstatectaContent.backgroundImage}
          />
        </main>
        <Footer />
      </div>
    );
  }

  if (selectedModule?.name === "Restaurants") {
    return (
      <div className="flex flex-col min-h-screen">
        <NavigationBar buttons={RestaurantButtons} />
        <main>
          <HeroSection title={RestaurantHeroSection.title} options={RestaurantHeroSection.buttons} imageSrc={RestaurantHeroSection.imageSrc} />
          <CategorySection categories={restaurantCategories} popularTopics={restaurantPopularTopics} module={selectedModule?.name} />
          {/* <TrustedSection />
          <CourseCarousel title="Trending Properties" courses={popularProperties} />
          <PropertySection
            title={propertyDetails.name}
            location={propertyDetails.location}
            properties={propertyDetails.properties}
            selectedModule={selectedModule}
          />
          <TestimonialSection testimonials={testimonials} />
          <CTASection
            heading={realEstatectaContent.heading}
            backgroundImage={realEstatectaContent.backgroundImage}
          /> */}
        </main>
        <Footer />
      </div>
    );
  }

  // Default or no module selected
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar buttons={ELearningButtons} />
      <main>
      <HeroSection title={ElearningHeroSection.title} options={ElearningHeroSection.buttons} imageSrc={ElearningHeroSection.imageSrc} />
        <CategorySection categories={categories} popularTopics={popularTopics} module={selectedModule?.name || "E-learning"} />
        <TrustedSection />
        <CourseCarousel title="Trending Courses" courses={popularCourses} />
        <TestimonialSection testimonials={testimonials} />
        <CTASection
          heading={ctaContent.heading}
          backgroundImage={ctaContent.backgroundImage}
        />
      </main>
      <Footer />
    </div>
  );
}
