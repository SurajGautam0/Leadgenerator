import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate, v as Link, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { t as GROK_PROVIDERS } from "./server-BRP8TwDG.mjs";
import { r as Route$2 } from "./router-CRIa0g0q.mjs";
import { c as useCurrentUserState, n as Input, r as Wordmark, t as Button } from "./input-Ca_47ZZ_.mjs";
import { t as Label } from "./label-CNs-UryD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CAfKYk7p.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPanel({ nextPath, locationHint }) {
	const [mode, setMode] = (0, import_react.useState)("signup");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const destination = nextPath.startsWith("/") ? nextPath : "/studio";
	async function finish() {
		try {
			await authClient.getSession();
		} catch {}
		await navigate({
			to: "/studio",
			search: locationHint ? { location: locationHint } : {}
		});
	}
	async function onSubmit(e) {
		e.preventDefault();
		setError(null);
		setPending(true);
		try {
			if (mode === "signup") {
				if (name.trim().length < 2) {
					setError("Please enter your name.");
					setPending(false);
					return;
				}
				const { error: err } = await authClient.signUp.email({
					name: name.trim(),
					email: email.trim(),
					password
				});
				if (err) {
					setError(err.message ?? "Could not create the studio.");
					return;
				}
			} else {
				const { error: err } = await authClient.signIn.email({
					email: email.trim(),
					password
				});
				if (err) {
					setError(err.message ?? "Could not sign in.");
					return;
				}
			}
			await finish();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong.");
		} finally {
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-dvh bg-bg lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative hidden lg:block",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/media/atelier.jpg",
					alt: "",
					className: "absolute inset-0 size-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-fg/25" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-10 bottom-10 text-primary-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-4xl tracking-tight",
						children: [
							"Name the neighborhood.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"We'll map the homes."
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-sm text-sm text-primary-fg/80",
						children: "A private lead book for your cleaning company — location first."
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col px-5 py-6 sm:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-sm text-muted hover:text-fg",
					children: "Back"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.2em] text-muted",
						children: mode === "signup" ? "Create studio" : "Welcome back"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl tracking-tight",
						children: mode === "signup" ? "Your name, email, password." : "Sign in to Alba."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: locationHint ? `We will open ${locationHint} as soon as you are in.` : "Leads stay on your account. Nothing is shared."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid grid-cols-2 gap-2 rounded-xl bg-fg/5 p-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setMode("signup"),
							className: `h-10 rounded-lg text-sm font-medium transition-colors duration-150 ${mode === "signup" ? "bg-card text-fg shadow-[var(--shadow-border)]" : "text-muted"}`,
							children: "Create"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setMode("signin"),
							className: `h-10 rounded-lg text-sm font-medium transition-colors duration-150 ${mode === "signin" ? "bg-card text-fg shadow-[var(--shadow-border)]" : "text-muted"}`,
							children: "Sign in"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit,
						className: "mt-6 space-y-4",
						children: [
							mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "name",
									children: "Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "name",
									autoComplete: "name",
									value: name,
									onChange: (e) => setName(e.target.value),
									required: true,
									placeholder: "Alex Rivera"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "email",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "email",
									type: "email",
									autoComplete: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									required: true,
									placeholder: "you@studio.com"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "password",
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "password",
									type: "password",
									autoComplete: mode === "signup" ? "new-password" : "current-password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									required: true,
									minLength: 8,
									placeholder: "At least 8 characters"
								})]
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-danger",
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "w-full",
								size: "lg",
								disabled: pending,
								children: pending ? "Please wait…" : mode === "signup" ? "Create studio" : "Sign in"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-subtle",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
							"Or continue with",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2",
						children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "secondary",
							className: "w-full",
							onClick: () => signIn(p.providerId, {
								callbackURL: destination,
								errorCallbackURL: "/login"
							}),
							children: ["Continue with ", p.label]
						}, p.providerId))
					})] })
				]
			})]
		})]
	});
}
function Login() {
	const { location } = Route$2.useSearch();
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-bg" });
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/studio",
		search: location ? { location } : {}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthPanel, {
		nextPath: "/studio",
		locationHint: location
	});
}
//#endregion
export { Login as component };
