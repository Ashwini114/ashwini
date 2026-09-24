export const profile = {
  name: "Ashwini Ravi Nair",
  firstName: "Ashwini",
  initials: "AN",
  role: "Technical Lead",
  email: "itsmeashwini1104@gmail.com",
  linkedin: "https://www.linkedin.com/in/ashwini-ravi-nair/",
  linkedinHandle: "ashwini-ravi-nair",
  instagram:
    "https://www.instagram.com/vini_wish?stkn=MTc1bXk4NWN0bGRlMA%3D%3D&utm_source=qr",
  instagramHandle: "vini_wish",
};

const currentYear = new Date().getFullYear();

export const intro = {
  greeting: "Ashwini Ravi Nair",
  about:
    `Technical Lead with over ${currentYear-2015} years of experience delivering cross-platform applications for web, mobile and Web TV. I lead Agile teams through collaborative leadership, approach complex problems with innovative thinking, and ensure that technical execution stays precisely aligned with stakeholder objectives.`,
  platforms: ["web platforms", "mobile apps", "smart TV devices"],
  facts: [
    { value: `${currentYear-2015}+ years`, label: "in software delivery" },
    { value: "3 platforms", label: "web, mobile and TV" },
    { value: "Agile", label: "team leadership" },
  ],
};

export type ProjectIcon = "tv" | "team" | "food";

export interface Project {
  id: string;
  name: string;
  kind: string;
  summary: string;
  highlights: string[];
  icon: ProjectIcon;
}

export const projects: Project[] = [
  {
    id: "stc-tv",
    name: "STC TV",
    kind: "OTT platform for TV",
    summary:
      "An OTT application for streaming live content, AVOD, TVOD and SVOD on TV. Users can choose a free or a paid plan and access content based on their current plan. A robust recommendation system personalises the experience using data collected through analytics.",
    highlights: ["Live streaming", "AVOD, TVOD and SVOD", "Free and paid plans", "Recommendation engine", "Analytics"],
    icon: "tv",
  },
  {
    id: "call-steward",
    name: "Call Steward",
    kind: "B2B web application",
    summary:
      "A B2B web application that allows employers to assign work to employees based on their skills and availability.",
    highlights: ["Skill-based assignment", "Availability tracking", "Workforce management"],
    icon: "team",
  },
  {
    id: "menupulse",
    name: "Menupulse",
    kind: "Hybrid mobile application",
    summary:
      "A hybrid mobile app that helps users find nearby restaurants, view their menus, post reviews and upload photos from their visit.",
    highlights: ["Location-based discovery", "Digital menus", "Reviews and photos"],
    icon: "food",
  },
];

export const aboutMe = {
  lede: "When I’m not deep in my work, you’ll rarely find me sitting still.",
  passions: [
    {
      emoji: "🌍",
      title: "The Explorer",
      text: "I travel to collect perspectives, get lost in unfamiliar streets, and remind myself how big and inspiring the world really is.",
    },
    {
      emoji: "📸",
      title: "The Observer",
      text: "Photography is my visual diary. Through the lens, I chase light, freeze fleeting moments, and find art in the ordinary.",
    },
    {
      emoji: "🎧",
      title: "The Audiophile",
      text: "Music is my therapy. Whether it’s finding focus, resetting after a long week, or soundtracking a midnight drive, there’s always a playlist running in the background.",
    },
  ],
  closing: "At the core, I’m curious, driven by stories, and constantly seeking moments that make you pause and feel something real.",
};
