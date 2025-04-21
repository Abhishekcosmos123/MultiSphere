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

export const trustedMessage = "Trusted by over 16,000 companies and millions of learners around the world";

export const userRoles = ["Student", "Trainer"];

export const roleMappingByModule: Record<string, Record<string, string>> = {
  "E-learning": {
    Student: "consumer",
    Teacher: "producer",
  },
  "Real Estate": {
    Agents: "coordinator",
    Seller: "producer",
    Buyer: "consumer",
  },
  Restaurants: {
    "Delivery Partner": "coordinator",
    Seller: "producer",
    Buyer: "consumer",
  },
  "CRM Management": {
    Employer: "producer",
    Candidates: "consumer",
  },
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