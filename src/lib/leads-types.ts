export const LEAD_STATUSES = [
  "new",
  "contacted",
  "quoted",
  "booked",
  "lost",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const PROPERTY_TYPES = [
  "Estate",
  "Townhouse",
  "Brownstone",
  "Penthouse",
  "Single family",
  "Condo",
  "Loft",
  "Rental",
  "Office suite",
  "Boutique stay",
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const SERVICES = [
  "Weekly housekeep",
  "Deep clean",
  "Move-out",
  "Post-renovation",
  "Airbnb turnover",
  "Estate care",
  "Office close",
] as const;

export type ServiceType = (typeof SERVICES)[number];

export const VERTICALS = [
  { id: "offices", label: "Offices", service: "Office close" },
  { id: "hotels", label: "Hotels & stays", service: "Airbnb turnover" },
  { id: "medical", label: "Medical", service: "Deep clean" },
  { id: "gyms", label: "Gyms", service: "Weekly housekeep" },
  { id: "restaurants", label: "Restaurants", service: "Deep clean" },
  { id: "retail", label: "Retail", service: "Office close" },
  { id: "apartments", label: "Apartments", service: "Estate care" },
  { id: "schools", label: "Schools", service: "Deep clean" },
] as const;

export type VerticalId = (typeof VERTICALS)[number]["id"];

export type Lead = {
  id: number;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  locationLabel: string;
  propertyType: string;
  service: string;
  triggerReason: string;
  score: number;
  estimatedValue: number;
  status: LeadStatus;
  notes: string;
  source: string;
  website: string;
  sourceUrl: string;
  createdAt: string;
};

export type LeadStats = {
  total: number;
  newCount: number;
  contactedCount: number;
  quotedCount: number;
  bookedCount: number;
  lostCount: number;
  pipelineValue: number;
  bookedValue: number;
  avgScore: number;
  scrapedCount: number;
};

export type ScrapeJob = {
  id: number;
  location: string;
  verticals: string;
  radiusKm: number;
  depth: string;
  status: string;
  found: number;
  crawled: number;
  log: string;
  createdAt: string;
};

export const STATUS_LABEL: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  quoted: "Quoted",
  booked: "Booked",
  lost: "Lost",
};

export function scoreTone(score: number) {
  if (score >= 88) return "high";
  if (score >= 74) return "mid";
  return "low";
}
