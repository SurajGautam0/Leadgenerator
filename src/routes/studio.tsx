import { createFileRoute } from "@tanstack/react-router";
import { StudioApp } from "@/components/studio-app";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

type StudioSearch = {
  location?: string;
};

export const Route = createFileRoute("/studio")({
  validateSearch: (search: Record<string, unknown>): StudioSearch => ({
    location: typeof search.location === "string" ? search.location : undefined,
  }),
  component: StudioPage,
});

function StudioPage() {
  const { location } = Route.useSearch();
  const { user, isPending } = useCurrentUserState();

  if (isPending) {
    return (
      <div className="min-h-dvh bg-bg">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="h-8 w-40 animate-pulse rounded-full bg-fg/8" />
        </div>
      </div>
    );
  }
  if (!user) return <RedirectToSignIn />;
  return <StudioApp initialLocation={location} />;
}
