"use client"

// import { UserContext } from "@/context/UserProvider";
// import axios from "axios";
import { motion } from "motion/react";
import Link from "next/link";
// import { useContext, useEffect } from "react";


export default function Home() {


  return (
    <>
      <div className="min-h-screen relative  flex justify-center items-center bg-black border-b-2 border-gray-900 w-full font-serif">
        <div
          style={{
            backgroundImage: 'url("/image/laptopplant.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat, repeat",
            // backgroundColor: "rgb(34, 34, 34)",
            backgroundColor: "white",
            backgroundBlendMode: "luminosity",

            opacity: 0.2, // control background image opacity here
            zIndex: 0,
          }}
          className="absolute inset-0"
        ></div>
        <div className="w-2/3  relative z-10 flex flex-col items-center">
          <motion.div className="items-center flex flex-col h-1/2 justify-center  gap-4">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-indigo-300 text-center"
            >
              Tired of Rebuilding the Same Backend?
            </motion.h1>


            <motion.div className="text-xl font-serif">

              <span className="text-4xl md:text-7xl font-bold p-2 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 ">One-GO</span>

              <h2 className="mt-4 text-center">
                is here for you at your service.
              </h2></motion.div>
          </motion.div>
          <motion.div className="my-10 text-center text-xl text-slate-400">
            <ul>
              <li>
                Let’s be real — building a beautiful frontend is fun.

              </li>
              <li>
                But setting up a backend again just to handle some blogs, images, or project links?
                Not so much.
              </li>
              <li>
                Every time we worked on a portfolio, a client site, or a quick side project, we kept running into the same problem:

              </li>
            </ul>

          </motion.div>
          <div className=" flex flex-row mt-10 justify-center items-center border-b-2   ">
            <div className="text-4xl md:text-7xl font-bold p-2 rounded-xl w-2/3   ">
              Why ?
            </div>


            <div className="mt-10  h-1/2 flex justify-center items-center bg-gradient-to-r from-transparent via-violet-800 to-transparent py-6 ">
              <ul className="flex flex-col gap-4">

                <li className="text-2xl text-violet-300">
                  “I just want a simple way to manage my content… and use it wherever I want.”

                </li>
                <li>
                  So we built exactly that.
                </li>
              </ul>

            </div>
          </div>


        </div>

      </div>
      <div className="min-h-screen relative  w-full px-6 py-12 bg-gradient-to-t  from-black via-indigo-900 to-black">

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-indigo-300"
          >
            Effortless Content Management for Your Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-400 mb-8"
          >
            A modern CMS that gives you instant APIs to power your websites, portfolios, and apps — without writing any backend.
          </motion.p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard" className="">
              <button className="rounded-2xl px-6 py-3 text-lg shadow-sm shadow-violet-400 hover:cursor-pointer hover:bg-violet-700">
                Get Started
              </button>
            </Link>

            <button className="rounded-2xl px-6 py-3 text-lg hover:bg-violet-500 hover:shadow-xl hover:shadow-violet-400">
              View Demo
            </button>
          </div>
        </div>

        <section className="mt-24 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Built for Speed, Simplicity, and Scale</h2>
          <p className="text-indigo-300 text-lg font-bold">
            Whether you&apos;re building a personal site, managing client work, or launching a product — our CMS helps you manage and deliver content without the hassle.
          </p>
        </section>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              title: "Instant API Access",
              desc: "Add content and access it instantly via a secure RESTful API. No setup required.",
            },
            {
              title: "Fully Customizable",
              desc: "Define content types that match your exact use case — blogs, links, images, anything.",
            },
            {
              title: "Built for Everyone",
              desc: "From devs to designers, anyone can manage content with our clean, intuitive dashboard.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="p-6 rounded-2xl shadow-md  hover:shadow-2xl hover:shadow-indigo-500/50 shadow-black"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}

            >
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-indigo-200 font-semibold">{item.desc}</p>
            </motion.div>
          ))}
        </section>

        <section className="mt-24 text-center">
          <h2 className="text-3xl font-semibold mb-4">Let&apos;s Build Smarter, Not Harder</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            We built this CMS to remove the boring parts of building websites. So you can focus on your ideas, your frontend, your story.
          </p>
          <div className="mt-6">
            <button className="rounded-2xl px-8 py-4 text-lg shadow-lg">
              ✨Start Creating Today
            </button>
            <div>
              <ul>
                <li>
                  Your content.
                </li>
                <li>
                  Your frontend.
                </li>
                <li>
                  Our APIs.
                </li>
              </ul>

              → [Get Started Now]
              → [See it in Action]
            </div>
          </div>
        </section>
      </div>
    </>

  );
}




