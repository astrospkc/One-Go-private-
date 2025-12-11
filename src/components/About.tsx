
import React from 'react'

const About = () => {


    return (
        <div className='flex flex-col justify-center items-center m-auto w-full font-serif   my-10'>
            <div className='flex justify-center items-center flex-col my-10 w-3/4'>

                <div className='text-6xl font-bold' >🚀 Why We’re Building This CMS</div>
                <div className='mt-10  text-center text-2xl text-gray-500'>
                    Tired of Rebuilding the Same Backend ?
                    Let&apos;s be real — building a beautiful frontend is fun.
                    But setting up a backend again just to handle some blogs, images, or project links ?
                    Not so much.

                    Every time we worked on a portfolio, a client site, or a quick side project, we kept running into the same problem:

                    “I just want a simple way to manage my content… and use it wherever I want.”

                    So we built exactly that.
                </div>
            </div>
            <div className='flex justify-center items-center flex-col my-10 w-3/4'>

                <div className='text-6xl font-bold text-center text-indigo-300'>💡 A CMS That Gives You an API — Instantly</div>
                <div className="text-white/90 text-lg mt-4">
                    This CMS is for devs, freelancers, indie makers — anyone who needs dynamic content in their projects without spinning up a whole new backend.

                    You get:

                    ✅ A clean dashboard to manage blogs, links, projects, media — whatever you need
                    ✅ A plug - and - play API to fetch your content anywhere
                    ✅ Secure, fast, and ready to scale when you are

                    Just log in, add your content, and boom — it&apos;s ready to go live on your website, app, or portfolio.
                </div>
            </div>
            <div className='flex justify-center items-center flex-col my-10 w-3/4'>

                <div className='text-4xl'>🎯Who It’s For</div>
                <div className='my-10 text-center relative bg-[#0A0B12] rounded-3xl p-6 shadow-xl border border-white/20'>
                    <div className="absolute -top-16 -left-12 w-48 h-48 bg-violet-600/30 blur-3xl rounded-full" />
                    <div className="absolute -bottom-20 -right-16 w-64 h-64 bg-indigo-500/30 blur-3xl rounded-full" />
                    <ul className=" text-start text-xl grid grid-cols-4 gap-4">
                        <li>⭐ Developers tired of building dashboards from scratch</li>
                        <li>⭐ Designers who want to update content without touching code</li>
                        <li>⭐ Students & freelancers building their portfolio the smart way</li>
                        <li>⭐ Teams & agencies managing content across multiple sites</li>
                    </ul>



                </div>
            </div>
            <div className='flex justify-center items-center flex-col my-10 w-3/4 py-10'>

                <div className='text-3xl font-bold'>⚡ Build Faster, Ship Smarter</div>
                <div className='mt-10 text-center text-2xl'>Skip the backend setup.
                    Focus on your design, your code, your ideas.

                    We&apos;ll handle the content engine behind the scenes — so you can go live faster.</div>
            </div>

        </div>
    )
}

export default About


















