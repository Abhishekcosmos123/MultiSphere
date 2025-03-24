export interface Course {
  id: number;
  title: string;
  instructors: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  image: string;
  badges: string[];
  category: string;
  topics: string[];
  isNew?: boolean;
}

const coursesDatabase: Course[] = [
  {
    id: 1,
    title: "The Complete AI Guide: Learn ChatGPT, Generative AI & More",
    instructors: "Julian Melanson, Benza Maman, Leap Y.",
    rating: 4.5,
    reviews: 45368,
    price: 549,
    originalPrice: 2699,
    image: "/placeholder.svg?height=400&width=600",
    badges: ["Premium", "Bestseller"],
    category: "Data Science",
    topics: ["ChatGPT", "Artificial Intelligence (AI)", "Machine Learning"],
  },
  {
    id: 2,
    title: "The Complete AI-Powered Copywriting Course & ChatGPT Guide",
    instructors: "Ing. Tomas Moravek, Learn Digital",
    rating: 4.3,
    reviews: 1797,
    price: 549,
    originalPrice: 3099,
    image: "/placeholder.svg?height=400&width=600",
    badges: ["Premium"],
    category: "Communication",
    topics: ["ChatGPT", "Artificial Intelligence (AI)"],
  },
  {
    id: 3,
    title: "ChatGPT, DeepSeek, Grok and 30+ More AI Marketing Assistants",
    instructors: "Anton Voroniuk, Anton Voroniuk Support",
    rating: 4.4,
    reviews: 526,
    price: 549,
    originalPrice: 799,
    image: "/placeholder.svg?height=400&width=600",
    badges: ["Premium"],
    category: "Business Analytics & Intelligence",
    topics: ["ChatGPT", "Artificial Intelligence (AI)"],
  },
  {
    id: 4,
    title: "The Complete ChatGPT Guide From Zero to Hero - 2025",
    instructors: "A.M.A.M Mubeen (Expert In Tally &",
    rating: 4.2,
    reviews: 477,
    price: 499,
    originalPrice: 799,
    image: "/placeholder.svg?height=400&width=600",
    badges: [],
    category: "IT Certifications",
    topics: ["ChatGPT"],
  },
  {
    id: 5,
    title: "Python for Data Science and Machine Learning Bootcamp",
    instructors: "Jose Portilla",
    rating: 4.6,
    reviews: 125789,
    price: 649,
    originalPrice: 3499,
    image: "/placeholder.svg?height=400&width=600",
    badges: ["Premium", "Bestseller"],
    category: "Data Science",
    topics: ["Python", "Data Science", "Machine Learning"],
  },
  {
    id: 6,
    title: "Machine Learning A-Z: Hands-On Python & R In Data Science",
    instructors: "Kirill Eremenko, Hadelin de Ponteves",
    rating: 4.5,
    reviews: 158964,
    price: 549,
    originalPrice: 3299,
    image: "/placeholder.svg?height=400&width=600",
    badges: ["Premium", "Bestseller"],
    category: "Data Science",
    topics: ["Machine Learning", "Python", "Data Science"],
  },
  {
    id: 7,
    title: "Deep Learning Specialization",
    instructors: "Andrew Ng",
    rating: 4.8,
    reviews: 45698,
    price: 749,
    originalPrice: 4999,
    image: "/placeholder.svg?height=400&width=600",
    badges: ["Premium", "Bestseller"],
    category: "Data Science",
    topics: [
      "Deep Learning",
      "Machine Learning",
      "Artificial Intelligence (AI)",
    ],
  },
  {
    id: 8,
    title: "Statistics for Data Science and Business Analysis",
    instructors: "365 Careers",
    rating: 4.5,
    reviews: 28745,
    price: 449,
    originalPrice: 1999,
    image: "/placeholder.svg?height=400&width=600",
    badges: ["Premium"],
    category: "Data Science",
    topics: ["Statistics", "Data Science, Machine Learning"],
  },
  {
    id: 9,
    title: "Natural Language Processing with Python",
    instructors: "Lazy Programmer Inc.",
    rating: 4.6,
    reviews: 12458,
    price: 649,
    originalPrice: 2999,
    image: "/placeholder.svg?height=400&width=600",
    badges: ["Premium"],
    category: "Data Science",
    topics: [
      "Natural Language Processing",
      "Python",
      "Artificial Intelligence (AI)",
    ],
  },
  {
    id: 10,
    title: "Web Development Bootcamp 2025",
    instructors: "Colt Steele",
    rating: 4.7,
    reviews: 215478,
    price: 549,
    originalPrice: 3499,
    image: "/placeholder.svg?height=400&width=600",
    badges: ["Premium", "Bestseller"],
    category: "Web Development",
    topics: ["Python", "JavaScript"],
  },
  {
    id: 11,
    title: "Leadership: Practical Leadership Skills",
    instructors: "Chris Croft",
    rating: 4.5,
    reviews: 32145,
    price: 449,
    originalPrice: 1999,
    image: "/placeholder.svg?height=400&width=600",
    badges: ["Premium", "Bestseller"],
    category: "Leadership",
    topics: [],
  },
  {
    id: 12,
    title: "Business Intelligence with Power BI",
    instructors: "Maven Analytics",
    rating: 4.6,
    reviews: 18745,
    price: 549,
    originalPrice: 2499,
    image: "/placeholder.svg?height=400&width=600",
    badges: ["Premium"],
    category: "Business Analytics & Intelligence",
    topics: ["Data Science"],
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API function to fetch courses based on category and topic
export const fetchCourses = async (
  category: string,
  topic: string,
): Promise<Course[]> => {
  await delay(800);

  return coursesDatabase.filter((course) => {
    const categoryMatch = category ? course.category === category : true;
    const topicMatch = topic ? course.topics.includes(topic) : true;
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
