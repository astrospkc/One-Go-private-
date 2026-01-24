const FAQs = () => {
    return (
        <section className="max-w-3xl mx-auto px-6 py-24 border-t border-gray-100">
            <h3 className="text-3xl font-bold mb-12 text-center text-gray-900">Frequently Asked Questions</h3>
            <div className="space-y-8">
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
                    <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <h4 className="font-bold text-lg text-gray-900 mb-2">{item.q}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FAQs