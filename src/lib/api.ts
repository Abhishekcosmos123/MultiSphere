import { coursesDatabase, realEstateListings, Course, restaurantListings, crmListings } from "./content";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getSavedModule = (): { name: string } => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return JSON.parse(localStorage.getItem('selectedModule') || '{}') as { name: string };
  }
  return { name: "" };
};

export const fetchCourses = async (category: string, topic: string): Promise<Course[]> => {
  await delay(800);

  const savedModule = getSavedModule();

  const listingsMap: Record<string, Course[]> = {
    "Real Estate": realEstateListings as Course[], 
    "Restaurants": restaurantListings as Course[], 
    "CRM Management": crmListings as Course[], 
  };

  const listings: Course[] = listingsMap[savedModule?.name] || coursesDatabase;

  return listings.filter(course => {
    const categoryMatch = !category || course.category === category;
    const topicMatch = !topic || course.topics.includes(topic);
    return categoryMatch && topicMatch;
  });
};

  
  // API response format example:
  /*
  {
    "success": true,
    "data": {
      "courses": [
        {
          "id": 1,
          "title": "The Complete AI Guide: Learn ChatGPT, Generative AI & More",
          "instructors": "Julian Melanson, Benza Maman, Leap Y.",
          "rating": 4.5,
          "reviews": 45368,
          "price": 549,
          "originalPrice": 2699,
          "image": "/placeholder.svg?height=400&width=600",
          "badges": ["Premium", "Bestseller"],
          "category": "Data Science",
          "topics": ["ChatGPT", "Artificial Intelligence (AI)", "Machine Learning"]
        },
        // More courses...
      ],
      "filters": {
        "selectedCategory": "Data Science",
        "selectedTopic": "ChatGPT",
        "totalResults": 3
      }
    }
  }
  */  
  