/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const Developer = () => {
  return (
    <div className="text-white pt-28 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-md p-8 rounded-2xl shadow-lg text-center"
      >
        <motion.img
          src="https://res.cloudinary.com/dzn5nn8cl/image/upload/v1756494814/profile-pic_1_pzrxfc.png"
          alt="Developer"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-red-400 shadow-md"
        />

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold text-gradient mb-2"
        >
          Prashant Saini
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl text-gray-300 mb-6"
        >
          Full-Stack Web Developer
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-lg mb-4"
        >
          Hello! I'm the developer behind MovieApp. I am passionate about
          creating beautiful, functional, and user-friendly web applications.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-lg mb-8"
        >
          This project showcases my skills in React, modern JavaScript (ES6+),
          Tailwind CSS, and backend integration with Appwrite. I love tackling
          challenges and bringing ideas to life through code.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center gap-6"
        >
          <a
            href="https://github.com/atomhudson"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/prashantsaini0909"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            LinkedIn
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Developer;
