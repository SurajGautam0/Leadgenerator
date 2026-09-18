import { r as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { Ft as string, Mt as object, jt as number, wt as _enum } from "../_libs/@better-auth/core+[...].mjs";
import { r as getSql } from "./db-B6mRtq6J.mjs";
import { a as authMiddleware, n as PROPERTY_TYPES, r as SERVICES, t as LEAD_STATUSES } from "./leads-types-DqcKIXLy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leads-api-BhVeAUa5.js
var FIRST = [
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
	"Pearl"
];
var LAST = [
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
	"Pereira"
];
var STREET_TYPES = [
	"St",
	"Ave",
	"Ln",
	"Pl",
	"Way",
	"Ter",
	"Ct"
];
var TRIGGERS = [
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
	"Allergen-sensitive household"
];
var NOTE_FRAGMENTS = [
	"Prefers scent-free products and a consistent two-person crew.",
	"Access via lockbox; parking is street-permit after 6.",
	"Marble and unsealed oak — no steam on floors.",
	"Likely to convert on a standing Wednesday slot.",
	"Decision maker travels; text is more reliable than email.",
	"Building requires certificate of insurance on file.",
	"Pets on site — hypoallergenic protocol.",
	"Has asked neighbors who they use."
];
var TERRITORIES = [
	{
		keys: [
			"new york",
			"nyc",
			"manhattan",
			"brooklyn",
			"10014",
			"10013",
			"11215",
			"11201"
		],
		city: "New York",
		region: "NY",
		zips: [
			"10014",
			"10013",
			"11215",
			"11201",
			"10011"
		],
		area: "212",
		neighborhoods: [
			"West Village",
			"Tribeca",
			"Park Slope",
			"Brooklyn Heights",
			"SoHo"
		],
		streets: [
			"Perry",
			"Charles",
			"Hicks",
			"Henry",
			"Greene",
			"Bank",
			"Willow",
			"Commerce"
		],
		housing: [
			"Brownstone",
			"Townhouse",
			"Loft",
			"Penthouse",
			"Condo"
		]
	},
	{
		keys: [
			"los angeles",
			"la",
			"90210",
			"90069",
			"90046",
			"beverly hills",
			"silver lake"
		],
		city: "Los Angeles",
		region: "CA",
		zips: [
			"90210",
			"90069",
			"90046",
			"90026",
			"90049"
		],
		area: "310",
		neighborhoods: [
			"Beverly Hills",
			"Los Feliz",
			"Silver Lake",
			"Brentwood",
			"West Hollywood"
		],
		streets: [
			"Doheny",
			"Sunset Plaza",
			"Hyperion",
			"Mandeville",
			"Hilldale",
			"Wetherly"
		],
		housing: [
			"Estate",
			"Single family",
			"Condo",
			"Boutique stay",
			"Rental"
		]
	},
	{
		keys: [
			"san francisco",
			"sf",
			"94110",
			"94115",
			"94123",
			"pacific heights",
			"mission"
		],
		city: "San Francisco",
		region: "CA",
		zips: [
			"94115",
			"94123",
			"94110",
			"94114",
			"94118"
		],
		area: "415",
		neighborhoods: [
			"Pacific Heights",
			"Marina",
			"Noe Valley",
			"Mission",
			"Inner Sunset"
		],
		streets: [
			"Vallejo",
			"Fillmore",
			"Sanchez",
			"Green",
			"Union",
			"Castro"
		],
		housing: [
			"Townhouse",
			"Condo",
			"Brownstone",
			"Single family",
			"Rental"
		]
	},
	{
		keys: [
			"austin",
			"78701",
			"78703",
			"78704",
			"tarrytown"
		],
		city: "Austin",
		region: "TX",
		zips: [
			"78703",
			"78704",
			"78701",
			"78731",
			"78746"
		],
		area: "512",
		neighborhoods: [
			"Tarrytown",
			"Clarksville",
			"Barton Hills",
			"Zilker",
			"Mueller"
		],
		streets: [
			"Enfield",
			"Windsor",
			"Lamar",
			"Jessie",
			"Bluebonnet",
			"Alta Vista"
		],
		housing: [
			"Single family",
			"Estate",
			"Condo",
			"Rental",
			"Boutique stay"
		]
	},
	{
		keys: [
			"miami",
			"33139",
			"33140",
			"miami beach",
			"coral gables"
		],
		city: "Miami",
		region: "FL",
		zips: [
			"33139",
			"33140",
			"33134",
			"33133",
			"33129"
		],
		area: "305",
		neighborhoods: [
			"South Beach",
			"Coral Gables",
			"Coconut Grove",
			"Brickell",
			"Sunset Islands"
		],
		streets: [
			"Ocean",
			"Meridian",
			"Galiano",
			"Main Hwy",
			"Brickell",
			"Hibiscus"
		],
		housing: [
			"Penthouse",
			"Condo",
			"Estate",
			"Boutique stay",
			"Rental"
		]
	},
	{
		keys: [
			"chicago",
			"60614",
			"60610",
			"lincoln park",
			"gold coast"
		],
		city: "Chicago",
		region: "IL",
		zips: [
			"60614",
			"60610",
			"60611",
			"60657",
			"60622"
		],
		area: "312",
		neighborhoods: [
			"Lincoln Park",
			"Gold Coast",
			"Wicker Park",
			"Lakeview",
			"Old Town"
		],
		streets: [
			"Armitage",
			"Sedgwick",
			"Orchard",
			"Howe",
			"Cleveland",
			"Wisconsin"
		],
		housing: [
			"Townhouse",
			"Brownstone",
			"Condo",
			"Penthouse",
			"Single family"
		]
	},
	{
		keys: [
			"boston",
			"02116",
			"02108",
			"back bay",
			"beacon hill"
		],
		city: "Boston",
		region: "MA",
		zips: [
			"02116",
			"02108",
			"02118",
			"02130",
			"02129"
		],
		area: "617",
		neighborhoods: [
			"Back Bay",
			"Beacon Hill",
			"South End",
			"Jamaica Plain",
			"Charlestown"
		],
		streets: [
			"Marlborough",
			"Pinckney",
			"Comm Ave",
			"West Newton",
			"Chestnut",
			"Revere"
		],
		housing: [
			"Brownstone",
			"Townhouse",
			"Condo",
			"Single family",
			"Penthouse"
		]
	},
	{
		keys: [
			"seattle",
			"98101",
			"98112",
			"98103",
			"capitol hill",
			"queen anne"
		],
		city: "Seattle",
		region: "WA",
		zips: [
			"98112",
			"98103",
			"98101",
			"98102",
			"98119"
		],
		area: "206",
		neighborhoods: [
			"Capitol Hill",
			"Queen Anne",
			"Madison Park",
			"Ballard",
			"Fremont"
		],
		streets: [
			"Boylston",
			"Highland",
			"McGraw",
			"Republican",
			"Aloha",
			"Galer"
		],
		housing: [
			"Single family",
			"Townhouse",
			"Condo",
			"Rental",
			"Loft"
		]
	},
	{
		keys: [
			"denver",
			"80202",
			"80206",
			"80218",
			"cherry creek",
			"highlands"
		],
		city: "Denver",
		region: "CO",
		zips: [
			"80206",
			"80218",
			"80202",
			"80211",
			"80220"
		],
		area: "303",
		neighborhoods: [
			"Cherry Creek",
			"Highlands",
			"Congress Park",
			"Wash Park",
			"LoDo"
		],
		streets: [
			"Steele",
			"Race",
			"Clayton",
			"Hooker",
			"Cook",
			"Madison"
		],
		housing: [
			"Single family",
			"Townhouse",
			"Condo",
			"Estate",
			"Rental"
		]
	},
	{
		keys: [
			"nashville",
			"37203",
			"37205",
			"37212",
			"green hills",
			"12 south"
		],
		city: "Nashville",
		region: "TN",
		zips: [
			"37205",
			"37212",
			"37203",
			"37215",
			"37204"
		],
		area: "615",
		neighborhoods: [
			"Green Hills",
			"12 South",
			"Belle Meade",
			"East Nashville",
			"The Gulch"
		],
		streets: [
			"Woodmont",
			"Belmont",
			"Acklen",
			"Hillsboro",
			"Granny White",
			"Craighead"
		],
		housing: [
			"Single family",
			"Estate",
			"Townhouse",
			"Rental",
			"Boutique stay"
		]
	},
	{
		keys: [
			"dallas",
			"75201",
			"75205",
			"75209",
			"highland park",
			"uptown"
		],
		city: "Dallas",
		region: "TX",
		zips: [
			"75205",
			"75209",
			"75201",
			"75225",
			"75214"
		],
		area: "214",
		neighborhoods: [
			"Highland Park",
			"Uptown",
			"Lakewood",
			"Preston Hollow",
			"Bishop Arts"
		],
		streets: [
			"Beverly",
			"Lakeside",
			"Mockingbird",
			"McKinney",
			"Abbott",
			"Gillon"
		],
		housing: [
			"Estate",
			"Single family",
			"Townhouse",
			"Condo",
			"Office suite"
		]
	},
	{
		keys: [
			"london",
			"sw3",
			"w8",
			"w1",
			"chelsea",
			"kensington",
			"notting hill"
		],
		city: "London",
		region: "UK",
		zips: [
			"SW3 5",
			"W8 4",
			"W11 2",
			"NW3 1",
			"SW1X"
		],
		area: "020",
		neighborhoods: [
			"Chelsea",
			"Kensington",
			"Notting Hill",
			"Hampstead",
			"Belgravia"
		],
		streets: [
			"Pavilion",
			"Phillimore",
			"Elgin",
			"Cadogan",
			"Pembroke",
			"Cheyne"
		],
		housing: [
			"Townhouse",
			"Estate",
			"Penthouse",
			"Condo",
			"Boutique stay"
		]
	},
	{
		keys: [
			"washington",
			"dc",
			"20001",
			"20008",
			"georgetown",
			"dupont"
		],
		city: "Washington",
		region: "DC",
		zips: [
			"20007",
			"20008",
			"20009",
			"20001",
			"20016"
		],
		area: "202",
		neighborhoods: [
			"Georgetown",
			"Kalorama",
			"Dupont",
			"Logan Circle",
			"Cleveland Park"
		],
		streets: [
			"P Street",
			"Q Street",
			"Dumbarton",
			"Calvert",
			"28th",
			"Wisconsin"
		],
		housing: [
			"Townhouse",
			"Brownstone",
			"Condo",
			"Estate",
			"Office suite"
		]
	}
];
var GENERIC_STREETS = [
	"Maple",
	"Cedar",
	"Highland",
	"Orchard",
	"Garden",
	"Prospect",
	"Laurel",
	"Summit",
	"Willow",
	"Grove"
];
function hashSeed(input) {
	let h = 2166136261;
	for (let i = 0; i < input.length; i += 1) {
		h ^= input.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
function mulberry32(seed) {
	let a = seed >>> 0;
	return () => {
		a += 1831565813;
		let t = a;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function pick(rand, list) {
	return list[Math.floor(rand() * list.length)];
}
function titleCaseLocation(raw) {
	return raw.trim().split(/[\s,]+/).filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(" ");
}
function matchesTerritory(query, territory) {
	const q = query.trim().toLowerCase();
	const tokens = q.split(/[\s,]+/).filter(Boolean);
	return [
		...territory.keys,
		territory.city.toLowerCase(),
		territory.region.toLowerCase(),
		...territory.neighborhoods.map((n) => n.toLowerCase()),
		...territory.zips.map((z) => z.toLowerCase())
	].some((raw) => {
		const k = raw.toLowerCase();
		if (k.length <= 3) return tokens.includes(k);
		return q.includes(k);
	});
}
function resolveTerritory(location) {
	const found = TERRITORIES.find((t) => matchesTerritory(location, t));
	if (found) return found;
	const parts = location.split(",").map((p) => p.trim());
	const city = titleCaseLocation(parts[0] || location) || "Territory";
	return {
		keys: [],
		city,
		region: (parts[1] || "").toUpperCase().slice(0, 8) || "—",
		zips: [parts.find((p) => /^\d{5}$/.test(p)) || "00000"],
		area: "555",
		neighborhoods: [city],
		streets: GENERIC_STREETS,
		housing: [
			"Single family",
			"Townhouse",
			"Condo",
			"Estate",
			"Rental"
		]
	};
}
function emailFor(first, last, city, rand) {
	const f = first.toLowerCase();
	const l = last.toLowerCase();
	return `${[
		`${f}.${l}`,
		`${f[0]}${l}`,
		`${f}${l[0]}`,
		`${f}.${l}home`
	][Math.floor(rand() * 4)]}@${pick(rand, [
		"icloud.com",
		"gmail.com",
		`${city.toLowerCase().replace(/[^a-z]/g, "").slice(0, 10) || "studio"}mail.net`,
		"proton.me"
	])}`;
}
function phoneFor(area, rand) {
	return `${/^\d{3}$/.test(area) ? area : "555"}${String(200 + Math.floor(rand() * 700)).padStart(3, "0")}${String(1e3 + Math.floor(rand() * 8999))}`;
}
function valueFor(property, service) {
	const base = {
		Estate: 640,
		Townhouse: 380,
		Brownstone: 420,
		Penthouse: 520,
		"Single family": 280,
		Condo: 210,
		Loft: 260,
		Rental: 190,
		"Office suite": 320,
		"Boutique stay": 240
	};
	const serviceMult = {
		"Weekly housekeep": 4,
		"Deep clean": 1.6,
		"Move-out": 1.8,
		"Post-renovation": 2.2,
		"Airbnb turnover": 2.4,
		"Estate care": 3.2,
		"Office close": 1.4
	};
	const b = base[property] ?? 260;
	const m = serviceMult[service] ?? 1.5;
	return Math.round(b * m / 10) * 10;
}
function generateProspects(location, count, serviceFocus) {
	const territory = resolveTerritory(location);
	const rand = mulberry32(hashSeed(`${location}|${Date.now()}|${Math.random()}`));
	const used = /* @__PURE__ */ new Set();
	const out = [];
	const n = Math.min(18, Math.max(4, count));
	while (out.length < n) {
		const first = pick(rand, FIRST);
		const last = pick(rand, LAST);
		const key = `${first}-${last}`;
		if (used.has(key)) continue;
		used.add(key);
		const housing = territory.housing.filter((h) => PROPERTY_TYPES.includes(h));
		const propertyType = pick(rand, housing.length > 0 ? housing : ["Single family"]);
		const service = serviceFocus && SERVICES.includes(serviceFocus) ? serviceFocus : pick(rand, SERVICES);
		const neighborhood = pick(rand, territory.neighborhoods);
		const street = pick(rand, territory.streets);
		const num = 20 + Math.floor(rand() * 280);
		const unit = rand() > .62 ? ` #${Math.floor(rand() * 12) + 1}` : "";
		const zip = pick(rand, territory.zips);
		const score = Math.min(98, 62 + Math.floor(rand() * 28) + (propertyType === "Estate" || propertyType === "Penthouse" ? 6 : 0));
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
			notes: pick(rand, NOTE_FRAGMENTS)
		});
	}
	return out.sort((a, b) => b.score - a.score);
}
function fallbackMarketBrief(location) {
	const t = resolveTerritory(location);
	return `${t.city} is dense with ${t.housing.slice(0, 2).join(" and ").toLowerCase()} stock — the households most likely to pay for a quiet, standing clean rather than a one-off. Alba scores them by turnover, recent occupancy, and finish quality so your studio books the right streets first.`;
}
function mapLead(row) {
	return {
		id: row.id,
		userId: row.user_id,
		fullName: row.full_name,
		email: row.email,
		phone: row.phone,
		address: row.address,
		city: row.city,
		region: row.region,
		postalCode: row.postal_code,
		locationLabel: row.location_label,
		propertyType: row.property_type,
		service: row.service,
		triggerReason: row.trigger_reason,
		score: row.score,
		estimatedValue: row.estimated_value,
		status: LEAD_STATUSES.includes(row.status) ? row.status : "new",
		notes: row.notes,
		source: row.source,
		createdAt: row.created_at
	};
}
var generateInput = object({
	location: string().trim().min(2).max(80),
	count: number().int().min(4).max(18).optional(),
	service: string().trim().max(40).optional()
});
var idInput = object({ id: number().int().positive() });
var statusInput = object({
	id: number().int().positive(),
	status: _enum([
		"new",
		"contacted",
		"quoted",
		"booked",
		"lost"
	])
});
var notesInput = object({
	id: number().int().positive(),
	notes: string().max(1200)
});
async function marketBrief(location) {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return fallbackMarketBrief(location);
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				max_tokens: 160,
				messages: [{
					role: "system",
					content: "You write two calm, specific sentences for a luxury residential cleaning studio. No bullet points, no emoji, no marketing fluff, no claims about named real people."
				}, {
					role: "user",
					content: `Describe cleaning-service demand in ${location}: housing stock, likely jobs (weekly, turnover, post-reno), and what a studio should prioritize. Two sentences.`
				}]
			})
		});
		if (!res.ok) return fallbackMarketBrief(location);
		return (await res.json()).choices?.[0]?.message?.content?.trim() || fallbackMarketBrief(location);
	} catch {
		return fallbackMarketBrief(location);
	}
}
var listLeads_createServerFn_handler = createServerRpc({
	id: "7472da2017180e359549e0d89908cd87878b3ebe96d852e8ea906b7cf6b4fbc3",
	name: "listLeads",
	filename: "src/lib/leads-api.ts"
}, (opts) => listLeads.__executeServer(opts));
var listLeads = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listLeads_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`
      select * from leads
      where user_id = ${context.userId}
      order by created_at desc, id desc
    `).map(mapLead);
});
var getLeadStats_createServerFn_handler = createServerRpc({
	id: "fcd95e40e79886aca060c9e7369963bc62dcf2fbaf2b99bea8ac291430cdd94b",
	name: "getLeadStats",
	filename: "src/lib/leads-api.ts"
}, (opts) => getLeadStats.__executeServer(opts));
var getLeadStats = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getLeadStats_createServerFn_handler, async ({ context }) => {
	const r = (await (await getSql())`
      select
        count(*)::int as total,
        count(*) filter (where status = 'new')::int as new_count,
        count(*) filter (where status = 'contacted')::int as contacted_count,
        count(*) filter (where status = 'quoted')::int as quoted_count,
        count(*) filter (where status = 'booked')::int as booked_count,
        count(*) filter (where status = 'lost')::int as lost_count,
        coalesce(sum(estimated_value) filter (where status <> 'lost'), 0)::int as pipeline_value,
        coalesce(sum(estimated_value) filter (where status = 'booked'), 0)::int as booked_value,
        coalesce(round(avg(score)), 0)::int as avg_score
      from leads
      where user_id = ${context.userId}
    `)[0];
	return {
		total: r?.total ?? 0,
		newCount: r?.new_count ?? 0,
		contactedCount: r?.contacted_count ?? 0,
		quotedCount: r?.quoted_count ?? 0,
		bookedCount: r?.booked_count ?? 0,
		lostCount: r?.lost_count ?? 0,
		pipelineValue: r?.pipeline_value ?? 0,
		bookedValue: r?.booked_value ?? 0,
		avgScore: r?.avg_score ?? 0
	};
});
var generateLeads_createServerFn_handler = createServerRpc({
	id: "880eac11209e176b6bbc0190ebadb67e3067caebf96c68ac8ca5eedd7aabdc98",
	name: "generateLeads",
	filename: "src/lib/leads-api.ts"
}, (opts) => generateLeads.__executeServer(opts));
var generateLeads = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => generateInput.parse(input)).handler(generateLeads_createServerFn_handler, async ({ context, data }) => {
	const prospects = generateProspects(data.location, data.count ?? 10, data.service);
	const sql = await getSql();
	const inserted = [];
	for (const p of prospects) {
		const rows = await sql`
        insert into leads (
          user_id, full_name, email, phone, address, city, region, postal_code,
          location_label, property_type, service, trigger_reason, score,
          estimated_value, status, notes, source
        ) values (
          ${context.userId}, ${p.fullName}, ${p.email}, ${p.phone}, ${p.address},
          ${p.city}, ${p.region}, ${p.postalCode}, ${p.locationLabel},
          ${p.propertyType}, ${p.service}, ${p.triggerReason}, ${p.score},
          ${p.estimatedValue}, ${"new"}, ${p.notes}, ${"generated"}
        )
        returning *
      `;
		if (rows[0]) inserted.push(mapLead(rows[0]));
	}
	return {
		leads: inserted,
		brief: await marketBrief(data.location),
		location: data.location.trim()
	};
});
var updateLeadStatus_createServerFn_handler = createServerRpc({
	id: "6ea6a21d569ea087f8b58ba18eb09710850a06aba2302801bf0fe8131a422d35",
	name: "updateLeadStatus",
	filename: "src/lib/leads-api.ts"
}, (opts) => updateLeadStatus.__executeServer(opts));
var updateLeadStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => statusInput.parse(input)).handler(updateLeadStatus_createServerFn_handler, async ({ context, data }) => {
	const rows = await (await getSql())`
      update leads
      set status = ${data.status}
      where id = ${data.id} and user_id = ${context.userId}
      returning *
    `;
	return rows[0] ? mapLead(rows[0]) : null;
});
var updateLeadNotes_createServerFn_handler = createServerRpc({
	id: "5c0dd4af84c4c3c6d27c40ae776365c1a3b1e55d532bb3e7e01680298e8ab97c",
	name: "updateLeadNotes",
	filename: "src/lib/leads-api.ts"
}, (opts) => updateLeadNotes.__executeServer(opts));
var updateLeadNotes = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => notesInput.parse(input)).handler(updateLeadNotes_createServerFn_handler, async ({ context, data }) => {
	const rows = await (await getSql())`
      update leads
      set notes = ${data.notes}
      where id = ${data.id} and user_id = ${context.userId}
      returning *
    `;
	return rows[0] ? mapLead(rows[0]) : null;
});
var deleteLead_createServerFn_handler = createServerRpc({
	id: "2f9873c3727848031a85b9c07f6277305c8b8d472e2b96a24ca9ba4f290dd2c4",
	name: "deleteLead",
	filename: "src/lib/leads-api.ts"
}, (opts) => deleteLead.__executeServer(opts));
var deleteLead = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => idInput.parse(input)).handler(deleteLead_createServerFn_handler, async ({ context, data }) => {
	await (await getSql())`
      delete from leads
      where id = ${data.id} and user_id = ${context.userId}
    `;
	return { ok: true };
});
//#endregion
export { deleteLead_createServerFn_handler, generateLeads_createServerFn_handler, getLeadStats_createServerFn_handler, listLeads_createServerFn_handler, updateLeadNotes_createServerFn_handler, updateLeadStatus_createServerFn_handler };
