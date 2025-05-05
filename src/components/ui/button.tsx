import Link from 'next/link'
import React from 'react'

interface buttonProps {
    children: React.ReactNode
    pathname?: string
    onClick?: () => void
}

const MyButton = ({ children, pathname, onClick }: buttonProps) => {
    const baseClass = ' w-fit bg-violet-400 p-2 rounded-xl mx-4 text-black font-bold hover:cursor-pointer hover:scale-75 transition-transform';

    if (pathname) {
        return (
            <Link href={pathname ? pathname : "#"}>
                <div className={baseClass}>{children}</div>
            </Link>
        )
    }
    return (
        <div>
            <div className={baseClass} onClick={onClick}>
                {children}
            </div>


        </div>
    )
}

export default MyButton
