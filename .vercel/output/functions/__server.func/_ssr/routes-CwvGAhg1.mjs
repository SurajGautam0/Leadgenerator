import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as ArrowRight, i as ShieldCheck, l as ContactRound, s as MapPin } from "../_libs/lucide-react.mjs";
import { c as useCurrentUserState, n as Input, r as Wordmark, t as Button } from "./input-Ca_47ZZ_.mjs";
import { n as UserButton } from "./gates-yLjJz8Ac.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CwvGAhg1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SiteHeader({ studio }) {
	const { user, isPending } = useCurrentUserState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-30 border-b border-border/80 bg-bg/80 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-[4.25rem] sm:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, { to: studio ? "/studio" : "/" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex items-center gap-1 sm:gap-2",
				children: [!studio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/studio",
					className: "hidden h-10 items-center rounded-lg px-3 text-sm text-muted transition-colors duration-150 hover:text-fg sm:inline-flex",
					children: "Studio"
				}), isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-28 animate-pulse rounded-full bg-fg/8" }) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [!studio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/studio",
						className: "inline-flex h-10 items-center rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-fg",
						children: "Open studio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden sm:block [&_button]:text-muted [&_span]:text-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "inline-flex h-10 items-center rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-fg",
					children: "Sign in"
				})]
			})]
		})
	});
}
var SAMPLE = [
	{
		name: "Elena Moreau",
		place: "West Village",
		score: 94,
		job: "Estate care"
	},
	{
		name: "Julian Hale",
		place: "Tribeca loft",
		score: 91,
		job: "Weekly housekeep"
	},
	{
		name: "Priya Lang",
		place: "Park Slope",
		score: 86,
		job: "Post-renovation"
	}
];
function LandingPage() {
	const [location, setLocation] = (0, import_react.useState)("West Village, NY");
	const { user, isPending } = useCurrentUserState();
	const navigate = useNavigate();
	function onSearch(e) {
		e.preventDefault();
		const q = location.trim();
		if (!q) return;
		if (isPending) return;
		if (user) navigate({
			to: "/studio",
			search: { location: q }
		});
		else navigate({
			to: "/login",
			search: {
				next: "/studio",
				location: q
			}
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-14 lg:pb-24 lg:pt-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rise-in text-xs font-medium uppercase tracking-[0.22em] text-muted",
							children: "Cleaning studio · Lead engine"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "rise-in-2 mt-4 font-display text-[2.65rem] leading-[1.05] tracking-[-0.03em] text-fg sm:text-6xl lg:text-[4.4rem]",
							children: "The homes that need you, mapped."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rise-in-3 mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg",
							children: "Alba finds scored households in any city or ZIP — name, email, and address — so your cleaning company books the next quiet estate, not the next cold call list."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: onSearch,
							className: "rise-in-4 mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "relative min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sr-only",
										children: "Location"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-subtle" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: location,
										onChange: (e) => setLocation(e.target.value),
										placeholder: "City, neighborhood, or ZIP",
										className: "h-12 rounded-xl pl-10",
										autoComplete: "address-level2"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								size: "lg",
								className: "h-12 shrink-0 px-6",
								children: ["Generate leads", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-subtle",
							children: "Sign in with name, email, and password. Your pipeline stays private."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rise-in-3 relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/media/atelier.jpg",
							alt: "A sunlit living room after a meticulous clean",
							className: "aspect-[16/10] w-full rounded-[28px] object-cover shadow-[var(--shadow-lift)] outline outline-1 -outline-offset-1 outline-fg/10"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute right-4 bottom-4 left-4 rounded-2xl bg-card/92 p-4 shadow-[var(--shadow-border)] backdrop-blur-sm sm:right-6 sm:bottom-6 sm:left-auto sm:w-72",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-medium uppercase tracking-[0.16em] text-muted",
								children: "Territory · West Village"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 space-y-2.5",
								children: SAMPLE.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-baseline justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: row.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [
											row.place,
											" · ",
											row.job
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-lg tabular-nums leading-none",
										children: row.score
									})]
								}, row.name))
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "border-y border-border bg-surface",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-3",
						children: [
							{
								title: "Search a street, not a spreadsheet",
								body: "Type a ZIP, a neighborhood, or a city. Alba models the housing stock and returns households most likely to pay for studio-grade care.",
								icon: MapPin
							},
							{
								title: "Name, email, phone — already in hand",
								body: "Every prospect arrives with contact details, a property read, a trigger, and an estimated job value. Move them from new to booked.",
								icon: ContactRound
							},
							{
								title: "Your book, your lock",
								body: "Create a studio with your name, email, and password. Leads never mix between accounts.",
								icon: ShieldCheck
							}
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "max-w-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
									className: "size-5 text-primary",
									strokeWidth: 1.6
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 font-display text-2xl tracking-tight",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted",
									children: item.body
								})
							]
						}, item.title))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/media/territory.jpg",
						alt: "A quiet street of townhouses at golden hour",
						className: "aspect-[16/10] w-full rounded-[28px] object-cover shadow-[var(--shadow-lift)] outline outline-1 -outline-offset-1 outline-fg/10"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-[0.22em] text-muted",
							children: "How the studio works"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-4xl tracking-[-0.03em] sm:text-5xl",
							children: "Three steps from a ZIP to a booked clean."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-8 space-y-5",
							children: [
								[
									"01",
									"Name the territory",
									"City, neighborhood, or postal code. Optionally pin a service — weekly, turnover, move-out."
								],
								[
									"02",
									"Read the list",
									"Scored prospects with email, phone, property type, and why they need you now."
								],
								[
									"03",
									"Work the pipeline",
									"Contact, quote, book. Export the book. Keep notes on the household."
								]
							].map(([n, title, body]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "grid grid-cols-[auto_1fr] gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-xl text-subtle tabular-nums",
									children: n
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm leading-relaxed text-muted",
									children: body
								})] })]
							}, n))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "mt-8",
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/login",
								search: { next: "/studio" },
								children: ["Open your studio", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "px-5 pb-20 sm:px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto grid max-w-6xl overflow-hidden rounded-[28px] bg-primary text-primary-fg lg:grid-cols-[1.2fr_0.8fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-8 sm:p-12 lg:p-14",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-4xl tracking-[-0.03em] sm:text-5xl",
									children: "Built for the company that still folds the corners."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 max-w-md text-sm leading-relaxed text-primary-fg/75",
									children: "Alba is the private lead book for a cleaning studio: location first, contact details complete, pipeline honest. No spray. No purchased dump of names."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "secondary",
									size: "lg",
									className: "mt-8 bg-primary-fg text-primary hover:opacity-95",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/login",
										search: { next: "/studio" },
										children: "Create studio"
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/media/linen.jpg",
							alt: "Stacked linen towels and eucalyptus on marble",
							className: "hidden h-full min-h-64 w-full object-cover lg:block"
						})]
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Alba · Location leads for a cleaning studio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Prospects are modeled from neighborhood housing patterns." })]
				})
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingPage, {});
}
//#endregion
export { Home as component };
