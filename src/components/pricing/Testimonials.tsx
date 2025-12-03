const Testimonials = () => {
    return (
        <section className="bg-[#0f0f25] py-20 px-6">
            <h3 className="text-3xl font-bold text-center mb-12">Trusted by Developers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="p-6 bg-[#1a1a3a] rounded-xl border border-[#2d2d4d] shadow-md text-gray-300">
                        <p className="text-sm italic mb-4">
                            “One-Go made it super easy to manage assets for my portfolio and client websites. Love it!”
                        </p>
                        <p className="font-semibold">Developer #{i}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Testimonials