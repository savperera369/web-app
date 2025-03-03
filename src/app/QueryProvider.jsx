"use client"

import {
    isServer,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 6000
            },
        },
    });
}

let browserQueryClient = undefined;
function getQueryClient() {
    if (isServer) {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) {
            browserQueryClient = makeQueryClient();
        }
        return browserQueryClient;
    }
}

export default function QueryProvider({ children }) {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}