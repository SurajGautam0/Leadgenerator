"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { Toaster } from "sonner";

export function AppProviders({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 20_000, retry: 1, refetchOnWindowFocus: false },
        },
      }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <Toaster
        position="bottom-center"
        toastOptions={{
          className:
            "font-sans! border-border! bg-card! text-fg! shadow-[var(--shadow-lift)]!",
        }}
      />
    </QueryClientProvider>
  );
}
