"use client"

import { BlogProvider } from "@/context/BlogProvider"
import { MediaProvider } from "@/context/MediaProvider"
import { ModalProviderapp } from "@/context/ModalProvider"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

export function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <BlogProvider>
                <MediaProvider>
                    <ModalProviderapp>
                        {children}
                    </ModalProviderapp>

                </MediaProvider>
            </BlogProvider>

        </QueryClientProvider>
    )
}