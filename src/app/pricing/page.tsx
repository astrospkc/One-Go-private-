import React from "react"

const Pricing = () => {

    return (
        <div className=" flex flex-col font-serif  mt-10 text-white text-xl h-full w-full justify-center items-center">
            <div className="text-2xl md:text-4xl font-bold ">
                PRICING
            </div>
            <table className="  max-w-full table-auto border border-gray-300 mt-4 text-sm m-4">
                <thead>
                    <tr className=" text-2xl">
                        <th className="border px-4 py-2 text-left">Plan</th>
                        <th className="border px-4 py-2 text-left">Price (Monthly)</th>
                        <th className="border px-4 py-2 text-left">Features</th>
                    </tr>
                </thead>
                <tbody className="text-xl">
                    <tr>
                        <td className="border px-4 py-2">Free</td>
                        <td className="border px-4 py-2">$0</td>
                        <td className="border px-4 py-2">1 project, 20MB storage, 100 API calls/day</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Developer</td>
                        <td className="border px-4 py-2">$1</td>
                        <td className="border px-4 py-2">1 project, 50MB storage, 100 API calls/day</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Pro</td>
                        <td className="border px-4 py-2">$9</td>
                        <td className="border px-4 py-2">3 projects, 500MB storage, 5,000 API calls/day, file uploads</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Enterprise</td>
                        <td className="border px-4 py-2">$29</td>
                        <td className="border px-4 py-2">10 projects, 5GB storage, 50,000 API calls/day, team access</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Custom</td>
                        <td className="border px-4 py-2">Custom</td>
                        <td className="border px-4 py-2">Unlimited projects/storage, SLA, analytics, custom domains</td>
                    </tr>
                </tbody>
            </table>

        </div>


    )
}

export default Pricing