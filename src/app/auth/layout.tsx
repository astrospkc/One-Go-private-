export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center relative w-full">
                <div
                    style={{
                        backgroundImage: 'url("/image/miclaptop.jpg")',
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat, repeat",
                        // backgroundColor: "rgb(34, 34, 34)",
                        backgroundColor: "black",
                        backgroundBlendMode: "",

                        opacity: 0.3, // control background image opacity here
                        zIndex: 0,
                    }}
                    className="absolute inset-0"
                ></div>
                {children}
            </div>
        </>
    );
}
