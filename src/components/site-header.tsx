"use client";

import { Link } from "@tanstack/react-router";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Wordmark } from "@/components/wordmark";

export function SiteHeader({ studio }: { studio?: boolean }) {
  const { user, isPending } = useCurrentUserState();

  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-[4.25rem] sm:px-8">
        <Wordmark to={studio ? "/studio" : "/"} />
        <nav className="flex items-center gap-1 sm:gap-2">
          {!studio && (
            <Link
              to="/studio"
              className="hidden h-10 items-center rounded-lg px-3 text-sm text-muted transition-colors duration-150 hover:text-fg sm:inline-flex"
            >
              Console
            </Link>
          )}
          {isPending ? (
            <div className="h-8 w-28 animate-pulse rounded-full bg-fg/8" />
          ) : user ? (
            <div className="flex items-center gap-3">
              {!studio && (
                <Link
                  to="/studio"
                  className="inline-flex h-10 items-center rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-fg"
                >
                  Open console
                </Link>
              )}
              <div className="hidden sm:block [&_button]:text-muted [&_span]:text-sm [&_span.grid]:bg-fg/12 [&_span.grid]:text-fg">
                <UserButton />
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex h-10 items-center rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-fg"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
