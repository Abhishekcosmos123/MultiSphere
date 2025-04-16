import { coursesDatabase, realEstateListings, Course, restaurantListings, crmListings } from "./content";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchCourses = async (
  category: string,
  topic: string,
  savedModuleName: string
): Promise<Course[]> => {
  await delay(800);

  const listingsMap: Record<string, Course[]> = {
    "Real Estate": realEstateListings as Course[], 
    "Restaurants": restaurantListings as Course[], 
    "CRM Management": crmListings as Course[], 
  };

  const listings: Course[] = listingsMap[savedModuleName] || coursesDatabase;

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
  