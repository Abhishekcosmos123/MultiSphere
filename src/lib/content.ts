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

export const navigationLinks = [
  { name: "Plans & Pricing", href: "#" },
  { name: "Live Classes", href: "#" },
  { name: "Tech on Cosmostaker", href: "#" },
]

export const categories: string[] = [
  "Data Science",
  "IT Certifications",
  "Leadership",
  "Web Development",
  "Communication",
  "Business Analytics & Intelligence",
]

export const realEstateCategories: string[] = [
  "Residential Properties",
  "Commercial Properties",
  "Luxury Homes",
  "Apartments & Condos",
  "Vacation Rentals",
];


export const popularTopics = [
  { name: "Data Science", count: "7M+ learners" },
  { name: "Python", count: "47.7M+ learners" },
  { name: "Machine Learning", count: "8M+ learners" },
  { name: "Deep Learning", count: "5M+ learners" },
  { name: "Artificial Intelligence (AI)", count: "8M+ learners" },
  { name: "Statistics", count: "9M+ learners" },
  { name: "R", count: "8M+ learners" },
]
export const realEstatePopularTopics = [
  { name: "Residential Properties", count: "5M+ viewers" },
  { name: "Real Estate Investing", count: "8M+ viewers" },
  { name: "Property Flipping", count: "4M+ viewers" },
  { name: "Rental Property Management", count: "6M+ viewers" },
  { name: "Luxury Real Estate", count: "3M+ viewers" },
  { name: "Commercial Real Estate", count: "7M+ viewers" },
  { name: "Mortgage & Financing", count: "5.5M+ viewers" },
];

export const coursesDatabase: Course[] = [
  {
    id: 1,
    title: "The Complete AI Guide: Learn ChatGPT, Generative AI & More",
    instructors: "Julian Melanson, Benza Maman, Leap Y.",
    rating: 4.5,
    reviews: 45368,
    price: 549,
    originalPrice: 2699,
    image: "https://img-c.udemycdn.com/course/240x135/3600048_b195_20.jpg",
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
    image: "https://img-c.udemycdn.com/course/240x135/5231088_b1e8_2.jpg",
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
    image: "https://img-c.udemycdn.com/course/240x135/5672302_cfed.jpg",
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
    image: "https://img-c.udemycdn.com/course/240x135/5672302_cfed.jpg",
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
    image: "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
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
    image: "https://img-c.udemycdn.com/course/240x135/3600048_b195_20.jpg",
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
    image: "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
    badges: ["Premium", "Bestseller"],
    category: "Data Science",
    topics: ["Deep Learning", "Machine Learning", "Artificial Intelligence (AI)"],
  },
  {
    id: 8,
    title: "Statistics for Data Science and Business Analysis",
    instructors: "365 Careers",
    rating: 4.5,
    reviews: 28745,
    price: 449,
    originalPrice: 1999,
    image: "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
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
    image: "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
    badges: ["Premium"],
    category: "Data Science",
    topics: ["Natural Language Processing", "Python", "Artificial Intelligence (AI)"],
  },
  {
    id: 10,
    title: "Web Development Bootcamp 2025",
    instructors: "Colt Steele",
    rating: 4.7,
    reviews: 215478,
    price: 549,
    originalPrice: 3499,
    image: "https://img-c.udemycdn.com/course/240x135/5170404_d282_9.jpg",
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
    image: "https://img-c.udemycdn.com/course/240x135/3600048_b195_20.jpg",
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
    image: "https://img-c.udemycdn.com/course/240x135/3600048_b195_20.jpg",
    badges: ["Premium"],
    category: "Business Analytics & Intelligence",
    topics: ["Data Science"],
  },
]

export const realEstateListings: Course[] = [
  {
    id: 1,
    title: "Luxury 3BHK Apartment in Downtown LA",
    instructors: "Elite Realty Group",
    rating: 4.7,
    reviews: 125,
    price: 1200000,
    originalPrice: 1300000,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=250&fit=crop",
    badges: ["Luxury", "Hot Deal"],
    category: "Residential Properties",
    topics: ["Residential Properties", "Real Estate Investing"],
  },
  {
    id: 2,
    title: "Spacious 4BHK Villa with Garden",
    instructors: "Prime Estates",
    rating: 4.8,
    reviews: 98,
    price: 1850000,
    originalPrice: 1950000,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=250&fit=crop",
    badges: ["Premium", "New Listing"],
    category: "Residential Properties",
    topics: ["Commercial Real Estate", "Residential Properties, Luxury Real Estate"],
  },
  {
    id: 3,
    title: "Modern Studio Apartment near Central Park",
    instructors: "Urban Realty Co.",
    rating: 4.6,
    reviews: 210,
    price: 650000,
    originalPrice: 700000,
    image: "https://images.unsplash.com/photo-1592595896551-a7b31c1776d7?w=400&h=250&fit=crop",
    badges: ["Best Seller"],
    category: "Real Estate Investing",
    topics: ["Mortgage & Financing", "Commercial Real Estate"],
  },
  {
    id: 4,
    title: "Cozy 2BHK House for Rent",
    instructors: "Home Sweet Homes",
    rating: 4.5,
    reviews: 87,
    price: 2500,
    originalPrice: 2800,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=250&fit=crop",
    badges: ["Pet Friendly"],
    category: "Residential Properties",
    topics: ["Commercial Real Estate", "Mortgage & Financing", "Luxury Real Estate"],
  },
  {
    id: 5,
    title: "Commercial Office Space in Silicon Valley",
    instructors: "Silicon Valley Properties",
    rating: 4.9,
    reviews: 143,
    price: 5000000,
    originalPrice: 5500000,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=250&fit=crop",
    badges: ["High Demand"],
    category: "Residential Properties",
    topics: ["Mortgage & Financing", "Commercial Real Estate"],
  }
];

export const popularCourses = [
  {
    id: 1,
    title: "100 Days of Code: The Complete Python Pro Bootcamp for 2025",
    instructors: ["Dr. Angela Yu", "Developer and Lead Instructor"],
    rating: 4.7,
    reviewCount: 241640,
    students: 1452344,
    price: 549,
    originalPrice: 1699,
    image: "https://img-c.udemycdn.com/course/240x135/2776760_f176_10.jpg",
  },
  {
    id: 2,
    title: "The Complete Full-Stack Web Development Bootcamp",
    instructors: ["Dr. Angela Yu", "Developer and Lead Instructor"],
    rating: 4.7,
    reviewCount: 122055,
    students: 654321,
    price: 499,
    originalPrice: 1699,
    image: "https://img-c.udemycdn.com/course/240x135/2776760_f176_10.jpg",
  },
  {
    id: 3,
    title: "[NEW] Ultimate AWS Certified Cloud Practitioner - CLF-C02 2025",
    instructors: ["Stephane Maarek", "AWS Certified Cloud Practitioner"],
    rating: 4.7,
    reviewCount: 153075,
    students: 876543,
    price: 549,
    originalPrice: 1699,
    image: "https://img-c.udemycdn.com/course/240x135/3142166_a637_3.jpg",
  },
  {
    id: 4,
    title: "Ultimate AWS Certified Solutions Architect Associate SAA-C03 2025",
    instructors: ["Stephane Maarek", "AWS Certified Cloud Practitioner"],
    rating: 4.7,
    reviewCount: 187654,
    students: 932456,
    price: 549,
    originalPrice: 1699,
    image: "https://img-c.udemycdn.com/course/240x135/3142166_a637_3.jpg",
  },
  {
    id: 5,
    title: "Ultimate AWS Certified Solutions Architect Associate SAA-C03 2025",
    instructors: ["Stephane Maarek", "AWS Certified Cloud Practitioner"],
    rating: 4.7,
    reviewCount: 187654,
    students: 932456,
    price: 549,
    originalPrice: 1699,
    image: "https://img-c.udemycdn.com/course/240x135/6100015_1979_4.jpg",
  },
  {
    id: 6,
    title: "Ultimate AWS Certified Solutions Architect Associate SAA-C03 2025",
    instructors: ["Stephane Maarek", "AWS Certified Cloud Practitioner"],
    rating: 4.7,
    reviewCount: 187654,
    students: 932456,
    price: 549,
    originalPrice: 1699,
    image: "https://img-c.udemycdn.com/course/240x135/1570206_26c6_6.jpg",
  },
  {
    id: 7,
    title: "Ultimate AWS Certified Solutions Architect Associate SAA-C03 2025",
    instructors: ["Stephane Maarek", "AWS Certified Cloud Practitioner"],
    rating: 4.7,
    reviewCount: 187654,
    students: 932456,
    price: 549,
    originalPrice: 1699,
    image: "https://img-c.udemycdn.com/course/240x135/5993822_2c2a_7.jpg",
  }
]

export const popularProperties = [
  {
    id: 1,
    title: "Luxury 3BHK Apartment in Downtown LA",
    instructors: ["John Doe", "Real Estate Agent"],
    rating: 4.8,
    reviewCount: 154,
    students: 120, // Representing inquiries or interested buyers
    price: 3500,
    originalPrice: 4000,
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
  },
  {
    id: 2,
    title: "Modern 2BHK Condo with Ocean View",
    instructors: ["Jane Smith", "Luxury Properties"],
    rating: 4.7,
    reviewCount: 98,
    students: 85,
    price: 2800,
    originalPrice: 3200,
    image: "https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg",
  },
  {
    id: 3,
    title: "Spacious 4BHK Villa with Private Pool",
    instructors: ["Robert Johnson", "Villa Specialist"],
    rating: 4.9,
    reviewCount: 76,
    students: 65,
    price: 5000,
    originalPrice: 5500,
    image: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg",
  },
  {
    id: 4,
    title: "Cozy Studio Apartment in New York",
    instructors: ["Emily Davis", "Rental Expert"],
    rating: 4.5,
    reviewCount: 230,
    students: 190,
    price: 2200,
    originalPrice: 2500,
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
  },
  {
    id: 5,
    title: "Modern 3BHK Townhouse with Garage",
    instructors: ["Michael Brown", "Townhouse"],
    rating: 4.8,
    reviewCount: 110,
    students: 95,
    price: 4500,
    originalPrice: 4800,
    image: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg",
  },
  {
    id: 6,
    title: "Penthouse Suite with Skyline View",
    instructors: ["Sophia Wilson", "High-Rise"],
    rating: 4.9,
    reviewCount: 89,
    students: 72,
    price: 7000,
    originalPrice: 7500,
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
  },
  {
    id: 7,
    title: "Elegant 2BHK Apartment in Seattle",
    instructors: ["Daniel Lee", "Seattle Real Estate"],
    rating: 4.6,
    reviewCount: 125,
    students: 110,
    price: 3100,
    originalPrice: 3400,
    image: "https://images.pexels.com/photos/8136925/pexels-photo-8136925.jpeg",
  }
];

export const testimonials = [
  {
    id: 1,
    text: "Because of this course I was able to clear multiple interviews. Thanks for making such wonderful content.",
    author: "Richard S.",
    course: "Business Intelligence (BI)",
  },
  {
    id: 2,
    text: "This has helped me so much in my career. I started as a frontend engineer and eventually transitioned to full stack engineer with the help of this course.",
    author: "Charlotte W.",
    course: "Go-getting course",
  },
  {
    id: 3,
    text: "Today I am a software developer, and I consider a significant part of my success to the solid foundation laid by this course.",
    author: "Martha A.",
    course: "Java course",
  },
  {
    id: 4,
    text: "I would highly recommend this Web Development Bootcamp to anyone interested in pursuing a career in web development. It provides the foundation to enhance their skills in the field.",
    author: "Anna P.",
    course: "Web Development course",
  },
]

export const footerLinks = [
  { name: "About us", href: "#" },
  { name: "Careers", href: "#" },
  { name: "Accessibility", href: "#" },
  { name: "Feedback", href: "#" },
  { name: "Media room", href: "#" },
  { name: "Ad Choices", href: "#" },
  { name: "Advertise with us", href: "#" },
  { name: "Agent support", href: "#" },
  { name: "Privacy", href: "#" },
  { name: "Terms", href: "#" },
  { name: "Home Made", href: "#" },
  { name: "Tech Blog", href: "#" },
  { name: "Agent Blog", href: "#" },
  { name: "Sitemap", href: "#" },
  { name: "Do Not Sell or Share My Personal Information", href: "#" },
]

export const socialLinks = [
  { name: "Facebook", href: "#", icon: "facebook" },
  { name: "Twitter", href: "#", icon: "twitter" },
  { name: "LinkedIn", href: "#", icon: "linkedin" },
  { name: "Instagram", href: "#", icon: "instagram" },
  { name: "YouTube", href: "#", icon: "youtube" },
]

export const trustedCompanies = [
  { id: 1, name: "Volkswagen", logo: "https://cms-images.udemycdn.com/content/mueb2ve09x/svg/volkswagen_logo.svg?position=c&quality=80&x.app=portals" },
  { id: 2, name: "Samsung", logo: "https://cms-images.udemycdn.com/content/2gevcc0kxt/svg/samsung_logo.svg?position=c&quality=80&x.app=portals" },
  { id: 3, name: "Cisco", logo: "https://cms-images.udemycdn.com/content/mueb2ve09x/svg/cisco_logo.svg?position=c&quality=80&x.app=portals" },
  { id: 4, name: "Vimeo", logo: "https://cms-images.udemycdn.com/content/ryaowrcjb2/svg/vimeo_logo_resized-2.svg?position=c&quality=80&x.app=portals" },
  { id: 5, name: "P&G", logo: "https://cms-images.udemycdn.com/content/bthyo156te/svg/procter_gamble_logo.svg?position=c&quality=80&x.app=portals" },
  { id: 6, name: "Hewlett Packard Enterprise", logo: "https://cms-images.udemycdn.com/content/luqe0d6mx2/svg/hewlett_packard_enterprise_logo.svg?position=c&quality=80&x.app=portals" },
  { id: 7, name: "Citi", logo: "https://cms-images.udemycdn.com/content/siaewwmkch/svg/citi_logo.svg?position=c&quality=80&x.app=portals" },
  { id: 8, name: "Ericsson", logo: "https://cms-images.udemycdn.com/content/swmv0okrlh/svg/ericsson_logo.svg?position=c&quality=80&x.app=portals" },
];

export const ELearningButtons = [
  { label: "My Learnings", index: 0 },
  { label: "Live Classes", index: 1 },
  { label: "Teach on CU", index: 2 },
  { label: "Pricing & Subscriptions", index: 3 },
  { label: "Trainings & Certificates", index: 4 },
  { label: "Contact Us", index: 5 },
];

const searchText = [
  { label: "Courses", index: 0 },
  { label: "Trainers", index: 1 },
  { label: "Certificates", index: 2 },
];

export const ElearningHeroSection = {
  title: "The #1 site for lifelong learners.",
  buttons: searchText.map(button => button.label),
  imageSrc: "https://s.udemycdn.com/browse_components/billboard/fallback_banner_image_udlite.jpg",
};

export const RealEstateButtons = [
  { label: "Home", index: 0 },
  { label: "Buy", index: 1 },
  { label: "Rent", index: 2 },
  { label: "Sell", index: 3 },
  { label: "Commercial", index: 4 },
  { label: "Mortgage", index: 5 },
  { label: "Agents", index: 6 },
  { label: "Market Trends", index: 7 },
  { label: "Contact Us", index: 8 },
];

export const RealEstateHeroSection = {
  title: "Your #1 Destination for Buying, Selling & Renting Homes.",
  buttons: RealEstateButtons.map(button => button.label),
  imageSrc: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&h=600&auto=format&fit=crop",
};

export const searchOptionsElearning = ["Courses", "Trainers", "Certificates"];
export const searchOptionsRealEstate = ["Buy", "Rent", "Sell", "Commercial", "Mortgage", "Agents", "Market Trends"];

export const userRoles = ["Student", "Trainer"];

export const ctaContent = {
  heading: "Come Teach with us?",
  backgroundImage: "/ebook.png"
};
export const realEstatectaContent = {
  heading: "Find Your Dream Home Today?",
  backgroundImage: "/realEstate.png"
};

export const courses = [
  {
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&h=400&crop=faces&fit=crop",
    title: "Data Science & Machine Learning",
    description: "Expert in AI, Data Science, and Deep Learning with 10+ years of experience",
    instructors: "Krish Naik",
    rating: 4.8,
    ratingsCount: 9800,
    totalHours: 1500,
    lectures: 120,
    level: "Expert",
    price: 499,
    originalPrice: 2999,
    new: true,
  },
  {
    image: "https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=600&h=400&crop=faces&fit=crop",
    title: "JavaScript & Web Development",
    description: "Full-Stack JavaScript Developer with expertise in React, Node.js, and TypeScript",
    instructors: "John Doe",
    rating: 4.7,
    ratingsCount: 8700,
    totalHours: 1200,
    lectures: 200,
    level: "Intermediate",
    price: 699,
    originalPrice: 3499,
    new: false,
  },
  {
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&h=400&crop=faces&fit=crop",
    title: "React & Next.js Development",
    description: "Passionate Frontend Engineer teaching modern web development best practices",
    instructors: "Emily White",
    rating: 4.9,
    ratingsCount: 1020,
    totalHours: 1000,
    lectures: 180,
    level: "Advanced",
    price: 899,
    originalPrice: 3999,
    new: true,
  },
  {
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&h=400&crop=faces&fit=crop",
    title: "Full-Stack Web Development",
    description: "Full-stack engineer covering everything from backend APIs to frontend UI",
    instructors: "David Green",
    rating: 4.8,
    ratingsCount: 1130,
    totalHours: 1400,
    lectures: 250,
    level: "Expert",
    price: 899,
    originalPrice: 3999,
    new: true,
  },
  {
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=600&h=400&crop=faces&fit=crop",
    title: "Machine Learning & Web Development",
    description: "Helping designers master UX, UI, and product design fundamentals",
    instructors: "Sophia Brown",
    rating: 4.6,
    ratingsCount: 7200,
    totalHours: 800,
    lectures: 150,
    level: "Beginner to Advanced",
    price: 799,
    originalPrice: 3499,
    new: false,
  },
  {
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&h=400&crop=faces&fit=crop",
    title: "Cybersecurity & Ethical Hacking",
    description: "Cybersecurity professional specializing in penetration testing and ethical hacking",
    instructors: "James Wilson",
    rating: 4.7,
    ratingsCount: 8600,
    totalHours: 1100,
    lectures: 220,
    level: "Intermediate",
    price: 899,
    originalPrice: 3999,
    new: true,
  },
];

export const topSellersRealEstate = [
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ73wzyPaF718GvLjg0Pbc0ebfXB0SODEz7yQ&s",
    title: "Skyline Heights",
    description: "A luxurious high-rise with breathtaking city views and top-tier amenities.",
    instructors: "Agent Michael Carter",
    rating: 4.9,
    ratingsCount: 320,
    totalHours: 1500, // Open house and availability hours
    lectures: 50, // Properties available
    level: "Luxury",
    price: 950000, // Average property price
    originalPrice: 1050000,
    new: true,
  },
  {
    image: "https://photos.zillowstatic.com/fp/55b92d7dd348a345d250766d1a115bf3-h_l.jpg",
    title: "Sunset Villas",
    description: "A serene collection of beachfront villas perfect for a peaceful retreat.",
    instructors: "Agent Sophia Martinez",
    rating: 4.8,
    ratingsCount: 280,
    totalHours: 1400,
    lectures: 35,
    level: "Premium",
    price: 750000,
    originalPrice: 820000,
    new: false,
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQHPfQUVz-IIzGuVQH4EYE6zq75BAfY7h9xg&s",
    title: "Maplewood Residences",
    description: "A charming suburban neighborhood with modern homes and green spaces.",
    instructors: "Agent David Reynolds",
    rating: 4.7,
    ratingsCount: 350,
    totalHours: 1600,
    lectures: 60,
    level: "Family-Friendly",
    price: 500000,
    originalPrice: 550000,
    new: true,
  },
  {
    image: "https://photos.zillowstatic.com/fp/455ba54d4780a324ce94cd9801af917e-h_l.jpg",
    title: "Metropolitan Lofts",
    description: "Urban-style lofts with open floor plans and industrial aesthetics.",
    instructors: "Agent Olivia Bennett",
    rating: 4.6,
    ratingsCount: 260,
    totalHours: 1350,
    lectures: 40,
    level: "Modern Living",
    price: 670000,
    originalPrice: 710000,
    new: false,
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmlEGYPb02fx7KaFxaBmGhX8JTBOVqZL9KRQ&s",
    title: "The Green Estates",
    description: "Sustainable and eco-friendly homes built with energy-efficient designs.",
    instructors: "Agent Ethan Sullivan",
    rating: 4.8,
    ratingsCount: 200,
    totalHours: 1200,
    lectures: 30,
    level: "Eco-Friendly",
    price: 620000,
    originalPrice: 680000,
    new: true,
  },
  {
    image: "https://media.licdn.com/dms/image/v2/D5603AQH2toubaw_Bag/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1713851119380?e=2147483647&v=beta&t=byZJsEMtNMaLAa64iH1Qi2K1krkjw76vIx7Bift_aSM",
    title: "Historic Brownstones",
    description: "Timeless architecture with a blend of classic and modern interiors.",
    instructors: "Agent Amelia Brooks",
    rating: 4.9,
    ratingsCount: 400,
    totalHours: 1550,
    lectures: 45,
    level: "Classic Charm",
    price: 800000,
    originalPrice: 860000,
    new: true,
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIRV0RKMZGw5hRkHRk1Xv4i_FFFBo-H50erw&s",
    title: "Parkside Towers",
    description: "Elegant apartments with park-facing balconies and luxury amenities.",
    instructors: "Agent Ryan Foster",
    rating: 4.7,
    ratingsCount: 500,
    totalHours: 1300,
    lectures: 55,
    level: "Luxury Apartments",
    price: 900000,
    originalPrice: 970000,
    new: false,
  },
];

export const propertyDetails = {
  name: "Top Sellers",
  location: "All Locations",
  properties: topSellersRealEstate,
};

export const courseDetails = {
  name: "Top Trainers",
  location: "All Locations",
  properties: courses,
};

export const trustedMessage = "Trusted by over 16,000 companies and millions of learners around the world";

export const testimonialElearning = {
  testimonial: "See what others are achieving through learning",
  testimonials: testimonials,
}

export const initialModules = [
  { name: "HeroSection", read: true },
  { name: "CategorySection", read: true },
  { name: "TrustedSection", read: true },
  { name: "CourseCarousel", read: true },
  { name: "PropertySection", read: true },
  { name: "TestimonialSection", read: true },
  { name: "CTASection", read: true },
]

export const testimonialsRealEstate = [
  {
    id: 1,
    text: "This real estate course gave me the confidence and knowledge to make my first investment successfully. Highly recommended!",
    author: "James R.",
    course: "Real Estate Investment Fundamentals",
  },
  {
    id: 2,
    text: "The insights from this course helped me understand market trends and negotiate better deals. It was a game-changer for my career.",
    author: "Sophia M.",
    course: "Advanced Real Estate Strategies",
  },
  {
    id: 3,
    text: "I started with zero knowledge about real estate, but this course gave me everything I needed to start flipping houses profitably.",
    author: "Daniel K.",
    course: "House Flipping Mastery",
  },
  {
    id: 4,
    text: "As a new real estate agent, this course provided me with essential skills in property valuation, marketing, and client management. A must for beginners!",
    author: "Emily T.",
    course: "Real Estate Agent Essentials",
  },
]

export const testimonialRealEstate = {
  testimonial: "See how others are finding their dream properties.",
  testimonials: testimonialsRealEstate,
}

// Restaurants

export const RestaurantButtons = [
  { label: "Home", index: 0 },
  { label: "Menu", index: 1 },
  { label: "Order Online", index: 2 },
  { label: "Reservations", index: 3 },
  { label: "Specials", index: 4 },
  { label: "Catering", index: 5 },
  { label: "Events", index: 6 },
  { label: "Reviews", index: 7 },
  { label: "Contact Us", index: 8 },
];

export const RestaurantHeroSection = {
  title: "Delicious Meals, Anytime, Anywhere!",
  buttons: RestaurantButtons.map(button => button.label),
  imageSrc: "https://assets.architecturaldigest.in/photos/65e9631d9719efc62841b9d5/16:9/w_2560%2Cc_limit/DSC07703_11zon.jpg",
};

export const restaurantCategories: string[] = [
  "Local Restaurants",
  "Japanese",
  "Street Food Adventures",
  "American",
];

export const restaurantPopularTopics = [
  { name: "Local Restaurants", count: "10M+ viewers" },
  { name: "Trending Dishes", count: "7M+ viewers" },
  { name: "Healthy Eating", count: "5M+ viewers" },
  { name: "Street Food Adventures", count: "6.5M+ viewers" },
  { name: "Fine Dining Experiences", count: "4M+ viewers" },
];

export const restaurantListings: Course[] = [
  {
    id: 1,
    title: "Authentic Italian Pasta & Pizza",
    instructors: "La Bella Italia",
    rating: 4.8,
    reviews: 320,
    price: 20,
    originalPrice: 25,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=250&fit=crop",
    badges: ["Best Seller", "Customer Favorite"],
    category: "Local Restaurants",
    topics: ["Trending Dishes", "Fine Dining Experiences", "Local Restaurants"],
  },
  {
    id: 2,
    title: "Sushi & Sashimi Special Platter",
    instructors: "Tokyo Bites",
    rating: 4.9,
    reviews: 275,
    price: 35,
    originalPrice: 40,
    image: "https://images.unsplash.com/photo-1562158074-1602c2db2c76?w=400&h=250&fit=crop",
    badges: ["Premium", "Fresh Ingredients"],
    category: "Japanese Cuisine",
    topics: ["Street Food Adventures", "Sashimi", "Healthy Eating"],
  },
  {
    id: 3,
    title: "BBQ Ribs & Smoked Brisket",
    instructors: "Texas Smokehouse",
    rating: 4.7,
    reviews: 198,
    price: 28,
    originalPrice: 32,
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&h=250&fit=crop",
    badges: ["Grill Master", "Crowd Favorite"],
    category: "Local Restaurants",
    topics: ["Street Food Adventures", "Slow Cooked", "Meat Lovers"],
  },
  {
    id: 4,
    title: "Vegan Buddha Bowl & Smoothies",
    instructors: "Green Earth Cafe",
    rating: 4.6,
    reviews: 250,
    price: 18,
    originalPrice: 22,
    image: "https://images.unsplash.com/photo-1523181300153-daa1de7bb0a4?w=400&h=250&fit=crop",
    badges: ["Vegan", "Gluten-Free"],
    category: "Local Restaurants",
    topics: ["Plant-Based", "Organic", "Local Restaurants"],
  },
  {
    id: 5,
    title: "Classic French Pastries & Desserts",
    instructors: "Parisian Delights",
    rating: 4.9,
    reviews: 312,
    price: 15,
    originalPrice: 18,
    image: "https://images.unsplash.com/photo-1541592106381-e175b94c74b5?w=400&h=250&fit=crop",
    badges: ["Sweet Tooth", "Authentic"],
    category: "Desserts & Pastries",
    topics: ["French Bakery", "Street Food Adventures", "Cakes"],
  }
];

export const popularDishes = [
  {
    id: 1,
    title: "Signature Truffle Pasta",
    instructors: ["Chef Mario Rossi", "Italian Cuisine Specialist"],
    rating: 4.9,
    reviewCount: 320,
    students: 1500, // Representing number of times ordered
    price: 25,
    originalPrice: 30,
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
  },
  {
    id: 2,
    title: "Sushi & Sashimi Deluxe",
    instructors: ["Chef Hiro Tanaka", "Japanese Culinary Expert"],
    rating: 4.8,
    reviewCount: 280,
    students: 1350,
    price: 40,
    originalPrice: 45,
    image: "https://images.pexels.com/photos/3298182/pexels-photo-3298182.jpeg",
  },
  {
    id: 3,
    title: "Texas BBQ Ribs",
    instructors: ["Chef Jack Thompson", "BBQ Pitmaster"],
    rating: 4.7,
    reviewCount: 250,
    students: 1120,
    price: 28,
    originalPrice: 32,
    image: "https://images.pexels.com/photos/3756523/pexels-photo-3756523.jpeg",
  },
  {
    id: 4,
    title: "Avocado & Quinoa Bowl",
    instructors: ["Chef Lisa Green", "Healthy Eating Advocate"],
    rating: 4.6,
    reviewCount: 210,
    students: 980,
    price: 18,
    originalPrice: 22,
    image: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg",
  },
  {
    id: 5,
    title: "Classic French Croissants",
    instructors: ["Chef Pierre Laurent", "Pastry Artisan"],
    rating: 4.9,
    reviewCount: 270,
    students: 1250,
    price: 15,
    originalPrice: 18,
    image: "https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg",
  },
  {
    id: 6,
    title: "Cheeseburger & Fries",
    instructors: ["Chef David Miller", "Burger Specialist"],
    rating: 4.8,
    reviewCount: 260,
    students: 1300,
    price: 22,
    originalPrice: 26,
    image: "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg",
  },
  {
    id: 7,
    title: "Mango Sticky Rice",
    instructors: ["Chef Suthida Wong", "Thai Dessert Expert"],
    rating: 4.7,
    reviewCount: 190,
    students: 890,
    price: 12,
    originalPrice: 15,
    image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
  }
];

export const restaurantctaContent = {
  heading: "Streamline Your Customer Relationships!",
  backgroundImage: "/restaurants.png"
};

export const restaurants = [
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRE4TVoqp_sXtHL8mN4oEUmVK8sMrwu9_C-g&s",
    title: "The Gourmet Bistro",
    description: "A fine dining experience with a curated selection of international cuisines.",
    instructors: "Chef Gordon Ramsey",
    rating: 4.9,
    ratingsCount: 450,
    totalHours: 1200, // Operating hours per year
    lectures: 120, // Dishes on the menu
    level: "Luxury",
    price: 150, // Average cost per person
    originalPrice: 200,
    new: true,
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJI34h2joZ0NmhXEOph2UQY4SV3P-2SH4mGg&s",
    title: "Sakura Sushi Bar",
    description: "Authentic Japanese sushi prepared by top sushi masters.",
    instructors: "Chef Hiroshi Tanaka",
    rating: 4.8,
    ratingsCount: 390,
    totalHours: 1100,
    lectures: 85,
    level: "Premium",
    price: 80,
    originalPrice: 120,
    new: false,
  },
  {
    image: "https://media.licdn.com/dms/image/v2/C4D03AQEI4Jf9fw1psA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1550130891822?e=2147483647&v=beta&t=NNo25IhDAb5u5KxSTqA3_ZFKfHQyiTP1ngPhzgULDdE",
    title: "La Maison Française",
    description: "Experience traditional French cuisine with an artistic modern twist.",
    instructors: "Chef Pierre Laurent",
    rating: 4.7,
    ratingsCount: 350,
    totalHours: 1300,
    lectures: 100,
    level: "Fine Dining",
    price: 140,
    originalPrice: 180,
    new: true,
  },
  {
    image: "https://porkbarrelbbq.com/cdn/shop/articles/Myron_Mixon_BBQ_Pitmaster_b302dd8f-14ef-4c01-bafa-6d1c2265675f_400x.jpg?v=1535240290",
    title: "Texas Smokehouse",
    description: "Authentic Texas BBQ with the best slow-cooked ribs and brisket.",
    instructors: "Pitmaster Jack Thompson",
    rating: 4.6,
    ratingsCount: 280,
    totalHours: 1000,
    lectures: 75,
    level: "Casual",
    price: 50,
    originalPrice: 70,
    new: false,
  },
  {
    image: "https://media.licdn.com/dms/image/v2/D4D22AQGLPvpFlED_vA/feedshare-shrink_800/feedshare-shrink_800/0/1729413378194?e=2147483647&v=beta&t=GMtHzPgMzk62qNj093LbRuUWYOCMm4WI7ouvy-iouz8",
    title: "Mediterranean Delights",
    description: "Fresh and healthy Mediterranean cuisine inspired by the coasts of Greece and Italy.",
    instructors: "Chef Maria Papadopoulos",
    rating: 4.8,
    ratingsCount: 200,
    totalHours: 1150,
    lectures: 90,
    level: "Healthy & Organic",
    price: 75,
    originalPrice: 100,
    new: true,
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREKBZewhuLTTUOFyxYqqdFvfd_tVb5tc0tFw&s",
    title: "The Vegan Haven",
    description: "A paradise for plant-based eaters with an extensive vegan menu.",
    instructors: "Chef Lisa Green",
    rating: 4.9,
    ratingsCount: 400,
    totalHours: 1250,
    lectures: 110,
    level: "Plant-Based",
    price: 65,
    originalPrice: 85,
    new: true,
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWvHJHvbolHhQq-M4_i1rcNpYh0WRkMG-bfA&s",
    title: "Neapolitan Pizza Co.",
    description: "Wood-fired pizzas made with fresh ingredients straight from Italy.",
    instructors: "Chef Antonio Ricci",
    rating: 4.7,
    ratingsCount: 600,
    totalHours: 1050,
    lectures: 50,
    level: "Casual",
    price: 30,
    originalPrice: 45,
    new: false,
  },
];

export const restaurantDetails = {
  name: "Top Chefs",
  location: "All Locations",
  properties: restaurants,
};

export const testimonialRestaurants = [
  {
    id: 1,
    text: "This course helped me turn my passion for cooking into a successful restaurant business. The insights on menu design and cost control were invaluable!",
    author: "Michael B.",
    course: "Restaurant Business Mastery",
  },
  {
    id: 2,
    text: "I learned everything from customer service to kitchen management. This course gave me the confidence to open my own café!",
    author: "Sophia L.",
    course: "Hospitality & Restaurant Management",
  },
  {
    id: 3,
    text: "The marketing strategies taught in this course helped me attract more customers and increase revenue. It was a game-changer!",
    author: "David R.",
    course: "Restaurant Marketing & Branding",
  },
  {
    id: 4,
    text: "Before taking this course, I struggled with inventory and staff management. Now, I run my restaurant efficiently and profitably!",
    author: "Emma W.",
    course: "Efficient Restaurant Operations",
  },
]

export const testimonialRestaurant = {
  testimonial: "Discover the best dining spots, loved by food enthusiasts.",
  testimonials: testimonialRestaurants,
}

// CRM Management

export const CRMButtons = [
  { label: "Dashboard", index: 0 },
  { label: "Customer Profiles", index: 1 },
  { label: "Orders & Transactions", index: 2 },
  { label: "Leads & Opportunities", index: 3 },
  { label: "Marketing Campaigns", index: 4 },
  { label: "Support Tickets", index: 5 },
];

export const CRMHeroSection = {
  title: "Streamline Your Customer Relationships!",
  buttons: CRMButtons.map(button => button.label),
  imageSrc: "/crm-hero.jpg", 
};

export const crmctaContent = {
  heading: "Effortlessly Manage and Grow Your Customer Relationships!",
  backgroundImage: "/crm.jpg"
};

export const popularCRMTools = [
  {
    id: 1,
    title: "Salesforce CRM",
    instructors: ["Marc Benioff", "CRM Expert Specialist"],
    rating: 4.9,
    reviewCount: 520,
    students: 25000, // Representing number of businesses using it
    price: 99,
    originalPrice: 120,
    image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg",
  },
  {
    id: 2,
    title: "HubSpot CRM",
    instructors: ["Brian Halligan", "Inbound Marketing Guru"],
    rating: 4.8,
    reviewCount: 430,
    students: 22000,
    price: 89,
    originalPrice: 105,
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg",
  },
  {
    id: 3,
    title: "Zoho CRM",
    instructors: ["Sridhar Vembu", "Automation Specialist"],
    rating: 4.7,
    reviewCount: 380,
    students: 18500,
    price: 79,
    originalPrice: 95,
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
  },
  {
    id: 4,
    title: "Pipedrive",
    instructors: ["Timo Rein", "Inbound Sales Optimization"],
    rating: 4.6,
    reviewCount: 290,
    students: 16000,
    price: 69,
    originalPrice: 85,
    image: "https://images.pexels.com/photos/571600/pexels-photo-571600.jpeg",
  },
  {
    id: 5,
    title: "Freshsales",
    instructors: ["Girish Mathrubootham", "Customer Experience Leader"],
    rating: 4.8,
    reviewCount: 310,
    students: 17500,
    price: 74,
    originalPrice: 90,
    image: "https://images.pexels.com/photos/3182834/pexels-photo-3182834.jpeg",
  },
  {
    id: 6,
    title: "Microsoft Dynamics 365",
    instructors: ["Satya Nadella", "Enterprise Solutions Expert"],
    rating: 4.9,
    reviewCount: 450,
    students: 30000,
    price: 120,
    originalPrice: 140,
    image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
  },
  {
    id: 7,
    title: "Monday.com CRM",
    instructors: ["Eran Zinman", "Workflow Automation Expert"],
    rating: 4.7,
    reviewCount: 260,
    students: 15000,
    price: 68,
    originalPrice: 80,
    image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg",
  }
];

export const crmCategories: string[] = [
  "Lead Nurturing",
  "Opportunities",
  "Contacts",
  "Tasks",
];

export const crmPopularTopics = [
  { name: "Lead Nurturing", count: "8M+ viewers" },
  { name: "Sales Pipeline Management", count: "6.5M+ viewers" },
  { name: "Customer Retention", count: "5M+ viewers" },
  { name: "CRM Automation", count: "7M+ viewers" },
  { name: "Effective Follow-ups", count: "4.5M+ viewers" },
];

export const crmListings: Course[] = [
  {
    id: 1,
    title: "Mastering Lead Generation",
    instructors: "Sales Gurus",
    rating: 4.8,
    reviews: 320,
    price: 49,
    originalPrice: 59,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
    badges: ["Best Seller", "Highly Rated"],
    category: "Lead Nurturing",
    topics: ["Lead Nurturing", "CRM Automation", "Sales Strategies"],
  },
  {
    id: 2,
    title: "Effective Sales Pipeline Management",
    instructors: "Growth Experts",
    rating: 4.9,
    reviews: 275,
    price: 79,
    originalPrice: 89,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
    badges: ["Top Course", "Practical Insights"],
    category: "Opportunities",
    topics: ["Sales Pipeline Management", "Customer Retention", "Lead Nurturing"],
  },
  {
    id: 3,
    title: "CRM Automation & Workflow Optimization",
    instructors: "Tech CRM Hub",
    rating: 4.7,
    reviews: 198,
    price: 59,
    originalPrice: 69,
    image: "https://images.unsplash.com/photo-1522202201850-271c5c39b3ea?w=400&h=250&fit=crop",
    badges: ["Automation Expert", "Time Saver"],
    category: "CRM Automation",
    topics: ["CRM Tools", "Automated Follow-ups", "Workflow Optimization"],
  },
  {
    id: 4,
    title: "Building Strong Customer Relationships",
    instructors: "Client Success Academy",
    rating: 4.6,
    reviews: 250,
    price: 39,
    originalPrice: 49,
    image: "https://images.unsplash.com/photo-1519378058457-4c4b396f9f81?w=400&h=250&fit=crop",
    badges: ["Customer Favorite", "Relationship Builder"],
    category: "Customer Management",
    topics: ["Customer Retention", "Personalized Outreach", "Lead Nurturing"],
  },
  {
    id: 5,
    title: "Data-Driven Sales & Analytics",
    instructors: "Analytics Experts",
    rating: 4.9,
    reviews: 312,
    price: 69,
    originalPrice: 79,
    image: "https://images.unsplash.com/photo-1555421689-3f034debb7a6?w=400&h=250&fit=crop",
    badges: ["Data-Driven", "Proven Strategies"],
    category: "Sales Analytics",
    topics: ["CRM Metrics", "Data Visualization", "Predictive Analytics"],
  }
];

export const crmCourses = [
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzbcRd8Hv5VQrwTl6vg1Nka55REaEC8oVSEQ&s",
    title: "Advanced Lead Generation",
    description: "Master the art of attracting and converting leads effectively.",
    instructors: "John Doe, Sales Expert",
    rating: 4.9,
    ratingsCount: 450,
    totalHours: 40, // Course duration in hours
    lectures: 20, // Number of modules
    level: "Advanced",
    price: 199,
    originalPrice: 249,
    new: true,
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSirV-oWdtkPLExLtEf6AYiALdktDYesGTjnA&s",
    title: "CRM Automation Masterclass",
    description: "Automate your sales and customer management with top CRM tools.",
    instructors: "Jane Smith, CRM Consultant",
    rating: 4.8,
    ratingsCount: 390,
    totalHours: 35,
    lectures: 18,
    level: "Intermediate",
    price: 149,
    originalPrice: 199,
    new: false,
  },
  {
    image: "https://www.herbalife.com/dmassets/global-reusable-assets/images/lh-Exec-Michael-Johnson-global.jpg",
    title: "Customer Relationship Management Essentials",
    description: "Learn the fundamentals of building and maintaining strong customer relationships.",
    instructors: "Michael Johnson, Business Coach",
    rating: 4.7,
    ratingsCount: 350,
    totalHours: 45,
    lectures: 25,
    level: "Beginner",
    price: 129,
    originalPrice: 179,
    new: true,
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk-Gko4Yh6tqnASt-xtsgj4jzuZ2Adf26lAQ&s",
    title: "Sales Pipeline Optimization",
    description: "Improve your sales process and close more deals efficiently.",
    instructors: "Emily Davis, Sales Trainer",
    rating: 4.6,
    ratingsCount: 280,
    totalHours: 30,
    lectures: 15,
    level: "Intermediate",
    price: 99,
    originalPrice: 149,
    new: false,
  },
  {
    image: "https://media.licdn.com/dms/image/v2/D4E03AQHvhWo4JZGfdQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1723159964299?e=2147483647&v=beta&t=AnzQMIBH5ksVrzkb9RwDU6-om9jgsoOAX6U0arR92D4",
    title: "Customer Retention Strategies",
    description: "Boost customer loyalty with proven retention techniques.",
    instructors: "Sarah Lee, Marketing Strategist",
    rating: 4.8,
    ratingsCount: 200,
    totalHours: 38,
    lectures: 22,
    level: "Advanced",
    price: 179,
    originalPrice: 229,
    new: true,
  },
  {
    image: "https://media.licdn.com/dms/image/v2/D5603AQG7daFnd9iNDA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1723067143190?e=2147483647&v=beta&t=gmu7c0r1qNcPukC37gyAHwX3Dj26wCl6h6f9NftFOLE",
    title: "Data-Driven Sales & CRM Analytics",
    description: "Use analytics to optimize your CRM and sales performance.",
    instructors: "Robert Wilson, Data Analyst",
    rating: 4.9,
    ratingsCount: 400,
    totalHours: 50,
    lectures: 30,
    level: "Expert",
    price: 249,
    originalPrice: 299,
    new: true,
  },
  {
    image: "https://media.licdn.com/dms/image/v2/D4E03AQHumvzknfAHNg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1729674884027?e=2147483647&v=beta&t=vDQysqlSPLj0FMwAAbGrT9tAf7vFcdoLB6yvBLsl8lU",
    title: "Effective Follow-Up Techniques",
    description: "Learn how to follow up with leads and customers for maximum conversion.",
    instructors: "David Brown, Sales Coach",
    rating: 4.7,
    ratingsCount: 600,
    totalHours: 28,
    lectures: 12,
    level: "Beginner",
    price: 79,
    originalPrice: 129,
    new: false,
  },
];

export const crmDetails = {
  name: "Top Experts",
  location: "All Locations",
  properties: crmCourses,
};

export const testimonialsCRM = [
  {
    id: 1,
    text: "This course transformed the way I manage customer relationships. I can now track leads and automate follow-ups effortlessly!",
    author: "Lucas D.",
    course: "CRM Fundamentals & Customer Engagement",
  },
  {
    id: 2,
    text: "Learning how to optimize CRM workflows helped our sales team close more deals efficiently. Highly recommend this course!",
    author: "Olivia S.",
    course: "Sales Automation with CRM",
  },
  {
    id: 3,
    text: "I had no idea how powerful CRM systems could be until I took this course. Now, I leverage data-driven insights to boost customer retention.",
    author: "Ethan J.",
    course: "Data-Driven CRM Strategies",
  },
  {
    id: 4,
    text: "This course gave me a deep understanding of CRM tools and integrations. I’ve successfully streamlined our customer support process!",
    author: "Sophia K.",
    course: "CRM for Customer Support & Success",
  },
]


export const testimonialCRM = {
  testimonial: "Learn how companies are improving customer engagement..",
  testimonials: testimonialsCRM,
}
