"use client";

import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Globe, MapPin, Radar, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export function LandingPage() {
  const [location, setLocation] = useState("Austin, TX");
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const q = location.trim();
    if (!q) return;
    if (isPending) return;
    if (user) {
      void navigate({ to: "/studio", search: { location: q } });
    } else {
      void navigate({ to: "/login", search: { next: "/studio", location: q } });
    }
  }

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <SiteHeader />
      <main>
        <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-14 lg:pb-24 lg:pt-16">
          <div>
            <p className="rise-in text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
              Cleaning company · Intelligence console
            </p>
            <h1 className="rise-in-2 mt-4 text-[2.45rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-[3.6rem]">
              Scrape the streets.
              <br />
              Book the work.
            </h1>
            <p className="rise-in-3 mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-[1.05rem]">
              Wavesolution Lead pulls public listings in any city, crawls sites
              for email and phone, then scores them for a cleaning pipeline —
              offices, hotels, medical, retail.
            </p>
            <form
              onSubmit={onSearch}
              className="rise-in-4 mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch"
            >
              <label className="relative min-w-0 flex-1">
                <span className="sr-only">Location</span>
                <MapPin className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-subtle" />
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, neighborhood, or ZIP"
                  className="h-12 rounded-xl bg-surface pl-10"
                  autoComplete="address-level2"
                />
              </label>
              <Button type="submit" size="lg" className="h-12 shrink-0 px-6">
                Run scraper
                <ArrowRight className="size-4" />
              </Button>
            </form>
            <p className="mt-3 text-xs text-subtle">
              Name, email, password to open a private console. Public sources only.
            </p>
          </div>
          <div className="rise-in-3 relative">
            <img
              src="/media/tower.jpg"
              alt="Waterfront offices at blue hour"
              className="aspect-[16/11] w-full rounded-[24px] object-cover shadow-[var(--shadow-lift)] outline outline-1 -outline-offset-1 outline-fg/10"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-card/92 p-4 shadow-[var(--shadow-border)] backdrop-blur-sm sm:inset-x-auto sm:right-5 sm:bottom-5 sm:left-auto sm:w-72">
              <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                Live scrape · Austin
              </p>
              <ul className="mt-3 space-y-2 font-mono text-xs">
                <li className="flex justify-between text-muted">
                  <span>geocode</span>
                  <span className="text-success">ok</span>
                </li>
                <li className="flex justify-between text-muted">
                  <span>map listings</span>
                  <span className="text-fg">24</span>
                </li>
                <li className="flex justify-between text-muted">
                  <span>sites crawled</span>
                  <span className="text-fg">6</span>
                </li>
                <li className="flex justify-between text-muted">
                  <span>emails extracted</span>
                  <span className="text-fg">4</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-surface">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-3">
            {[
              {
                title: "Advanced scraping",
                body: "Geocode a territory, query public map listings, then crawl homepages for mailboxes and phone numbers. Radius, vertical, and depth are yours.",
                icon: Radar,
              },
              {
                title: "Public sources, named",
                body: "Every scraped record keeps its map URL and website. No purchased dump. If a directory is quiet, the console models the gap so you still work.",
                icon: Globe,
              },
              {
                title: "Private book",
                body: "Your name, email, and password lock the pipeline. Status, notes, and export never leave the account.",
                icon: ShieldCheck,
              },
            ].map((item) => (
              <article key={item.title} className="max-w-sm">
                <item.icon className="size-5 text-ring" strokeWidth={1.6} />
                <h2 className="mt-4 text-xl font-semibold tracking-tight">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <img
            src="/media/wave.jpg"
            alt="Dark water with a single steel-colored wave"
            className="aspect-[16/10] w-full rounded-[24px] object-cover shadow-[var(--shadow-lift)] outline outline-1 -outline-offset-1 outline-fg/10"
          />
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
              How a run works
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Four steps from a ZIP to a contacted list.
            </h2>
            <ol className="mt-8 space-y-5">
              {[
                ["01", "Set the net", "City or ZIP, verticals, radius, listings or listings plus site crawl."],
                ["02", "Read the map", "Public OpenStreetMap listings: name, phone, site, address."],
                ["03", "Extract contact", "Homepage crawl for emails and tel links. Score the file."],
                ["04", "Work the desk", "New, contacted, quoted, booked. Export CSV when the book is ready."],
              ].map(([n, title, body]) => (
                <li key={n} className="grid grid-cols-[auto_1fr] gap-4">
                  <span className="font-mono text-sm text-subtle tabular-nums">{n}</span>
                  <div>
                    <p className="font-medium">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Button asChild className="mt-8" size="lg">
              <Link to="/login" search={{ next: "/studio" }}>
                Open console
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>Wavesolution Lead · Public-source scraping for cleaning companies</span>
          <span>Listings are public map data. Crawl is homepage-only.</span>
        </div>
      </footer>
    </div>
  );
}
