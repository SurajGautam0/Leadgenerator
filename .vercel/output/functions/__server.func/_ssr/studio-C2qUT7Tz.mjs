import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { Ft as string, Mt as object, jt as number, wt as _enum } from "../_libs/@better-auth/core+[...].mjs";
import { a as authMiddleware, i as STATUS_LABEL, o as scoreTone, r as SERVICES, t as LEAD_STATUSES } from "./leads-types-DqcKIXLy.mjs";
import { a as Search, c as Download, o as Phone, r as Trash2, s as MapPin, t as X, u as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as createSsrRpc, n as Route$1 } from "./router-CRIa0g0q.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as formatCurrency, c as useCurrentUserState, i as cn, n as Input, o as formatPhone, r as Wordmark, t as Button } from "./input-Ca_47ZZ_.mjs";
import { t as Label } from "./label-CNs-UryD.mjs";
import { n as UserButton, t as RedirectToSignIn } from "./gates-yLjJz8Ac.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-C2qUT7Tz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide", {
	variants: { tone: {
		default: "bg-fg/6 text-ink-soft",
		primary: "bg-primary text-primary-fg",
		success: "bg-success/12 text-success",
		warning: "bg-warning/12 text-warning",
		danger: "bg-danger/12 text-danger",
		muted: "bg-border text-muted"
	} },
	defaultVariants: { tone: "default" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ tone }), className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-28 w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-fg placeholder:text-subtle", "transition-[box-shadow,border-color] duration-150 ease-out", "focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-ring/20", className),
		...props
	});
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
var listLeads = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("7472da2017180e359549e0d89908cd87878b3ebe96d852e8ea906b7cf6b4fbc3"));
var getLeadStats = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("fcd95e40e79886aca060c9e7369963bc62dcf2fbaf2b99bea8ac291430cdd94b"));
var generateLeads = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => generateInput.parse(input)).handler(createSsrRpc("880eac11209e176b6bbc0190ebadb67e3067caebf96c68ac8ca5eedd7aabdc98"));
var updateLeadStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => statusInput.parse(input)).handler(createSsrRpc("6ea6a21d569ea087f8b58ba18eb09710850a06aba2302801bf0fe8131a422d35"));
var updateLeadNotes = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => notesInput.parse(input)).handler(createSsrRpc("5c0dd4af84c4c3c6d27c40ae776365c1a3b1e55d532bb3e7e01680298e8ab97c"));
var deleteLead = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => idInput.parse(input)).handler(createSsrRpc("2f9873c3727848031a85b9c07f6277305c8b8d472e2b96a24ca9ba4f290dd2c4"));
var PIPELINE = [
	"new",
	"contacted",
	"quoted",
	"booked"
];
function isUnauthorized(err) {
	return err instanceof Error && err.message === "Unauthorized";
}
function exportCsv(leads) {
	const header = [
		"Name",
		"Email",
		"Phone",
		"Address",
		"City",
		"Region",
		"Postal",
		"Property",
		"Service",
		"Score",
		"Value",
		"Status",
		"Trigger"
	];
	const rows = leads.map((l) => [
		l.fullName,
		l.email,
		l.phone,
		l.address,
		l.city,
		l.region,
		l.postalCode,
		l.propertyType,
		l.service,
		l.score,
		l.estimatedValue,
		l.status,
		l.triggerReason
	].map((v) => `"${String(v).replaceAll("\"", "\"\"")}"`).join(","));
	const blob = new Blob([[header.join(","), ...rows].join("\n")], { type: "text/csv;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "alba-leads.csv";
	a.click();
	URL.revokeObjectURL(url);
}
function StudioApp({ initialLocation }) {
	const { user, isPending } = useCurrentUserState();
	const navigate = useNavigate();
	const qc = useQueryClient();
	const [location, setLocation] = (0, import_react.useState)(initialLocation ?? "");
	const [service, setService] = (0, import_react.useState)("");
	const [query, setQuery] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [view, setView] = (0, import_react.useState)("board");
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [brief, setBrief] = (0, import_react.useState)(null);
	const leadsQuery = useQuery({
		queryKey: ["leads"],
		queryFn: () => listLeads(),
		enabled: Boolean(user)
	});
	const statsQuery = useQuery({
		queryKey: ["lead-stats"],
		queryFn: () => getLeadStats(),
		enabled: Boolean(user)
	});
	const generate = useMutation({
		mutationFn: (input) => generateLeads({ data: {
			location: input.location,
			count: 10,
			service: input.service || void 0
		} }),
		onSuccess: (data) => {
			setBrief(data.brief);
			qc.invalidateQueries({ queryKey: ["leads"] });
			qc.invalidateQueries({ queryKey: ["lead-stats"] });
			toast.success(`${data.leads.length} prospects in ${data.location}`);
		},
		onError: (err) => {
			if (isUnauthorized(err)) navigate({ to: "/login" });
			else toast.error(err instanceof Error ? err.message : "Could not generate.");
		}
	});
	(0, import_react.useEffect)(() => {
		const loc = initialLocation?.trim();
		if (!loc || loc.length < 2) return;
		const key = `alba.autogen:${loc.toLowerCase()}`;
		try {
			if (sessionStorage.getItem(key)) return;
			sessionStorage.setItem(key, "1");
		} catch {}
		generate.mutate({
			location: loc,
			service: ""
		});
	}, [initialLocation]);
	const statusMut = useMutation({
		mutationFn: (input) => updateLeadStatus({ data: input }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["leads"] });
			qc.invalidateQueries({ queryKey: ["lead-stats"] });
		}
	});
	const notesMut = useMutation({
		mutationFn: (input) => updateLeadNotes({ data: input }),
		onSuccess: () => void qc.invalidateQueries({ queryKey: ["leads"] })
	});
	const deleteMut = useMutation({
		mutationFn: (id) => deleteLead({ data: { id } }),
		onSuccess: () => {
			setSelectedId(null);
			qc.invalidateQueries({ queryKey: ["leads"] });
			qc.invalidateQueries({ queryKey: ["lead-stats"] });
			toast.success("Lead removed");
		}
	});
	const leads = leadsQuery.data ?? [];
	const stats = statsQuery.data;
	const selected = leads.find((l) => l.id === selectedId) ?? null;
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return leads.filter((l) => {
			if (statusFilter !== "all" && l.status !== statusFilter) return false;
			if (!q) return true;
			return l.fullName.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.city.toLowerCase().includes(q) || l.locationLabel.toLowerCase().includes(q) || l.address.toLowerCase().includes(q);
		});
	}, [
		leads,
		query,
		statusFilter
	]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-40 animate-pulse rounded-full bg-fg/8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-3 sm:grid-cols-4",
				children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 animate-pulse rounded-2xl bg-fg/6" }, i))
			})]
		})
	});
	if (!user) return null;
	function onGenerate(e) {
		e.preventDefault();
		const loc = location.trim();
		if (loc.length < 2) {
			toast.error("Enter a city, neighborhood, or ZIP.");
			return;
		}
		generate.mutate({
			location: loc,
			service
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-20 border-b border-border/80 bg-bg/85 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, { to: "/studio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2 lg:hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: onGenerate,
							className: "flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "relative min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "sr-only",
											children: "Location"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: location,
											onChange: (e) => setLocation(e.target.value),
											placeholder: "City, neighborhood, or ZIP",
											className: "h-11 rounded-xl pl-9"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: service,
									onChange: (e) => setService(e.target.value),
									className: "h-11 rounded-xl border border-border bg-card px-3 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-ring/20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Any service"
									}), SERVICES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: s,
										children: s
									}, s))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									className: "h-11 shrink-0",
									disabled: generate.isPending,
									children: generate.isPending ? "Reading the streets…" : "Generate"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden lg:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-[0.18em] text-muted",
							children: user.displayName ? `${user.displayName} · studio` : "Studio"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 font-display text-3xl tracking-tight sm:text-4xl",
							children: "Lead book"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "secondary",
								size: "sm",
								onClick: () => exportCsv(filtered),
								disabled: filtered.length === 0,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "Export"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "inline-flex h-9 items-center px-2 text-sm text-muted hover:text-fg",
								children: "Home"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4",
						children: [
							["Prospects", stats ? String(stats.total) : "—"],
							["Pipeline", stats ? formatCurrency(stats.pipelineValue) : "—"],
							["Booked", stats ? formatCurrency(stats.bookedValue) : "—"],
							["Avg score", stats ? String(stats.avgScore) : "—"]
						].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-card p-4 shadow-[var(--shadow-border)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-medium uppercase tracking-[0.16em] text-muted",
								children: label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-3xl tabular-nums tracking-tight",
								children: value
							})]
						}, label))
					}),
					generate.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "shimmer mt-5 rounded-xl bg-surface px-4 py-3 text-sm text-muted",
						children: [
							"Mapping households in ",
							location || "this territory",
							"…"
						]
					}),
					brief && !generate.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-3xl text-sm leading-relaxed text-muted",
						children: brief
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 flex-1 items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative min-w-0 flex-1 sm:max-w-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: query,
									onChange: (e) => setQuery(e.target.value),
									placeholder: "Search name, email, street",
									className: "h-10 pl-9"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: statusFilter,
								onChange: (e) => setStatusFilter(e.target.value),
								className: "h-10 rounded-lg border border-border bg-card px-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "All statuses"
								}), LEAD_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s,
									children: STATUS_LABEL[s]
								}, s))]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 rounded-xl bg-fg/5 p-1",
							children: ["board", "list"].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setView(v),
								className: cn("h-9 rounded-lg px-3 text-sm font-medium capitalize", view === v ? "bg-card text-fg shadow-[var(--shadow-border)]" : "text-muted"),
								children: v
							}, v))
						})]
					}),
					leadsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-3 sm:grid-cols-4",
						children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 animate-pulse rounded-2xl bg-fg/6" }, i))
					}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						hasAny: leads.length > 0,
						onHint: (hint) => {
							setLocation(hint);
							generate.mutate({
								location: hint,
								service
							});
						}
					}) : view === "board" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex gap-3 overflow-x-auto pb-4",
						children: PIPELINE.map((col) => {
							const items = filtered.filter((l) => l.status === col);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "w-[min(100%,280px)] shrink-0 rounded-[22px] bg-surface p-2 sm:w-72",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between px-2 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-sm font-medium",
										children: STATUS_LABEL[col]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs tabular-nums text-subtle",
										children: items.length
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2",
									children: items.map((lead) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadCard, {
										lead,
										onOpen: () => setSelectedId(lead.id)
									}, lead.id))
								})]
							}, col);
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 overflow-x-auto rounded-[22px] bg-card shadow-[var(--shadow-border)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[720px] text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "text-[11px] uppercase tracking-[0.14em] text-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-border",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3 font-medium",
											children: "Name"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3 font-medium",
											children: "Location"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3 font-medium",
											children: "Service"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3 font-medium",
											children: "Score"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3 font-medium",
											children: "Value"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-3 font-medium",
											children: "Status"
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((lead) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "cursor-pointer border-b border-border/70 last:border-0 hover:bg-fg/3",
								onClick: () => setSelectedId(lead.id),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium",
											children: lead.fullName
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted",
											children: lead.email
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3 text-muted",
										children: [
											lead.address,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs",
												children: lead.locationLabel
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: lead.service
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 tabular-nums",
										children: lead.score
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 tabular-nums",
										children: formatCurrency(lead.estimatedValue)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: lead.status })
									})
								]
							}, lead.id)) })]
						})
					})
				]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadDetail, {
				lead: selected,
				onClose: () => setSelectedId(null),
				onStatus: (status) => statusMut.mutate({
					id: selected.id,
					status
				}),
				onNotes: (notes) => notesMut.mutate({
					id: selected.id,
					notes
				}),
				onDelete: () => deleteMut.mutate(selected.id),
				busy: deleteMut.isPending
			}, selected.id)
		]
	});
}
function StatusPill({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: status === "booked" ? "success" : status === "lost" ? "danger" : status === "quoted" ? "warning" : "default",
		children: STATUS_LABEL[status]
	});
}
function LeadCard({ lead, onOpen }) {
	const tone = scoreTone(lead.score);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onOpen,
		className: "w-full rounded-xl bg-card p-3.5 text-left shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-150 hover:shadow-[var(--shadow-border-hover)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: lead.fullName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-xs text-muted",
					children: lead.locationLabel
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("font-display text-lg tabular-nums leading-none", tone === "high" && "text-success", tone === "mid" && "text-fg", tone === "low" && "text-muted"),
					children: lead.score
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-xs text-muted",
				children: [
					lead.propertyType,
					" · ",
					lead.service
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm tabular-nums",
				children: formatCurrency(lead.estimatedValue)
			})
		]
	});
}
function EmptyState({ hasAny, onHint }) {
	if (hasAny) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl",
			children: "No matches in this filter."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: "Clear search or switch status."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-10 overflow-hidden rounded-[28px] bg-card shadow-[var(--shadow-border)] lg:grid lg:grid-cols-[1.1fr_0.9fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-8 sm:p-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.18em] text-muted",
					children: "Empty book"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl tracking-tight sm:text-4xl",
					children: "Name a neighborhood. We'll map the homes that need you."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-md text-sm leading-relaxed text-muted",
					children: "Try a ZIP or a city you already service. Alba returns scored households with name, email, phone, and an estimated job value."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex flex-wrap gap-2",
					children: [
						"West Village, NY",
						"90210",
						"Austin, TX",
						"Chelsea, London"
					].map((hint) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						size: "sm",
						onClick: () => onHint(hint),
						children: hint
					}, hint))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/media/territory.jpg",
			alt: "",
			className: "hidden h-full min-h-56 w-full object-cover lg:block"
		})]
	});
}
function LeadDetail({ lead, onClose, onStatus, onNotes, onDelete, busy }) {
	const [notes, setNotes] = (0, import_react.useState)(lead.notes);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-40 flex justify-end",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Close",
			className: "absolute inset-0 bg-fg/25",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "relative flex h-full w-full max-w-md flex-col bg-card shadow-[var(--shadow-lift)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3 border-b border-border px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-[0.16em] text-muted",
						children: lead.locationLabel
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-3xl tracking-tight",
						children: lead.fullName
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "grid size-11 place-items-center rounded-lg hover:bg-fg/5",
						"aria-label": "Close lead",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-5 overflow-y-auto px-5 py-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] uppercase tracking-[0.16em] text-muted",
								children: "Fit score"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-5xl tabular-nums leading-none",
								children: lead.score
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl tabular-nums",
								children: formatCurrency(lead.estimatedValue)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: lead.triggerReason
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								lead.address,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								lead.city,
								", ",
								lead.region,
								" ",
								lead.postalCode
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								lead.propertyType,
								" · ",
								lead.service
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "secondary",
								size: "sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `mailto:${lead.email}`,
									children: [lead.email, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "secondary",
								size: "sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `tel:${lead.phone}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5" }), formatPhone(lead.phone)]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "status",
								children: "Pipeline"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								id: "status",
								value: lead.status,
								onChange: (e) => onStatus(e.target.value),
								className: "h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm",
								children: LEAD_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s,
									children: STATUS_LABEL[s]
								}, s))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "notes",
								children: "Household notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "notes",
								value: notes,
								onChange: (e) => setNotes(e.target.value),
								onBlur: () => {
									if (notes !== lead.notes) onNotes(notes);
								}
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "ghost",
						className: "w-full text-danger",
						disabled: busy,
						onClick: onDelete,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "Remove lead"]
					})
				})
			]
		})]
	});
}
function StudioPage() {
	const { location } = Route$1.useSearch();
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-6xl px-5 py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-40 animate-pulse rounded-full bg-fg/8" })
		})
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioApp, { initialLocation: location });
}
//#endregion
export { StudioPage as component };
