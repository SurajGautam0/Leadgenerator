"use client";

import { Link, useNavigate } from "@tanstack/react-router";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { FormEvent, useState } from "react";
import { Wordmark } from "@/components/wordmark";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Mode = "signin" | "signup";

export function AuthPanel({
  nextPath,
  locationHint,
}: {
  nextPath: string;
  locationHint?: string;
}) {
  const [mode, setMode] = useState<Mode>("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  const destination = nextPath.startsWith("/") ? nextPath : "/studio";

  async function finish() {
    try {
      await authClient.getSession();
    } catch {
      /* session store recovers */
    }
    await navigate({
      to: "/studio",
      search: locationHint ? { location: locationHint } : {},
    });
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!authEnabled) {
      setError("Sign-in is disabled.");
      return;
    }
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
          password,
        });
        if (err) {
          setError(err.message ?? "Could not create the console.");
          return;
        }
      } else {
        const { error: err } = await authClient.signIn.email({
          email: email.trim(),
          password,
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

  return (
    <div className="grid min-h-dvh bg-bg lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img src="/media/tower.jpg" alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-bg/45" />
        <div className="absolute inset-x-10 bottom-10 text-fg">
          <p className="text-3xl font-semibold tracking-tight">
            Public listings in.
            <br />
            A private book out.
          </p>
          <p className="mt-3 max-w-sm text-sm text-muted">
            Advanced scrape for your cleaning company — location, vertical, crawl depth.
          </p>
        </div>
      </div>
      <div className="flex flex-col px-5 py-6 sm:px-10">
        <div className="flex items-center justify-between">
          <Wordmark />
          <Link to="/" className="text-sm text-muted hover:text-fg">
            Back
          </Link>
        </div>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
            {mode === "signup" ? "Create console" : "Welcome back"}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            {mode === "signup" ? "Name, email, password." : "Sign in to Wavesolution."}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {locationHint
              ? `We will open ${locationHint} in the scraper as soon as you are in.`
              : "Leads stay on your account. Nothing is shared."}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-2 rounded-xl bg-fg/5 p-1">
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`h-10 rounded-lg text-sm font-medium transition-colors duration-150 ${
                mode === "signup" ? "bg-card text-fg shadow-[var(--shadow-border)]" : "text-muted"
              }`}
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`h-10 rounded-lg text-sm font-medium transition-colors duration-150 ${
                mode === "signin" ? "bg-card text-fg shadow-[var(--shadow-border)]" : "text-muted"
              }`}
            >
              Sign in
            </button>
          </div>

          {authEnabled ? (
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              {mode === "signup" && (
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Alex Rivera"
                  />
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@studio.com"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="At least 8 characters"
                />
              </div>
              {error && <p className="text-sm text-danger">{error}</p>}
              <Button type="submit" className="w-full" size="lg" disabled={pending}>
                {pending ? "Please wait…" : mode === "signup" ? "Create console" : "Sign in"}
              </Button>
            </form>
          ) : (
            <p className="mt-6 text-sm text-muted">Sign-in is disabled.</p>
          )}

          {authEnabled && (
            <>
              <div className="my-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-subtle">
                <span className="h-px flex-1 bg-border" />
                Or continue with
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="grid gap-2">
                {GROK_PROVIDERS.map((p) => (
                  <Button
                    key={p.providerId}
                    type="button"
                    variant="secondary"
                    className="w-full"
                    onClick={() =>
                      signIn(p.providerId, {
                        callbackURL: destination,
                        errorCallbackURL: "/login",
                      })
                    }
                  >
                    Continue with {p.label}
                  </Button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
