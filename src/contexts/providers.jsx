"use client";
import { RolesProvider } from "@/contexts/RolesContext";
import { ClaimsProvider } from "@/contexts/ClaimsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 300_000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <RolesProvider>
        <ClaimsProvider>
          {children}
        </ClaimsProvider>
      </RolesProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
