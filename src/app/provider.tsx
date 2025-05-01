"use client"

import { CollectionProvider } from "@/context/CollectionProvider"
import { ModalProviderapp } from "@/context/ModalProvider"
import { ProjectProvider } from "@/context/ProjectProvider"
import { UserProvider } from "@/context/UserProvider"

export function Providers({ children }: { children: React.ReactNode }) {
    return (

        <UserProvider>
            <CollectionProvider>
                <ProjectProvider>
                    <ModalProviderapp>
                        {children}
                    </ModalProviderapp>
                </ProjectProvider>
            </CollectionProvider>
        </UserProvider>
    )
}