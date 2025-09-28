import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaArrowRight, FaCheck, FaStar, FaUsers, FaGraduationCap } from 'react-icons/fa';
import { Link } from 'react-router';

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gray-200/30 items-center flex py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-success text-success-content rounded-full px-4 py-2 mb-6 shadow-lg"
            >
              <FaCheck className="w-4 h-4" />
              <span className="text-sm font-medium">Trusted by 50,000+ Learners Worldwide</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-4xl lg:text-6xl font-bold text-base-content mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Transform Your <span className="text-success">Career</span> with Expert-Led Courses
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl text-base-content/70 mb-8 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Master in-demand skills like Web Development, Data Science, and UX Design through
              hands-on projects. Join our global community and unlock your potential.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start"
            >
              <Link to="/Quiz">
                <motion.button

                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-success btn-lg px-8 py-4 text-lg font-semibold rounded-xl shadow-lg flex items-center gap-2"
                >
                  Take Quiz Today
                  <FaArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-outline btn-lg px-8 py-4 text-lg font-semibold rounded-xl flex items-center gap-2 border-2"
              >
                <FaPlay className="w-4 h-4" />
                Watch Overview
              </motion.button>
            </motion.div>

            {/* Quick Benefits */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-6 justify-center lg:justify-start text-base-content/70"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>Expert Instructors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>Project-Based Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>Lifetime Access</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>Certification on Completion</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Relevant Image */}
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <img
              src="https://img.freepik.com/premium-photo/man-hoodie-is-working-laptop_1249034-39905.jpg?ga=GA1.1.923042826.1759082365&semt=ais_hybrid&w=740&q=80"
              alt="People learning online"
              className="rounded-3xl shadow-2xl object-cover w-full h-[500px]"
            />

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ y: -5 }}
              className="absolute -top-6 left-6 bg-base-100 rounded-2xl shadow-xl border border-base-300 p-4 w-64"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success text-success-content rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaStar className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-base-content">Learning Progress</h4>
                  <div className="w-full bg-base-300 rounded-full h-2 mt-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '82%' }}
                      transition={{ delay: 1, duration: 1 }}
                      className="bg-success h-2 rounded-full"
                    />
                  </div>
                  <p className="text-sm text-base-content/70 mt-1">82% Complete</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 1 }}
              whileHover={{ y: -5 }}
              className="absolute bottom-6 right-2 bg-base-100 rounded-2xl shadow-xl border border-base-300 p-4 w-64"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary text-secondary-content rounded-xl flex items-center justify-center flex-shrink-0">
                  <FaUsers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-base-content">Active Community</h4>
                  <p className="text-sm text-base-content/70">50,000+ learners</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute top-16 right-2 bg-accent text-accent-content px-5 py-3 rounded-xl shadow-lg"
            >
              <div className="text-center">
                <div className="text-2xl font-bold">94%</div>
                <div className="text-xs">Success Rate</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="absolute bottom-24 left-2 bg-base-100/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-base-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-success to-secondary rounded-xl flex items-center justify-center">
                  <FaGraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-base-content">1,200+ Courses</div>
                  <div className="text-sm text-base-content/70">Expert-led content</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
