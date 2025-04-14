import { useEffect, useState } from 'react';
import {
  popularCourses, ctaContent, propertyDetails,
  RealEstateButtons, ELearningButtons, ElearningHeroSection,
  RealEstateHeroSection, categories, popularTopics,
  realEstatePopularTopics, realEstateCategories, popularProperties,
  realEstatectaContent, RestaurantButtons, RestaurantHeroSection,
  restaurantCategories, restaurantPopularTopics, popularDishes,
  restaurantctaContent, CRMButtons, CRMHeroSection, crmctaContent,
  popularCRMTools, courseDetails, restaurantDetails, crmCategories,
  crmPopularTopics, crmDetails,
  testimonialElearning,
  testimonialRealEstate, testimonialRestaurant, testimonialCRM
} from "@/lib/content";
import { Footer } from "@/components/dashboard/footer";
import { TestimonialSection } from "@/components/dashboard/testimonial-section";
import { CTASection } from "@/components/dashboard/cta-section";
import { PropertySection } from "@/components/dashboard/property-section";
import { TrustedSection } from "@/components/dashboard/trusted-section";
import { CategorySection } from "@/components/dashboard/category-section";
import { HeroSection } from "@/components/dashboard/hero-section";
import { NavigationBar } from "@/components/dashboard/navigation-bar";
import { CourseCarousel } from "@/components/dashboard/course-carousel";
import { storage, StorageKeys } from '@/lib/utils/storage';
import { fetchCurrentModuleRequest } from '@/store/slices/ superAdmin/currentModuleSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import Loader from '@/ui/loader';
import LoaderWithLabel from '@/ui/loader-with-label';

interface Module {
  id: number;
  name: ModuleName;
}

export type ModuleName = "Real Estate" | "Restaurants" | "CRM Management" | "E-learning";

const moduleContentMap: Record<ModuleName, {
  buttons: any;
  hero: any;
  categories: any;
  popularTopics: any;
  carouselTitle: string;
  courses: any;
  propertyDetails: any;
  cta: any;
  testimonials: { testimonial: any; testimonials: any };
}> = {
  "Real Estate": {
    buttons: RealEstateButtons,
    hero: RealEstateHeroSection,
    categories: realEstateCategories,
    popularTopics: realEstatePopularTopics,
    carouselTitle: "Trending Properties",
    courses: popularProperties,
    propertyDetails,
    cta: realEstatectaContent,
    testimonials: testimonialRealEstate,
  },
  "Restaurants": {
    buttons: RestaurantButtons,
    hero: RestaurantHeroSection,
    categories: restaurantCategories,
    popularTopics: restaurantPopularTopics,
    carouselTitle: "Trending Restaurants",
    courses: popularDishes,
    propertyDetails: restaurantDetails,
    cta: restaurantctaContent,
    testimonials: testimonialRestaurant,
  },
  "CRM Management": {
    buttons: CRMButtons,
    hero: CRMHeroSection,
    categories: crmCategories,
    popularTopics: crmPopularTopics,
    carouselTitle: "Trending Tools",
    courses: popularCRMTools,
    propertyDetails: crmDetails,
    cta: crmctaContent,
    testimonials: testimonialCRM,
  },
  "E-learning": {
    buttons: ELearningButtons,
    hero: ElearningHeroSection,
    categories,
    popularTopics,
    carouselTitle: "Trending Courses",
    courses: popularCourses,
    propertyDetails: courseDetails,
    cta: ctaContent,
    testimonials: testimonialElearning,
  }
};

const ModuleContent = ({ module }: { module: Module | null }) => {
  const content = moduleContentMap[module?.name as ModuleName] || moduleContentMap["E-learning"];

  return (
    <>
      <NavigationBar buttons={content.buttons} />
      <HeroSection title={content.hero.title} options={content.hero.buttons} imageSrc={content.hero.imageSrc} />
      <CategorySection categories={content.categories} popularTopics={content.popularTopics} module={module?.name || "E-learning"} />
      <TrustedSection />
      <CourseCarousel title={content.carouselTitle} courses={content.courses} module={module?.name || "E-learning"} />
      <PropertySection
        title={content.propertyDetails.name}
        location={content.propertyDetails.location}
        properties={content.propertyDetails.properties}
        selectedModule={module || { id: 0, name: "E-learning" }}
      />
      <TestimonialSection testimonial={content.testimonials.testimonial} testimonials={content.testimonials.testimonials} />
      <CTASection heading={content.cta.heading} backgroundImage={content.cta.backgroundImage} />
    </>
  );
};

export default function Home() {
  const dispatch = useDispatch();
  const { currentModule: selected, loading } = useSelector((state: RootState) => state.currentModule);

  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  useEffect(() => {
    dispatch(fetchCurrentModuleRequest());
  }, []);

  useEffect(() => {
    if (selected && typeof selected === "string") {
      setSelectedModule({ id: 0, name: selected as ModuleName });
    }
  }, [selected]);  

  if (loading || !selectedModule) {
    return <LoaderWithLabel label="Loading your personalized experience..." />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main>
        <ModuleContent module={selectedModule} />
      </main>
      <Footer />
    </div>
  );
}
