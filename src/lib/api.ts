import { coursesDatabase, Course } from "./content"
  
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
  
  export const fetchCourses = async (category: string, topic: string): Promise<Course[]> => {
    await delay(800)
  
    return coursesDatabase.filter((course) => {
      const categoryMatch = category ? course.category === category : true
      const topicMatch = topic ? course.topics.includes(topic) : true
      return categoryMatch && topicMatch
    })
  }
  
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
  