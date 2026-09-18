"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Download,
  Globe,
  LayoutGrid,
  MapPin,
  Phone,
  Radar,
  Search,
  Table2,
  Trash2,
  X,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  deleteLead,
  generateLeads,
  getLeadStats,
  listLeads,
  listScrapeJobs,
  scrapeLeads,
  updateLeadNotes,
  updateLeadStatus,
} from "@/lib/leads-api";
import {
  LEAD_STATUSES,
  STATUS_LABEL,
  VERTICALS,
  scoreTone,
  type Lead,
  type LeadStatus,
  type VerticalId,
} from "@/lib/leads-types";
import { cn, formatCurrency, formatPhone } from "@/lib/utils";
import { Wordmark } from "@/components/wordmark";

const PIPELINE: LeadStatus[] = ["new", "contacted", "quoted", "booked"];

function isUnauthorized(err: unknown) {
  return err instanceof Error && err.message === "Unauthorized";
}

function exportCsv(leads: Lead[]) {
  const header = [
    "Name",
    "Email",
    "Phone",
    "Website",
    "Address",
    "City",
    "Region",
    "Postal",
    "Property",
    "Service",
    "Score",
    "Value",
    "Status",
    "Source",
    "Source URL",
  ];
  const rows = leads.map((l) =>
    [
      l.fullName,
      l.email,
      l.phone,
      l.website,
      l.address,
      l.city,
      l.region,
      l.postalCode,
      l.propertyType,
      l.service,
      l.score,
      l.estimatedValue,
      l.status,
      l.source,
      l.sourceUrl,
    ]
      .map((v) => `"${String(v).replaceAll('"', '""')}"`)
      .join(","),
  );
  const blob = new Blob([[header.join(","), ...rows].join("\n")], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "wavesolution-leads.csv";
  a.click();
  URL.revokeObjectURL(url);
}

type Desk = "scraper" | "pipeline";

export function StudioApp({ initialLocation }: { initialLocation?: string }) {
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [desk, setDesk] = useState<Desk>("scraper");
  const [location, setLocation] = useState(initialLocation ?? "");
  const [verticals, setVerticals] = useState<VerticalId[]>(["offices", "hotels", "medical"]);
  const [radiusKm, setRadiusKm] = useState(5);
  const [depth, setDepth] = useState<"listings" | "crawl">("crawl");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [view, setView] = useState<"board" | "list">("list");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [log, setLog] = useState<{ t: string; msg: string }[]>([]);

  const leadsQuery = useQuery({
    queryKey: ["leads"],
    queryFn: () => listLeads(),
    enabled: Boolean(user),
  });
  const statsQuery = useQuery({
    queryKey: ["lead-stats"],
    queryFn: () => getLeadStats(),
    enabled: Boolean(user),
  });
  const jobsQuery = useQuery({
    queryKey: ["scrape-jobs"],
    queryFn: () => listScrapeJobs(),
    enabled: Boolean(user),
  });

  const scrape = useMutation({
    mutationFn: () =>
      scrapeLeads({
        data: {
          location: location.trim(),
          verticals,
          radiusKm,
          depth,
          maxResults: 12,
        },
      }),
    onSuccess: (data) => {
      setLog(data.log);
      void qc.invalidateQueries({ queryKey: ["leads"] });
      void qc.invalidateQueries({ queryKey: ["lead-stats"] });
      void qc.invalidateQueries({ queryKey: ["scrape-jobs"] });
      toast.success(
        data.fallback
          ? `${data.leads.length} modeled prospects (directory quiet)`
          : `${data.leads.length} scraped from ${data.location}`,
      );
      setDesk("pipeline");
    },
    onError: (err) => {
      if (isUnauthorized(err)) void navigate({ to: "/login" });
      else toast.error(err instanceof Error ? err.message : "Scrape failed.");
    },
  });

  const generate = useMutation({
    mutationFn: () =>
      generateLeads({
        data: { location: location.trim(), count: 8 },
      }),
    onSuccess: (data) => {
      void qc.invalidateQueries({ queryKey: ["leads"] });
      void qc.invalidateQueries({ queryKey: ["lead-stats"] });
      toast.success(`${data.leads.length} modeled for ${data.location}`);
      setDesk("pipeline");
    },
    onError: (err) => {
      if (isUnauthorized(err)) void navigate({ to: "/login" });
      else toast.error(err instanceof Error ? err.message : "Could not model.");
    },
  });

  const statusMut = useMutation({
    mutationFn: (input: { id: number; status: LeadStatus }) =>
      updateLeadStatus({ data: input }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["leads"] });
      void qc.invalidateQueries({ queryKey: ["lead-stats"] });
    },
  });

  const notesMut = useMutation({
    mutationFn: (input: { id: number; notes: string }) =>
      updateLeadNotes({ data: input }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["leads"] }),
  });

  const deleteMut = useMutation({
    mutationFn: (id: number) => deleteLead({ data: { id } }),
    onSuccess: () => {
      setSelectedId(null);
      void qc.invalidateQueries({ queryKey: ["leads"] });
      void qc.invalidateQueries({ queryKey: ["lead-stats"] });
      toast.success("Lead removed");
    },
  });

  const leads = leadsQuery.data ?? [];
  const stats = statsQuery.data;
  const jobs = jobsQuery.data ?? [];
  const selected = leads.find((l) => l.id === selectedId) ?? null;
  const busy = scrape.isPending || generate.isPending;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (!q) return true;
      return (
        l.fullName.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.locationLabel.toLowerCase().includes(q) ||
        l.address.toLowerCase().includes(q) ||
        l.website.toLowerCase().includes(q)
      );
    });
  }, [leads, query, statusFilter]);

  function toggleVertical(id: VerticalId) {
    setVerticals((cur) => {
      if (cur.includes(id)) {
        const next = cur.filter((v) => v !== id);
        return next.length ? next : cur;
      }
      return [...cur, id];
    });
  }

  function onScrape(e: FormEvent) {
    e.preventDefault();
    if (location.trim().length < 2) {
      toast.error("Enter a city, neighborhood, or ZIP.");
      return;
    }
    setLog([]);
    scrape.mutate();
  }

  if (isPending) {
    return (
      <div className="min-h-dvh bg-bg">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="h-8 w-48 animate-pulse rounded-md bg-fg/8" />
        </div>
      </div>
    );
  }
  if (!user) return null;

  return (
    <div className="min-h-dvh bg-bg lg:grid lg:grid-cols-[220px_1fr]">
      <aside className="hidden border-r border-border lg:flex lg:flex-col lg:px-4 lg:py-5">
        <Wordmark to="/studio" />
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {(
            [
              ["scraper", "Scraper", Radar],
              ["pipeline", "Pipeline", LayoutGrid],
            ] as const
          ).map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              onClick={() => setDesk(id)}
              className={cn(
                "flex h-11 items-center gap-2.5 rounded-lg px-3 text-sm font-medium",
                desk === id ? "bg-fg/8 text-fg" : "text-muted hover:bg-fg/5 hover:text-fg",
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </nav>
        <div className="[&_button]:text-muted [&_span]:text-sm [&_span.grid]:bg-fg/12 [&_span.grid]:text-fg">
          <UserButton />
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-border bg-bg/85 px-4 py-3 backdrop-blur-md sm:px-6 lg:hidden">
          <Wordmark to="/studio" compact />
          <div className="flex rounded-lg bg-fg/6 p-1">
            <button
              type="button"
              onClick={() => setDesk("scraper")}
              className={cn(
                "h-9 rounded-md px-3 text-sm",
                desk === "scraper" ? "bg-card text-fg" : "text-muted",
              )}
            >
              Scraper
            </button>
            <button
              type="button"
              onClick={() => setDesk("pipeline")}
              className={cn(
                "h-9 rounded-md px-3 text-sm",
                desk === "pipeline" ? "bg-card text-fg" : "text-muted",
              )}
            >
              Pipeline
            </button>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                {user.displayName ? `${user.displayName}` : "Console"}
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                {desk === "scraper" ? "Advanced scraper" : "Lead pipeline"}
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => exportCsv(filtered)}
                disabled={filtered.length === 0}
              >
                <Download className="size-3.5" />
                Export
              </Button>
              <Link to="/" className="inline-flex h-9 items-center px-2 text-sm text-muted hover:text-fg">
                Home
              </Link>
            </div>
          </div>

          <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
            {[
              ["Prospects", stats ? String(stats.total) : "—"],
              ["Scraped", stats ? String(stats.scrapedCount) : "—"],
              ["Pipeline", stats ? formatCurrency(stats.pipelineValue) : "—"],
              ["Booked", stats ? formatCurrency(stats.bookedValue) : "—"],
              ["Avg score", stats ? String(stats.avgScore) : "—"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-card p-4 shadow-[var(--shadow-border)]">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                  {label}
                </p>
                <p className="mt-2 font-mono text-2xl tabular-nums tracking-tight">{value}</p>
              </div>
            ))}
          </section>

          {desk === "scraper" ? (
            <form onSubmit={onScrape} className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-5 rounded-[22px] bg-card p-5 shadow-[var(--shadow-border)] sm:p-6">
                <div className="space-y-1.5">
                  <Label htmlFor="loc">Territory</Label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
                    <Input
                      id="loc"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City, neighborhood, or ZIP"
                      className="h-12 pl-9"
                    />
                  </div>
                </div>
                <div>
                  <Label>Verticals</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {VERTICALS.map((v) => {
                      const on = verticals.includes(v.id);
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => toggleVertical(v.id)}
                          className={cn(
                            "h-9 rounded-full px-3 text-sm",
                            on
                              ? "bg-primary text-primary-fg"
                              : "bg-fg/6 text-muted hover:text-fg",
                          )}
                        >
                          {v.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Radius</Label>
                    <div className="mt-2 grid grid-cols-4 rounded-xl bg-fg/6 p-1">
                      {[2, 5, 10, 15].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setRadiusKm(n)}
                          className={cn(
                            "h-9 rounded-lg text-sm tabular-nums",
                            radiusKm === n ? "bg-card text-fg shadow-[var(--shadow-border)]" : "text-muted",
                          )}
                        >
                          {n} km
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Depth</Label>
                    <div className="mt-2 grid grid-cols-2 rounded-xl bg-fg/6 p-1">
                      {(
                        [
                          ["listings", "Listings"],
                          ["crawl", "Listings + crawl"],
                        ] as const
                      ).map(([id, label]) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setDepth(id)}
                          className={cn(
                            "h-9 rounded-lg px-2 text-sm",
                            depth === id ? "bg-card text-fg shadow-[var(--shadow-border)]" : "text-muted",
                          )}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button type="submit" size="lg" className="flex-1" disabled={busy}>
                    <Radar className="size-4" />
                    {scrape.isPending ? "Scraping public sources…" : "Run advanced scrape"}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    disabled={busy || location.trim().length < 2}
                    onClick={() => generate.mutate()}
                  >
                    Model fill
                  </Button>
                </div>
                <p className="text-xs leading-relaxed text-subtle">
                  Uses OpenStreetMap public listings, then crawls homepages for
                  email and phone. Homepage only. No logins, no private inboxes.
                </p>
              </div>

              <div className="rounded-[22px] bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                  Activity
                </p>
                {busy && (
                  <p className="shimmer mt-3 rounded-lg px-3 py-2 font-mono text-xs text-muted">
                    Running net…
                  </p>
                )}
                <ol className="mt-4 space-y-2 font-mono text-xs text-muted">
                  {(log.length
                    ? log
                    : [{ t: "—", msg: "Idle. Set a territory and run the scraper." }]
                  ).map((row, i) => (
                    <li key={`${row.t}-${i}`} className="grid grid-cols-[4.5rem_1fr] gap-3">
                      <span className="text-subtle tabular-nums">{row.t}</span>
                      <span className="text-fg/90">{row.msg}</span>
                    </li>
                  ))}
                </ol>
                {jobs.length > 0 && (
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Recent runs</p>
                    <ul className="mt-3 space-y-2 text-sm">
                      {jobs.slice(0, 5).map((job) => (
                        <li key={job.id} className="flex justify-between gap-3 text-muted">
                          <span className="truncate text-fg">{job.location}</span>
                          <span className="shrink-0 font-mono text-xs tabular-nums">
                            {job.found} · {job.crawled} crawl
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </form>
          ) : (
            <>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <div className="relative min-w-0 flex-1 sm:max-w-xs">
                    <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search name, email, site"
                      className="h-10 pl-9"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as LeadStatus | "all")}
                    className="h-10 rounded-lg border border-border bg-card px-3 text-sm"
                  >
                    <option value="all">All statuses</option>
                    {LEAD_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_LABEL[s]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 rounded-xl bg-fg/5 p-1">
                  {(
                    [
                      ["list", "List", Table2],
                      ["board", "Board", LayoutGrid],
                    ] as const
                  ).map(([v, label, Icon]) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setView(v)}
                      className={cn(
                        "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-medium",
                        view === v
                          ? "bg-card text-fg shadow-[var(--shadow-border)]"
                          : "text-muted",
                      )}
                    >
                      <Icon className="size-3.5" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {leadsQuery.isLoading ? (
                <div className="mt-8 h-64 animate-pulse rounded-2xl bg-fg/6" />
              ) : filtered.length === 0 ? (
                <div className="mt-10 rounded-[22px] bg-card p-8 shadow-[var(--shadow-border)]">
                  <h2 className="text-2xl font-semibold tracking-tight">Empty book</h2>
                  <p className="mt-2 max-w-md text-sm text-muted">
                    Run the scraper on a territory to pull public listings, or
                    model a fill if the map is quiet.
                  </p>
                  <Button type="button" className="mt-5" onClick={() => setDesk("scraper")}>
                    Open scraper
                  </Button>
                </div>
              ) : view === "board" ? (
                <div className="mt-6 flex gap-3 overflow-x-auto pb-4">
                  {PIPELINE.map((col) => {
                    const items = filtered.filter((l) => l.status === col);
                    return (
                      <section
                        key={col}
                        className="w-[min(100%,280px)] shrink-0 rounded-[22px] bg-surface p-2 sm:w-72"
                      >
                        <div className="flex items-center justify-between px-2 py-2">
                          <h2 className="text-sm font-medium">{STATUS_LABEL[col]}</h2>
                          <span className="font-mono text-xs tabular-nums text-subtle">
                            {items.length}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {items.map((lead) => (
                            <LeadCard
                              key={lead.id}
                              lead={lead}
                              onOpen={() => setSelectedId(lead.id)}
                            />
                          ))}
                        </div>
                      </section>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-6 overflow-x-auto rounded-[22px] bg-card shadow-[var(--shadow-border)]">
                  <table className="w-full min-w-[860px] text-left text-sm">
                    <thead className="text-[11px] uppercase tracking-[0.14em] text-muted">
                      <tr className="border-b border-border">
                        <th className="px-4 py-3 font-medium">Name</th>
                        <th className="px-4 py-3 font-medium">Contact</th>
                        <th className="px-4 py-3 font-medium">Location</th>
                        <th className="px-4 py-3 font-medium">Source</th>
                        <th className="px-4 py-3 font-medium">Score</th>
                        <th className="px-4 py-3 font-medium">Value</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((lead) => (
                        <tr
                          key={lead.id}
                          className="cursor-pointer border-b border-border/70 last:border-0 hover:bg-fg/4"
                          onClick={() => setSelectedId(lead.id)}
                        >
                          <td className="px-4 py-3">
                            <p className="font-medium">{lead.fullName}</p>
                            <p className="text-xs text-muted">{lead.service}</p>
                          </td>
                          <td className="px-4 py-3 text-muted">
                            {lead.email || "No public email"}
                            <br />
                            <span className="text-xs">
                              {lead.phone ? formatPhone(lead.phone) : "—"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-muted">
                            {lead.address}
                            <br />
                            <span className="text-xs">{lead.locationLabel}</span>
                          </td>
                          <td className="px-4 py-3">
                            <Badge tone={lead.source === "scraped" ? "success" : "muted"}>
                              {lead.source}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 font-mono tabular-nums">{lead.score}</td>
                          <td className="px-4 py-3 font-mono tabular-nums">
                            {formatCurrency(lead.estimatedValue)}
                          </td>
                          <td className="px-4 py-3">
                            <StatusPill status={lead.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {selected && (
        <LeadDetail
          key={selected.id}
          lead={selected}
          onClose={() => setSelectedId(null)}
          onStatus={(status) => statusMut.mutate({ id: selected.id, status })}
          onNotes={(notes) => notesMut.mutate({ id: selected.id, notes })}
          onDelete={() => deleteMut.mutate(selected.id)}
          busy={deleteMut.isPending}
        />
      )}
    </div>
  );
}

function StatusPill({ status }: { status: LeadStatus }) {
  const tone =
    status === "booked"
      ? "success"
      : status === "lost"
        ? "danger"
        : status === "quoted"
          ? "warning"
          : "default";
  return <Badge tone={tone}>{STATUS_LABEL[status]}</Badge>;
}

function LeadCard({ lead, onOpen }: { lead: Lead; onOpen: () => void }) {
  const tone = scoreTone(lead.score);
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full rounded-xl bg-card p-3.5 text-left shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-medium">{lead.fullName}</p>
          <p className="mt-0.5 text-xs text-muted">{lead.locationLabel}</p>
        </div>
        <span
          className={cn(
            "font-mono text-lg tabular-nums leading-none",
            tone === "high" && "text-success",
            tone === "mid" && "text-fg",
            tone === "low" && "text-muted",
          )}
        >
          {lead.score}
        </span>
      </div>
      <p className="mt-3 text-xs text-muted">
        {lead.source} · {lead.service}
      </p>
      <p className="mt-1 font-mono text-sm tabular-nums">
        {formatCurrency(lead.estimatedValue)}
      </p>
    </button>
  );
}

function LeadDetail({
  lead,
  onClose,
  onStatus,
  onNotes,
  onDelete,
  busy,
}: {
  lead: Lead;
  onClose: () => void;
  onStatus: (status: LeadStatus) => void;
  onNotes: (notes: string) => void;
  onDelete: () => void;
  busy: boolean;
}) {
  const [notes, setNotes] = useState(lead.notes);

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-bg/60"
        onClick={onClose}
      />
      <aside className="relative flex h-full w-full max-w-md flex-col bg-card shadow-[var(--shadow-lift)]">
        <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
              {lead.locationLabel} · {lead.source}
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">{lead.fullName}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-11 place-items-center rounded-lg hover:bg-fg/5"
            aria-label="Close lead"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Fit score</p>
              <p className="font-mono text-5xl tabular-nums leading-none">{lead.score}</p>
            </div>
            <p className="font-mono text-2xl tabular-nums">
              {formatCurrency(lead.estimatedValue)}
            </p>
          </div>
          <p className="text-sm text-muted">{lead.triggerReason}</p>
          <div className="grid gap-2 text-sm">
            <p>
              {lead.address}
              <br />
              {lead.city}
              {lead.region ? `, ${lead.region}` : ""} {lead.postalCode}
            </p>
            <p>
              {lead.propertyType} · {lead.service}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {lead.email ? (
              <Button asChild variant="secondary" size="sm">
                <a href={`mailto:${lead.email}`}>
                  {lead.email}
                  <ArrowUpRight className="size-3.5" />
                </a>
              </Button>
            ) : (
              <span className="text-xs text-subtle">No public email</span>
            )}
            {lead.phone ? (
              <Button asChild variant="secondary" size="sm">
                <a href={`tel:${lead.phone}`}>
                  <Phone className="size-3.5" />
                  {formatPhone(lead.phone)}
                </a>
              </Button>
            ) : null}
            {lead.website ? (
              <Button asChild variant="secondary" size="sm">
                <a href={lead.website} target="_blank" rel="noreferrer">
                  <Globe className="size-3.5" />
                  Site
                </a>
              </Button>
            ) : null}
            {lead.sourceUrl ? (
              <Button asChild variant="ghost" size="sm">
                <a href={lead.sourceUrl} target="_blank" rel="noreferrer">
                  Map
                </a>
              </Button>
            ) : null}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="status">Pipeline</Label>
            <select
              id="status"
              value={lead.status}
              onChange={(e) => onStatus(e.target.value as LeadStatus)}
              className="h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm"
            >
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABEL[s]}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={() => {
                if (notes !== lead.notes) onNotes(notes);
              }}
            />
          </div>
        </div>
        <div className="border-t border-border p-4">
          <Button
            type="button"
            variant="ghost"
            className="w-full text-danger"
            disabled={busy}
            onClick={onDelete}
          >
            <Trash2 className="size-4" />
            Remove lead
          </Button>
        </div>
      </aside>
    </div>
  );
}
