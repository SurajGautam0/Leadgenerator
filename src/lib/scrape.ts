import { VERTICALS, type ServiceType, type VerticalId } from "./leads-types";
import { generateProspects, type GeneratedProspect } from "./generate-leads";

const UA =
  "WavesolutionLead/1.0 (public listing research; +https://wavesolution.lead)";

export type ScrapeDepth = "listings" | "crawl";

export type ScrapedProspect = GeneratedProspect & {
  website: string;
  sourceUrl: string;
  source: "scraped" | "modeled";
};

export type ScrapeLogLine = { t: string; msg: string };

const VERTICAL_OVERPASS: Record<VerticalId, string[]> = {
  offices: ['node["office"]', 'way["office"]'],
  hotels: [
    'node["tourism"="hotel"]',
    'node["tourism"="guest_house"]',
    'node["tourism"="apartment"]',
  ],
  medical: [
    'node["amenity"="clinic"]',
    'node["amenity"="doctors"]',
    'node["amenity"="hospital"]',
  ],
  gyms: ['node["leisure"="fitness_centre"]', 'node["leisure"="sports_centre"]'],
  restaurants: ['node["amenity"="restaurant"]', 'node["amenity"="cafe"]'],
  retail: ['node["shop"]'],
  apartments: ['way["building"="apartments"]', 'node["building"="apartments"]'],
  schools: ['node["amenity"="school"]', 'node["amenity"="university"]'],
};

type OsmElement = {
  type: string;
  id: number;
  lat?: number;
  lon?: number;
  tags?: Record<string, string>;
};

function nowStamp() {
  return new Date().toISOString().slice(11, 19);
}

function line(msg: string): ScrapeLogLine {
  return { t: nowStamp(), msg };
}

function normalizeWebsite(raw: string | undefined) {
  if (!raw) return "";
  let url = raw.trim();
  if (!url) return "";
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
  try {
    const u = new URL(url);
    if (u.protocol !== "http:" && u.protocol !== "https:") return "";
    if (u.hostname === "localhost" || u.hostname.endsWith(".local")) return "";
    return u.toString();
  } catch {
    return "";
  }
}

function extractEmails(html: string) {
  const found = html.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) ?? [];
  const skip = /noreply|no-reply|privacy|sentry|wixpress|example\.com|placeholder|png$|jpg$|webp$/i;
  const unique: string[] = [];
  for (const email of found) {
    const e = email.toLowerCase();
    if (skip.test(e)) continue;
    if (!unique.includes(e)) unique.push(e);
    if (unique.length >= 3) break;
  }
  return unique;
}

function extractPhones(html: string, fallback = "") {
  const tel = html.match(/href=["']tel:([^"']+)["']/i);
  if (tel?.[1]) return tel[1].replace(/[^\d+]/g, "");
  const loose = html.match(/\+?\d[\d\s().-]{8,}\d/);
  if (loose) return loose[0].replace(/[^\d+]/g, "");
  return fallback.replace(/[^\d+]/g, "");
}

async function fetchText(url: string, timeoutMs: number) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "text/html,application/json" },
      signal: ctrl.signal,
      redirect: "follow",
    });
    if (!res.ok) return "";
    const buf = await res.arrayBuffer();
    if (buf.byteLength > 400_000) return "";
    return new TextDecoder("utf-8", { fatal: false }).decode(buf);
  } catch {
    return "";
  } finally {
    clearTimeout(timer);
  }
}

async function geocode(location: string) {
  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(location)}`;
  const text = await fetchText(url, 8000);
  if (!text) return null;
  try {
    const json = JSON.parse(text) as { lat: string; lon: string; display_name?: string }[];
    const hit = json[0];
    if (!hit) return null;
    return {
      lat: Number(hit.lat),
      lon: Number(hit.lon),
      label: hit.display_name ?? location,
    };
  } catch {
    return null;
  }
}

function overpassQuery(lat: number, lon: number, radiusM: number, verticals: VerticalId[]) {
  const clauses = verticals.flatMap((id) =>
    (VERTICAL_OVERPASS[id] ?? []).map(
      (sel) => `${sel}(around:${radiusM},${lat},${lon});`,
    ),
  );
  return `[out:json][timeout:20];(${clauses.join("")});out tags 24;`;
}

function verticalForTags(tags: Record<string, string>, chosen: VerticalId[]): VerticalId {
  if (tags.office) return chosen.includes("offices") ? "offices" : "offices";
  if (tags.tourism) return "hotels";
  if (tags.amenity === "clinic" || tags.amenity === "hospital" || tags.amenity === "doctors")
    return "medical";
  if (tags.leisure) return "gyms";
  if (tags.amenity === "restaurant" || tags.amenity === "cafe") return "restaurants";
  if (tags.shop) return "retail";
  if (tags.building === "apartments") return "apartments";
  if (tags.amenity === "school" || tags.amenity === "university") return "schools";
  return chosen[0] ?? "offices";
}

function serviceFor(vertical: VerticalId): ServiceType {
  return (VERTICALS.find((v) => v.id === vertical)?.service ?? "Deep clean") as ServiceType;
}

function propertyFor(vertical: VerticalId) {
  if (vertical === "offices" || vertical === "medical" || vertical === "schools") return "Office suite";
  if (vertical === "hotels") return "Boutique stay";
  if (vertical === "apartments") return "Rental";
  if (vertical === "retail" || vertical === "gyms" || vertical === "restaurants") return "Loft";
  return "Office suite";
}

function valueFor(vertical: VerticalId) {
  const map: Record<string, number> = {
    offices: 420,
    hotels: 680,
    medical: 540,
    gyms: 360,
    restaurants: 390,
    retail: 310,
    apartments: 740,
    schools: 480,
  };
  return map[vertical] ?? 360;
}

async function crawlSite(website: string) {
  const html = await fetchText(website, 7000);
  if (!html) return { email: "", phone: "", crawled: false };
  return {
    email: extractEmails(html)[0] ?? "",
    phone: extractPhones(html),
    crawled: true,
  };
}

export async function runPublicScrape(input: {
  location: string;
  verticals: VerticalId[];
  radiusKm: number;
  depth: ScrapeDepth;
  maxResults: number;
}): Promise<{ prospects: ScrapedProspect[]; log: ScrapeLogLine[]; crawled: number; fallback: boolean }> {
  const log: ScrapeLogLine[] = [];
  const verticals = input.verticals.length ? input.verticals : (["offices"] as VerticalId[]);
  log.push(line(`Geocoding “${input.location}”`));

  const geo = await geocode(input.location);
  if (!geo) {
    log.push(line("Directory geocode unavailable — switching to modeled territory."));
    const modeled = generateProspects(input.location, input.maxResults).map((p) => ({
      ...p,
      website: "",
      sourceUrl: "",
      source: "modeled" as const,
    }));
    return { prospects: modeled, log, crawled: 0, fallback: true };
  }

  log.push(line(`Pinned ${geo.lat.toFixed(4)}, ${geo.lon.toFixed(4)}`));
  const radiusM = Math.min(15000, Math.max(800, input.radiusKm * 1000));
  const ql = overpassQuery(geo.lat, geo.lon, radiusM, verticals);
  log.push(line(`Querying public map listings · ${verticals.join(", ")} · ${input.radiusKm} km`));

  let elements: OsmElement[] = [];
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 18000);
    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: {
        "User-Agent": UA,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: `data=${encodeURIComponent(ql)}`,
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    if (res.ok) {
      const json = (await res.json()) as { elements?: OsmElement[] };
      elements = json.elements ?? [];
    }
  } catch {
    elements = [];
  }

  const named = elements.filter((el) => el.tags?.name);
  log.push(line(`Map returned ${named.length} named listings`));

  if (named.length === 0) {
    log.push(line("No public listings in range — modeled fill applied."));
    const modeled = generateProspects(input.location, input.maxResults).map((p) => ({
      ...p,
      website: "",
      sourceUrl: "",
      source: "modeled" as const,
    }));
    return { prospects: modeled, log, crawled: 0, fallback: true };
  }

  const max = Math.min(input.maxResults, 16);
  const slice = named.slice(0, max);
  const prospects: ScrapedProspect[] = [];
  let crawled = 0;
  const crawlBudget = input.depth === "crawl" ? 6 : 0;

  for (const el of slice) {
    const tags = el.tags ?? {};
    const vertical = verticalForTags(tags, verticals);
    const website = normalizeWebsite(tags.website || tags["contact:website"]);
    const osmPhone = (tags.phone || tags["contact:phone"] || "").replace(/[^\d+]/g, "");
    let email = (tags.email || tags["contact:email"] || "").trim().toLowerCase();
    let phone = osmPhone;
    let notes = `Public listing · ${vertical}`;

    if (website && crawled < crawlBudget) {
      log.push(line(`Crawling ${new URL(website).hostname}`));
      const site = await crawlSite(website);
      if (site.crawled) {
        crawled += 1;
        if (site.email && !email) email = site.email;
        if (site.phone && !phone) phone = site.phone;
        notes = site.email
          ? `Email extracted from ${new URL(website).hostname}`
          : `Site crawled — no public mailbox on the homepage.`;
      }
    }

    const house = tags["addr:housenumber"] ?? "";
    const street = tags["addr:street"] ?? "";
    const address = [house, street].filter(Boolean).join(" ") || tags["addr:full"] || "Address unpublished";
    const city = tags["addr:city"] ?? input.location.split(",")[0]?.trim() ?? "";
    const region = tags["addr:state"] ?? tags["addr:province"] ?? "";
    const postal = tags["addr:postcode"] ?? "";
    let score = 58;
    if (email) score += 16;
    if (phone) score += 10;
    if (website) score += 8;
    if (address !== "Address unpublished") score += 4;
    score = Math.min(97, score);

    const osmUrl = `https://www.openstreetmap.org/${el.type}/${el.id}`;
    prospects.push({
      fullName: tags.name ?? "Unnamed listing",
      email,
      phone,
      address,
      city,
      region,
      postalCode: postal,
      locationLabel: city ? `${city}${region ? `, ${region}` : ""}` : input.location,
      propertyType: propertyFor(vertical),
      service: serviceFor(vertical),
      triggerReason: website
        ? "Public listing with a live website"
        : "Public map listing in the selected radius",
      score,
      estimatedValue: valueFor(vertical),
      notes,
      website,
      sourceUrl: osmUrl,
      source: "scraped",
    });
  }

  log.push(line(`Captured ${prospects.length} leads · ${crawled} sites crawled`));
  return { prospects, log, crawled, fallback: false };
}
