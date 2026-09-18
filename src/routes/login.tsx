import { createFileRoute, Navigate } from "@tanstack/react-router";
import { AuthPanel } from "@/components/auth-panel";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

type LoginSearch = {
  next?: string;
  location?: string;
};

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    next: typeof search.next === "string" ? search.next : "/studio",
    location: typeof search.location === "string" ? search.location : undefined,
  }),
  component: Login,
});

function Login() {
  const { location } = Route.useSearch();
  const { user, isPending } = useCurrentUserState();

  if (isPending) {
    return <div className="min-h-dvh bg-bg" />;
  }
  if (user) {
    return <Navigate to="/studio" search={location ? { location } : {}} />;
  }

  return <AuthPanel nextPath="/studio" locationHint={location} />;
}
