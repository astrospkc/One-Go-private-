"use client"

import { BlogProvider } from "@/context/BlogProvider"
import { CollectionProvider } from "@/context/CollectionProvider"
import { MediaProvider } from "@/context/MediaProvider"
import { ModalProviderapp } from "@/context/ModalProvider"
import { ProjectProvider } from "@/context/ProjectProvider"
import { UserProvider } from "@/context/UserProvider"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

export function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <CollectionProvider>
                    <ProjectProvider>
                        <BlogProvider>
                            <MediaProvider>

                                <ModalProviderapp>
                                    {children}
                                </ModalProviderapp>

                            </MediaProvider>
                        </BlogProvider>
                    </ProjectProvider>
                </CollectionProvider>
            </UserProvider>
        </QueryClientProvider>
    )
}