import type { PropertyType, ServiceType } from "./leads-types";
import { PROPERTY_TYPES, SERVICES } from "./leads-types";

export type GeneratedProspect = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  locationLabel: string;
  propertyType: PropertyType;
  service: ServiceType;
  triggerReason: string;
  score: number;
  estimatedValue: number;
  notes: string;
};

type Territory = {
  keys: string[];
  city: string;
  region: string;
  zips: string[];
  area: string;
  neighborhoods: string[];
  streets: string[];
  housing: PropertyType[];
};

const FIRST = [
  "Avery",
  "Blair",
  "Camille",
  "Drew",
  "Elena",
  "Frances",
  "Gideon",
  "Harper",
  "Isabel",
  "Julian",
  "Keira",
  "Lena",
  "Marcus",
  "Noelle",
  "Owen",
  "Priya",
  "Quincy",
  "Ronan",
  "Sienna",
  "Theo",
  "Uma",
  "Victor",
  "Willa",
  "Yara",
  "Zane",
  "Amelia",
  "Bennett",
  "Clara",
  "Daphne",
  "Elliot",
  "Freya",
  "Graham",
  "Helen",
  "Iris",
  "Jonah",
  "Lila",
  "Mateo",
  "Nina",
  "Oscar",
  "Pearl",
];

const LAST = [
  "Alden",
  "Barrow",
  "Caldwell",
  "Davenport",
  "Ellis",
  "Frost",
  "Gresham",
  "Hollis",
  "Iverson",
  "June",
  "Kessler",
  "Lang",
  "Moreau",
  "North",
  "Okada",
  "Pell",
  "Quill",
  "Rhodes",
  "Saito",
  "Voss",
  "Whitaker",
  "York",
  "Ashford",
  "Bellamy",
  "Carr",
  "Dunne",
  "Everett",
  "Fallon",
  "Grant",
  "Hale",
  "Ingram",
  "Keller",
  "Lane",
  "Mori",
  "Nash",
  "Pereira",
];

const STREET_TYPES = ["St", "Ave", "Ln", "Pl", "Way", "Ter", "Ct"];

const TRIGGERS = [
  "Recent closing — keys just transferred",
  "High-turnover short stay in peak weeks",
  "Post-renovation dust-out needed",
  "Estate open before listing photos",
  "Weekly service lapsed with prior vendor",
  "New infant in the household",
  "Host calendar dense this month",
  "Move-in within two weeks",
  "Seasonal home reopening",
  "Office suite after hours occupancy",
  "Event weekend on the books",
  "Allergen-sensitive household",
];

const NOTE_FRAGMENTS = [
  "Prefers scent-free products and a consistent two-person crew.",
  "Access via lockbox; parking is street-permit after 6.",
  "Marble and unsealed oak — no steam on floors.",
  "Likely to convert on a standing Wednesday slot.",
  "Decision maker travels; text is more reliable than email.",
  "Building requires certificate of insurance on file.",
  "Pets on site — hypoallergenic protocol.",
  "Has asked neighbors who they use.",
];

const TERRITORIES: Territory[] = [
  {
    keys: ["new york", "nyc", "manhattan", "brooklyn", "10014", "10013", "11215", "11201"],
    city: "New York",
    region: "NY",
    zips: ["10014", "10013", "11215", "11201", "10011"],
    area: "212",
    neighborhoods: ["West Village", "Tribeca", "Park Slope", "Brooklyn Heights", "SoHo"],
    streets: ["Perry", "Charles", "Hicks", "Henry", "Greene", "Bank", "Willow", "Commerce"],
    housing: ["Brownstone", "Townhouse", "Loft", "Penthouse", "Condo"],
  },
  {
    keys: ["los angeles", "la", "90210", "90069", "90046", "beverly hills", "silver lake"],
    city: "Los Angeles",
    region: "CA",
    zips: ["90210", "90069", "90046", "90026", "90049"],
    area: "310",
    neighborhoods: ["Beverly Hills", "Los Feliz", "Silver Lake", "Brentwood", "West Hollywood"],
    streets: ["Doheny", "Sunset Plaza", "Hyperion", "Mandeville", "Hilldale", "Wetherly"],
    housing: ["Estate", "Single family", "Condo", "Boutique stay", "Rental"],
  },
  {
    keys: ["san francisco", "sf", "94110", "94115", "94123", "pacific heights", "mission"],
    city: "San Francisco",
    region: "CA",
    zips: ["94115", "94123", "94110", "94114", "94118"],
    area: "415",
    neighborhoods: ["Pacific Heights", "Marina", "Noe Valley", "Mission", "Inner Sunset"],
    streets: ["Vallejo", "Fillmore", "Sanchez", "Green", "Union", "Castro"],
    housing: ["Townhouse", "Condo", "Brownstone", "Single family", "Rental"],
  },
  {
    keys: ["austin", "78701", "78703", "78704", "tarrytown"],
    city: "Austin",
    region: "TX",
    zips: ["78703", "78704", "78701", "78731", "78746"],
    area: "512",
    neighborhoods: ["Tarrytown", "Clarksville", "Barton Hills", "Zilker", "Mueller"],
    streets: ["Enfield", "Windsor", "Lamar", "Jessie", "Bluebonnet", "Alta Vista"],
    housing: ["Single family", "Estate", "Condo", "Rental", "Boutique stay"],
  },
  {
    keys: ["miami", "33139", "33140", "miami beach", "coral gables"],
    city: "Miami",
    region: "FL",
    zips: ["33139", "33140", "33134", "33133", "33129"],
    area: "305",
    neighborhoods: ["South Beach", "Coral Gables", "Coconut Grove", "Brickell", "Sunset Islands"],
    streets: ["Ocean", "Meridian", "Galiano", "Main Hwy", "Brickell", "Hibiscus"],
    housing: ["Penthouse", "Condo", "Estate", "Boutique stay", "Rental"],
  },
  {
    keys: ["chicago", "60614", "60610", "lincoln park", "gold coast"],
    city: "Chicago",
    region: "IL",
    zips: ["60614", "60610", "60611", "60657", "60622"],
    area: "312",
    neighborhoods: ["Lincoln Park", "Gold Coast", "Wicker Park", "Lakeview", "Old Town"],
    streets: ["Armitage", "Sedgwick", "Orchard", "Howe", "Cleveland", "Wisconsin"],
    housing: ["Townhouse", "Brownstone", "Condo", "Penthouse", "Single family"],
  },
  {
    keys: ["boston", "02116", "02108", "back bay", "beacon hill"],
    city: "Boston",
    region: "MA",
    zips: ["02116", "02108", "02118", "02130", "02129"],
    area: "617",
    neighborhoods: ["Back Bay", "Beacon Hill", "South End", "Jamaica Plain", "Charlestown"],
    streets: ["Marlborough", "Pinckney", "Comm Ave", "West Newton", "Chestnut", "Revere"],
    housing: ["Brownstone", "Townhouse", "Condo", "Single family", "Penthouse"],
  },
  {
    keys: ["seattle", "98101", "98112", "98103", "capitol hill", "queen anne"],
    city: "Seattle",
    region: "WA",
    zips: ["98112", "98103", "98101", "98102", "98119"],
    area: "206",
    neighborhoods: ["Capitol Hill", "Queen Anne", "Madison Park", "Ballard", "Fremont"],
    streets: ["Boylston", "Highland", "McGraw", "Republican", "Aloha", "Galer"],
    housing: ["Single family", "Townhouse", "Condo", "Rental", "Loft"],
  },
  {
    keys: ["denver", "80202", "80206", "80218", "cherry creek", "highlands"],
    city: "Denver",
    region: "CO",
    zips: ["80206", "80218", "80202", "80211", "80220"],
    area: "303",
    neighborhoods: ["Cherry Creek", "Highlands", "Congress Park", "Wash Park", "LoDo"],
    streets: ["Steele", "Race", "Clayton", "Hooker", "Cook", "Madison"],
    housing: ["Single family", "Townhouse", "Condo", "Estate", "Rental"],
  },
  {
    keys: ["nashville", "37203", "37205", "37212", "green hills", "12 south"],
    city: "Nashville",
    region: "TN",
    zips: ["37205", "37212", "37203", "37215", "37204"],
    area: "615",
    neighborhoods: ["Green Hills", "12 South", "Belle Meade", "East Nashville", "The Gulch"],
    streets: ["Woodmont", "Belmont", "Acklen", "Hillsboro", "Granny White", "Craighead"],
    housing: ["Single family", "Estate", "Townhouse", "Rental", "Boutique stay"],
  },
  {
    keys: ["dallas", "75201", "75205", "75209", "highland park", "uptown"],
    city: "Dallas",
    region: "TX",
    zips: ["75205", "75209", "75201", "75225", "75214"],
    area: "214",
    neighborhoods: ["Highland Park", "Uptown", "Lakewood", "Preston Hollow", "Bishop Arts"],
    streets: ["Beverly", "Lakeside", "Mockingbird", "McKinney", "Abbott", "Gillon"],
    housing: ["Estate", "Single family", "Townhouse", "Condo", "Office suite"],
  },
  {
    keys: ["london", "sw3", "w8", "w1", "chelsea", "kensington", "notting hill"],
    city: "London",
    region: "UK",
    zips: ["SW3 5", "W8 4", "W11 2", "NW3 1", "SW1X"],
    area: "020",
    neighborhoods: ["Chelsea", "Kensington", "Notting Hill", "Hampstead", "Belgravia"],
    streets: ["Pavilion", "Phillimore", "Elgin", "Cadogan", "Pembroke", "Cheyne"],
    housing: ["Townhouse", "Estate", "Penthouse", "Condo", "Boutique stay"],
  },
  {
    keys: ["washington", "dc", "20001", "20008", "georgetown", "dupont"],
    city: "Washington",
    region: "DC",
    zips: ["20007", "20008", "20009", "20001", "20016"],
    area: "202",
    neighborhoods: ["Georgetown", "Kalorama", "Dupont", "Logan Circle", "Cleveland Park"],
    streets: ["P Street", "Q Street", "Dumbarton", "Calvert", "28th", "Wisconsin"],
    housing: ["Townhouse", "Brownstone", "Condo", "Estate", "Office suite"],
  },
];

const GENERIC_STREETS = [
  "Maple",
  "Cedar",
  "Highland",
  "Orchard",
  "Garden",
  "Prospect",
  "Laurel",
  "Summit",
  "Willow",
  "Grove",
];

function hashSeed(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rand: () => number, list: readonly T[]): T {
  return list[Math.floor(rand() * list.length)] as T;
}

function titleCaseLocation(raw: string) {
  return raw
    .trim()
    .split(/[\s,]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function matchesTerritory(query: string, territory: Territory) {
  const q = query.trim().toLowerCase();
  const tokens = q.split(/[\s,]+/).filter(Boolean);
  const keys = [
    ...territory.keys,
    territory.city.toLowerCase(),
    territory.region.toLowerCase(),
    ...territory.neighborhoods.map((n) => n.toLowerCase()),
    ...territory.zips.map((z) => z.toLowerCase()),
  ];
  return keys.some((raw) => {
    const k = raw.toLowerCase();
    if (k.length <= 3) return tokens.includes(k);
    return q.includes(k);
  });
}

function resolveTerritory(location: string): Territory {
  const found = TERRITORIES.find((t) => matchesTerritory(location, t));
  if (found) return found;

  const parts = location.split(",").map((p) => p.trim());
  const city = titleCaseLocation(parts[0] || location) || "Territory";
  const region = (parts[1] || "").toUpperCase().slice(0, 8) || "—";
  return {
    keys: [],
    city,
    region,
    zips: [parts.find((p) => /^\d{5}$/.test(p)) || "00000"],
    area: "555",
    neighborhoods: [city],
    streets: GENERIC_STREETS,
    housing: ["Single family", "Townhouse", "Condo", "Estate", "Rental"],
  };
}

function emailFor(first: string, last: string, city: string, rand: () => number) {
  const f = first.toLowerCase();
  const l = last.toLowerCase();
  const local = [
    `${f}.${l}`,
    `${f[0]}${l}`,
    `${f}${l[0]}`,
    `${f}.${l}home`,
  ][Math.floor(rand() * 4)];
  const slug = city.toLowerCase().replace(/[^a-z]/g, "").slice(0, 10) || "studio";
  const domains = ["icloud.com", "gmail.com", `${slug}mail.net`, "proton.me"];
  return `${local}@${pick(rand, domains)}`;
}

function phoneFor(area: string, rand: () => number) {
  const a = /^\d{3}$/.test(area) ? area : "555";
  const mid = String(200 + Math.floor(rand() * 700)).padStart(3, "0");
  const last = String(1000 + Math.floor(rand() * 8999));
  return `${a}${mid}${last}`;
}

function valueFor(property: PropertyType, service: ServiceType) {
  const base: Record<string, number> = {
    Estate: 640,
    Townhouse: 380,
    Brownstone: 420,
    Penthouse: 520,
    "Single family": 280,
    Condo: 210,
    Loft: 260,
    Rental: 190,
    "Office suite": 320,
    "Boutique stay": 240,
  };
  const serviceMult: Record<string, number> = {
    "Weekly housekeep": 4,
    "Deep clean": 1.6,
    "Move-out": 1.8,
    "Post-renovation": 2.2,
    "Airbnb turnover": 2.4,
    "Estate care": 3.2,
    "Office close": 1.4,
  };
  const b = base[property] ?? 260;
  const m = serviceMult[service] ?? 1.5;
  return Math.round((b * m) / 10) * 10;
}

export function generateProspects(
  location: string,
  count: number,
  serviceFocus?: string,
): GeneratedProspect[] {
  const territory = resolveTerritory(location);
  const seed = hashSeed(`${location}|${Date.now()}|${Math.random()}`);
  const rand = mulberry32(seed);
  const used = new Set<string>();
  const out: GeneratedProspect[] = [];
  const n = Math.min(18, Math.max(4, count));

  while (out.length < n) {
    const first = pick(rand, FIRST);
    const last = pick(rand, LAST);
    const key = `${first}-${last}`;
    if (used.has(key)) continue;
    used.add(key);

    const housing = territory.housing.filter((h): h is PropertyType =>
      (PROPERTY_TYPES as readonly string[]).includes(h),
    );
    const propertyType = pick(rand, housing.length > 0 ? housing : (["Single family"] as const));
    const service: ServiceType =
      serviceFocus && (SERVICES as readonly string[]).includes(serviceFocus)
        ? (serviceFocus as ServiceType)
        : pick(rand, SERVICES);
    const neighborhood = pick(rand, territory.neighborhoods);
    const street = pick(rand, territory.streets);
    const num = 20 + Math.floor(rand() * 280);
    const unit = rand() > 0.62 ? ` #${Math.floor(rand() * 12) + 1}` : "";
    const zip = pick(rand, territory.zips);
    const score = Math.min(
      98,
      62 + Math.floor(rand() * 28) + (propertyType === "Estate" || propertyType === "Penthouse" ? 6 : 0),
    );

    out.push({
      fullName: `${first} ${last}`,
      email: emailFor(first, last, territory.city, rand),
      phone: phoneFor(territory.area, rand),
      address: `${num} ${street} ${pick(rand, STREET_TYPES)}${unit}`,
      city: territory.city,
      region: territory.region,
      postalCode: zip,
      locationLabel: `${neighborhood}, ${territory.city}`,
      propertyType,
      service,
      triggerReason: pick(rand, TRIGGERS),
      score,
      estimatedValue: valueFor(propertyType, service),
      notes: pick(rand, NOTE_FRAGMENTS),
    });
  }

  return out.sort((a, b) => b.score - a.score);
}

export function fallbackMarketBrief(location: string) {
  const t = resolveTerritory(location);
  return `${t.city} is dense with ${t.housing.slice(0, 2).join(" and ").toLowerCase()} stock — the households most likely to pay for a quiet, standing clean rather than a one-off. Alba scores them by turnover, recent occupancy, and finish quality so your studio books the right streets first.`;
}
