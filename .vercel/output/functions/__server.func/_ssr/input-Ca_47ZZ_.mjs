import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as authClient } from "./client-B40BzJxt.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-Ca_47ZZ_.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatCurrency(value) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	}).format(value);
}
function formatPhone(value) {
	const digits = value.replace(/\D/g, "");
	if (digits.length === 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
	return value;
}
function Wordmark({ className, to = "/" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: cn("inline-flex items-center gap-2.5 text-fg no-underline", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			className: "grid size-7 place-items-center rounded-full bg-primary text-primary-fg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-[15px] leading-none tracking-tight",
				children: "A"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-[1.35rem] leading-none tracking-[-0.03em]",
			children: "Alba"
		})]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[opacity,transform,background-color,box-shadow,color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35 disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			primary: "bg-primary text-primary-fg hover:opacity-90",
			secondary: "bg-card text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			ghost: "bg-transparent text-fg hover:bg-fg/5",
			outline: "border border-border bg-transparent text-fg hover:bg-fg/4",
			danger: "bg-danger text-primary-fg hover:opacity-90"
		},
		size: {
			sm: "h-9 rounded-md px-3 text-sm",
			md: "h-11 rounded-lg px-4 text-sm",
			lg: "h-12 rounded-xl px-5 text-base",
			icon: "size-11 rounded-lg"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-lg border border-border bg-card px-3.5 text-sm text-fg placeholder:text-subtle", "transition-[box-shadow,border-color] duration-150 ease-out", "focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-ring/20", "disabled:opacity-50", className),
		...props
	});
}
//#endregion
export { formatCurrency as a, useCurrentUserState as c, cn as i, Input as n, formatPhone as o, Wordmark as r, useCurrentUser as s, Button as t };
