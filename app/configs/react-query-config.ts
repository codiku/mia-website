import { QueryClient } from "@tanstack/react-query";

// Defaut config for react-query
// Added a display toast when an error is thrown be any query or mutation
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disable automatic retries for all queries
      refetchOnWindowFocus: false,
    },
  },
});
