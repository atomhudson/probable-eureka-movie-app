/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="relative text-white pt-28 px-4 md:px-8 min-h-screen flex flex-col">
      {/* Transparent gradient footer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* Glassmorphism container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-4xl mx-auto bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10"
      >
        {/* Title */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
        >
          About MovieApp
        </motion.h1>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg mb-4 leading-relaxed"
        >
          Welcome to <span className="font-semibold text-pink-400">MovieApp</span>, your
          ultimate destination for discovering movies. Whether you're looking for the latest
          blockbusters, timeless classics, or hidden gems, we've got you covered.
        </motion.p>

        {/* Mission */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-lg mb-4 leading-relaxed"
        >
          Our mission is to provide a seamless and enjoyable movie discovery experience. You
          can search for any movie, explore what's currently popular, and see what's trending
          among our community.
        </motion.p>

        {/* Features */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-2xl font-semibold mt-8 mb-4 text-pink-400"
        >
          Our Features
        </motion.h2>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="list-disc list-inside space-y-2"
        >
          <li>
            <span className="font-bold text-purple-300">Comprehensive Search:</span> Find
            any movie with our powerful search engine.
          </li>
          <li>
            <span className="font-bold text-purple-300">Discover Popular Movies:</span> See
            what's popular right now with our curated lists.
          </li>
          <li>
            <span className="font-bold text-purple-300">Trending Insights:</span> Check out
            which movies are trending based on user searches on our platform.
          </li>
          <li>
            <span className="font-bold text-purple-300">Sleek Interface:</span> A modern,
            user-friendly design that makes finding movies a breeze.
          </li>
        </motion.ul>

        {/* Tech stack */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-lg mt-8 leading-relaxed"
        >
          This project is built with modern web technologies including{" "}
          <span className="font-semibold text-pink-400">React</span>,{" "}
          <span className="font-semibold text-pink-400">Vite</span>,{" "}
          <span className="font-semibold text-pink-400">Tailwind CSS</span>, and{" "}
          <span className="font-semibold text-pink-400">Appwrite</span>. It's a demonstration
          of a full-stack application that is both functional and beautiful.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default About;
