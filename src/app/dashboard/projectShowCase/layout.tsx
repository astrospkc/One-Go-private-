

import React from "react"




export default function ProjectShowCaseLayout({
    children,

}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
            <div className="w-full">
                {children}
            </div>
        </>
    )
}