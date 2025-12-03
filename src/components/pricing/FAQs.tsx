const FAQs = () => {
    return (
        <section className="max-w-4xl mx-auto px-6 py-24">
            <h3 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h3>
            <div className="space-y-10">
                {[
                    {
                        q: "Is the free plan really free?",
                        a: "Yes. Starter is free forever with 1GB storage included."
                    },
                    {
                        q: "What happens if I exceed my storage?",
                        a: "Uploads pause and you'll be prompted to upgrade or purchase extra storage."
                    },
                    {
                        q: "Can I upgrade anytime?",
                        a: "Yes, upgrades are instant and your new limits apply right away."
                    },
                    {
                        q: "Do you support teams?",
                        a: "Yes! Pro/Team comes with collaboration and access controls."
                    }
                ].map((item, i) => (
                    <div key={i}>
                        <p className="font-semibold text-lg text-white mb-2">{item.q}</p>
                        <p className="text-gray-300 text-sm">{item.a}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FAQs