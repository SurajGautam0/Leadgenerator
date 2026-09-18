import { n as createMiddleware } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/leads-types-DqcKIXLy.js
/**
* Auth middleware for server functions — the standard way to get the caller's
* verified user id. When deployed the session cookie is same-origin and rides
* along automatically. In the live preview the client also forwards the bearer
* token (partitioned cookies) via the `.client` hook below — call sites do not
* thread it themselves.
*
*   import { createServerFn } from "@tanstack/react-start";
*   import { getSql } from "@/lib/db";
*   import { authMiddleware } from "@/lib/auth/middleware";
*
*   export const listTodos = createServerFn({ method: "GET" })
*     .middleware([authMiddleware])
*     .handler(async ({ context }) => {
*       const sql = await getSql();
*       return sql`select * from todos where user_id = ${context.userId}`;
*     });
*
* Signed out with auth on (live preview included) -> throws `UnauthorizedError`
* (see `verify.server.ts`). With auth disabled (`VITE_AUTH_ENABLED=false`, the
* shipped default) it resolves the shared dev user — but throws instead when a
* `DATABASE_URL` is also set, so an app without sign-in must not use this at
* all. On the auth-on path, use it on every server function that touches
* per-user data and scope every query by `context.userId`.
*/
var authMiddleware = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const { getBearerToken } = await import("./client-B40BzJxt.mjs").then((n) => n.n).then((n) => n.n);
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { assertSameSiteRequest } = await import("./isolation.server-CGNg1r0B.mjs");
	const { requireUserId } = await import("./verify.server-J82hjryJ.mjs");
	assertSameSiteRequest();
	return next({ context: { userId: await requireUserId(context.bearerToken) } });
});
var LEAD_STATUSES = [
	"new",
	"contacted",
	"quoted",
	"booked",
	"lost"
];
var PROPERTY_TYPES = [
	"Estate",
	"Townhouse",
	"Brownstone",
	"Penthouse",
	"Single family",
	"Condo",
	"Loft",
	"Rental",
	"Office suite",
	"Boutique stay"
];
var SERVICES = [
	"Weekly housekeep",
	"Deep clean",
	"Move-out",
	"Post-renovation",
	"Airbnb turnover",
	"Estate care",
	"Office close"
];
var STATUS_LABEL = {
	new: "New",
	contacted: "Contacted",
	quoted: "Quoted",
	booked: "Booked",
	lost: "Lost"
};
function scoreTone(score) {
	if (score >= 88) return "high";
	if (score >= 74) return "mid";
	return "low";
}
//#endregion
export { authMiddleware as a, STATUS_LABEL as i, PROPERTY_TYPES as n, scoreTone as o, SERVICES as r, LEAD_STATUSES as t };
