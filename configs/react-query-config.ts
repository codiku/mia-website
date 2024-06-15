import { QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Defaut config for react-query
// Added a display toast when an error is thrown be any query or mutation
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any, query) => {
      if ((query.meta as any)?.["isToastDisabled"] !== "true") {
        toast.error(error.message);
      }
    },
    onSuccess: (data: any, query) => {
      if (data.message) {
        if ((query.meta as any)?.["isToastDisabled"] !== "true") {
          toast.success(data.message);
        }
      }
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 60 sec
      retry: false, // Disable automatic retries for all queries
      refetchOnWindowFocus: false,
    },
  },
});
