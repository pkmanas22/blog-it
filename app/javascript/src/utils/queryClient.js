import { QueryClient, QueryCache } from "react-query";

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 3_600_000,
      retry: (_, error) => {
        const { status } = error;

        if (status === 404) return false;

        return true;
      },
    },
  },
});

export default queryClient;
