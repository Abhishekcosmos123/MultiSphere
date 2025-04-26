import { useEffect, useState } from 'react';
import { Footer } from "@/components/dashboard/footer";
import { TestimonialSection } from "@/components/dashboard/testimonial-section";
import { CTASection } from "@/components/dashboard/cta-section";
import { PropertySection } from "@/components/dashboard/property-section";
import { TrustedSection } from "@/components/dashboard/trusted-section";
import { CategorySection } from "@/components/dashboard/category-section";
import { HeroSection } from "@/components/dashboard/hero-section";
import { NavigationBar } from "@/components/dashboard/navigation-bar";
import { CourseCarousel } from "@/components/dashboard/course-carousel";
import { fetchModulesRequest } from '@/store/slices/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import LoaderWithLabel from '@/ui/loader-with-label';
import { showErrorToast } from '@/lib/utils/toast';

export type ModuleName = "Real Estate" | "Restaurants" | "CRM Management" | "E-learning";

const isValidModuleName = (value: any): value is ModuleName =>
  ["Real Estate", "Restaurants", "CRM Management", "E-learning"].includes(value);

const ModuleContent = ({
  moduleName,
  content
}: {
  moduleName: ModuleName;
  content: any;
}) => {
  return (
    <>
      <NavigationBar buttons={content.navbarButtons} />
      <HeroSection
        title={content.ElearningHeroSection.title}
        options={content.ElearningHeroSection.buttons}
        imageSrc={content.ElearningHeroSection.imageSrc}
      />
      <CategorySection
        categories={content.categories}
        popularTopics={content.popularTopics}
        module={moduleName}
        listing={content.listing}
        header={content.categoryHeader}
        subHeader={content.categorySubHeader}
      />
      <TrustedSection />
      <CourseCarousel
        title={content.popularCourses.carouselTitle}
        courses={content.popularCourses.popularCourses}
        module={moduleName}
        productDetailsFields={content.productDetailsFields}
        productInformation={content.productInformation}
      />
      <PropertySection
        title={content.propertyDetails.name}
        location={content.propertyDetails.location}
        properties={content.propertyDetails.properties}
        selectedModule={{ id: 0, name: moduleName }}
      />
      <TestimonialSection
        testimonial={content.testimonialsSection.testimonial}
        testimonials={content.testimonialsSection.testimonials}
      />
      <CTASection
        heading={content.ctaContent.heading}
        backgroundImage={content.ctaContent.backgroundImage}
      />
    </>
  );
};

export default function Home() {
  const dispatch = useDispatch();
  const { currentModule: selected, loading, error, contentUrl } = useSelector(
    (state: RootState) => state.profile
  );

  const [moduleContent, setModuleContent] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchModulesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (error) showErrorToast(error);
  }, [error]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (!contentUrl) return;

        const isAbsolute = /^https?:\/\//.test(contentUrl);
        const url = isAbsolute ? contentUrl : `${window.location.origin}${contentUrl}`;

        const res = await fetch(url);

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setModuleContent(data);
      } catch (err) {
        console.error("Failed to load module content", err);
        showErrorToast("Unable to load content.");
      }
    };

    fetchContent();
  }, [contentUrl]);

  if (loading || !selected || !contentUrl || !moduleContent) {
    return <LoaderWithLabel label="Loading your personalized experience..." />;
  }

  const moduleName = isValidModuleName(selected) ? selected : "E-learning";

  return (
    <div className="flex flex-col min-h-screen">
      <main>
        <ModuleContent moduleName={moduleName} content={moduleContent} />
      </main>
      <Footer socialLinks={moduleContent?.socialLinks || []} footerLinks={moduleContent?.footerLinks || []} />
    </div>
  );
}
