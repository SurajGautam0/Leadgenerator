import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import type { Lead, LeadStats, LeadStatus, ScrapeJob, VerticalId } from "./leads-types";
import { LEAD_STATUSES, VERTICALS } from "./leads-types";
import { fallbackMarketBrief, generateProspects } from "./generate-leads";
import { runPublicScrape } from "./scrape";

type LeadRow = {
  id: number;
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  postal_code: string;
  location_label: string;
  property_type: string;
  service: string;
  trigger_reason: string;
  score: number;
  estimated_value: number;
  status: string;
  notes: string;
  source: string;
  website?: string;
  source_url?: string;
  created_at: string;
};

type JobRow = {
  id: number;
  location: string;
  verticals: string;
  radius_km: number;
  depth: string;
  status: string;
  found: number;
  crawled: number;
  log: string;
  created_at: string;
};

function mapLead(row: LeadRow): Lead {
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
    status: (LEAD_STATUSES as readonly string[]).includes(row.status)
      ? (row.status as LeadStatus)
      : "new",
    notes: row.notes,
    source: row.source,
    website: row.website ?? "",
    sourceUrl: row.source_url ?? "",
    createdAt: row.created_at,
  };
}

const generateInput = z.object({
  location: z.string().trim().min(2).max(80),
  count: z.number().int().min(4).max(18).optional(),
  service: z.string().trim().max(40).optional(),
});

const scrapeInput = z.object({
  location: z.string().trim().min(2).max(80),
  verticals: z.array(z.string()).min(1).max(8),
  radiusKm: z.number().int().min(1).max(15),
  depth: z.enum(["listings", "crawl"]),
  maxResults: z.number().int().min(4).max(16).optional(),
});

const idInput = z.object({
  id: z.number().int().positive(),
});

const statusInput = z.object({
  id: z.number().int().positive(),
  status: z.enum(["new", "contacted", "quoted", "booked", "lost"]),
});

const notesInput = z.object({
  id: z.number().int().positive(),
  notes: z.string().max(1200),
});

async function insertProspect(
  sql: Awaited<ReturnType<typeof getSql>>,
  userId: string,
  p: {
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
    notes: string;
    source: string;
    website?: string;
    sourceUrl?: string;
  },
) {
  const rows = await sql<LeadRow>`
    insert into leads (
      user_id, full_name, email, phone, address, city, region, postal_code,
      location_label, property_type, service, trigger_reason, score,
      estimated_value, status, notes, source, website, source_url
    ) values (
      ${userId}, ${p.fullName}, ${p.email}, ${p.phone}, ${p.address},
      ${p.city}, ${p.region}, ${p.postalCode}, ${p.locationLabel},
      ${p.propertyType}, ${p.service}, ${p.triggerReason}, ${p.score},
      ${p.estimatedValue}, ${"new"}, ${p.notes}, ${p.source},
      ${p.website ?? ""}, ${p.sourceUrl ?? ""}
    )
    returning *
  `;
  return rows[0] ? mapLead(rows[0]) : null;
}

async function marketBrief(location: string): Promise<string> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return fallbackMarketBrief(location);

  try {
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 160,
        messages: [
          {
            role: "system",
            content:
              "You write two calm, specific sentences for a commercial cleaning lead desk. No bullet points, no emoji, no fluff, no named real people.",
          },
          {
            role: "user",
            content: `Describe cleaning-service demand in ${location}: housing and commercial stock, likely jobs, what to prioritize. Two sentences.`,
          },
        ],
      }),
    });
    if (!res.ok) return fallbackMarketBrief(location);
    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = body.choices?.[0]?.message?.content?.trim();
    return text || fallbackMarketBrief(location);
  } catch {
    return fallbackMarketBrief(location);
  }
}

export const listLeads = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<LeadRow>`
      select * from leads
      where user_id = ${context.userId}
      order by created_at desc, id desc
    `;
    return rows.map(mapLead);
  });

export const getLeadStats = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{
      total: number;
      new_count: number;
      contacted_count: number;
      quoted_count: number;
      booked_count: number;
      lost_count: number;
      pipeline_value: number;
      booked_value: number;
      avg_score: number;
      scraped_count: number;
    }>`
      select
        count(*)::int as total,
        count(*) filter (where status = 'new')::int as new_count,
        count(*) filter (where status = 'contacted')::int as contacted_count,
        count(*) filter (where status = 'quoted')::int as quoted_count,
        count(*) filter (where status = 'booked')::int as booked_count,
        count(*) filter (where status = 'lost')::int as lost_count,
        coalesce(sum(estimated_value) filter (where status <> 'lost'), 0)::int as pipeline_value,
        coalesce(sum(estimated_value) filter (where status = 'booked'), 0)::int as booked_value,
        coalesce(round(avg(score)), 0)::int as avg_score,
        count(*) filter (where source = 'scraped')::int as scraped_count
      from leads
      where user_id = ${context.userId}
    `;
    const r = rows[0];
    const stats: LeadStats = {
      total: r?.total ?? 0,
      newCount: r?.new_count ?? 0,
      contactedCount: r?.contacted_count ?? 0,
      quotedCount: r?.quoted_count ?? 0,
      bookedCount: r?.booked_count ?? 0,
      lostCount: r?.lost_count ?? 0,
      pipelineValue: r?.pipeline_value ?? 0,
      bookedValue: r?.booked_value ?? 0,
      avgScore: r?.avg_score ?? 0,
      scrapedCount: r?.scraped_count ?? 0,
    };
    return stats;
  });

export const generateLeads = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => generateInput.parse(input))
  .handler(async ({ context, data }) => {
    const prospects = generateProspects(data.location, data.count ?? 10, data.service);
    const sql = await getSql();
    const inserted: Lead[] = [];
    for (const p of prospects) {
      const lead = await insertProspect(sql, context.userId, {
        ...p,
        source: "generated",
        website: "",
        sourceUrl: "",
      });
      if (lead) inserted.push(lead);
    }
    const brief = await marketBrief(data.location);
    return { leads: inserted, brief, location: data.location.trim() };
  });

export const scrapeLeads = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => scrapeInput.parse(input))
  .handler(async ({ context, data }) => {
    const allowed = new Set(VERTICALS.map((v) => v.id));
    const verticals = data.verticals.filter((v): v is VerticalId => allowed.has(v as VerticalId));
    const result = await runPublicScrape({
      location: data.location,
      verticals: verticals.length ? verticals : ["offices"],
      radiusKm: data.radiusKm,
      depth: data.depth,
      maxResults: data.maxResults ?? 12,
    });

    const sql = await getSql();
    const inserted: Lead[] = [];
    for (const p of result.prospects) {
      const lead = await insertProspect(sql, context.userId, p);
      if (lead) inserted.push(lead);
    }

    const logText = result.log.map((l) => `${l.t}  ${l.msg}`).join("\n");
    const jobs = await sql<JobRow>`
      insert into scrape_jobs (
        user_id, location, verticals, radius_km, depth, status, found, crawled, log
      ) values (
        ${context.userId},
        ${data.location.trim()},
        ${verticals.join(",")},
        ${data.radiusKm},
        ${data.depth},
        ${"done"},
        ${inserted.length},
        ${result.crawled},
        ${logText}
      )
      returning id, location, verticals, radius_km, depth, status, found, crawled, log, created_at
    `;

    return {
      leads: inserted,
      fallback: result.fallback,
      crawled: result.crawled,
      log: result.log,
      location: data.location.trim(),
      job: jobs[0]
        ? {
            id: jobs[0].id,
            location: jobs[0].location,
            verticals: jobs[0].verticals,
            radiusKm: jobs[0].radius_km,
            depth: jobs[0].depth,
            status: jobs[0].status,
            found: jobs[0].found,
            crawled: jobs[0].crawled,
            log: jobs[0].log,
            createdAt: jobs[0].created_at,
          }
        : null,
    };
  });

export const listScrapeJobs = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<JobRow>`
      select id, location, verticals, radius_km, depth, status, found, crawled, log, created_at
      from scrape_jobs
      where user_id = ${context.userId}
      order by created_at desc
      limit 12
    `;
    return rows.map(
      (r): ScrapeJob => ({
        id: r.id,
        location: r.location,
        verticals: r.verticals,
        radiusKm: r.radius_km,
        depth: r.depth,
        status: r.status,
        found: r.found,
        crawled: r.crawled,
        log: r.log,
        createdAt: r.created_at,
      }),
    );
  });

export const updateLeadStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => statusInput.parse(input))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<LeadRow>`
      update leads
      set status = ${data.status}
      where id = ${data.id} and user_id = ${context.userId}
      returning *
    `;
    return rows[0] ? mapLead(rows[0]) : null;
  });

export const updateLeadNotes = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => notesInput.parse(input))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<LeadRow>`
      update leads
      set notes = ${data.notes}
      where id = ${data.id} and user_id = ${context.userId}
      returning *
    `;
    return rows[0] ? mapLead(rows[0]) : null;
  });

export const deleteLead = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => idInput.parse(input))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      delete from leads
      where id = ${data.id} and user_id = ${context.userId}
    `;
    return { ok: true as const };
  });
